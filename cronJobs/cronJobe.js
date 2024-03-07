const cron = require("node-cron");
const ActiveMembership = require("../model/customerModel/activeMembership");
const UpcomingMembership = require("../model/customerModel/upcomingMembership");
const Customer = require("../model/customerModel/customer.model");

// This function will work every day mid night
cron.schedule("0 0 * * *", async () => {
  console.log("hello");
  try {
    await expiredMembershipsToHistory();
    await upcomingToActive();
  } catch (err) {
    res.send({ message: err.message });
    console.error("Error processing memberships:", err);
  }
});

// Function to move upcoming memberships to active memberships
async function upcomingToActive() {
  const currentDate = new Date();
  const activeMemberships = await ActiveMembership.find({});
  for (const membership of activeMemberships) {
    if (membership.endDate < currentDate) {
      const upcomingMembership = await UpcomingMembership.findOne({
        customers_id: membership.customers_id,
        startDate: membership.endDate,
      });
      if (upcomingMembership) {
        await ActiveMembership.findByIdAndDelete(membership._id);
        const newActiveMembership = await ActiveMembership.create({
          customers_id: membership.customers_id,
          membership_id: upcomingMembership.membership_id,
          startDate: upcomingMembership.startDate,
          endDate: upcomingMembership.endDate,
        });
        await UpcomingMembership.findByIdAndDelete(upcomingMembership._id);

        await Customer.findByIdAndUpdate(
          membership.customers_id,
          {
            $pull: { activeMembership: membership._id },
            $pull: { upcomingMemberships: upcomingMembership._id },
            $push: { activeMembership: newActiveMembership._id },
          },
          { new: true }
        );
      }
    }
  }
}

// Function to move expired active memberships to membership history
async function expiredMembershipsToHistory() {
  try {
    const currentDate = new Date();
    // Find active memberships which have expired
    const expiredMemberships = await ActiveMembership.find({
      endDate: { $lte: currentDate },
    });

    for (const membership of expiredMemberships) {
      const membHistory = await MembershipHistory.create({
        customers_id: membership.customers_id,
        membership_id: membership.membership_id,
        startDate: membership.startDate,
        endDate: membership.endDate,
      });
      await ActiveMembership.findByIdAndDelete(membership._id);

      await Customer.findByIdAndUpdate(
        membership.customers_id,
        { $push: { membershipHistory: membHistory._id } },
        { $pull: { activeMembership: membership._id } },
        { new: true }
      );
    }
  } catch (err) {
    console.error("Error moving expired memberships to history:", err);
  }
}

module.exports = cron;
