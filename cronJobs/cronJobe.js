const cron = require("node-cron");
const ActiveMembership = require("../model/customerModel/activeMembership");
const UpcomingMembership = require("../model/customerModel/upcomingMembership");

// This function will work every day mid night
cron.schedule("0 0 * * *", async () => {
  try {
    await expiredMembershipsToHistory();
    await upcomingToActive();
  } catch (err) {
    console.error("Error processing memberships:", err);
  }
});

async function upcomingToActive() {
  const currentDate = new Date();
  const expiredActiveMemberships = await ActiveMembership.find({
        customers_id: membership.customers_id,
        startDate: { $gte: membership.endDate },
  });
  for (const membership of expiredActiveMemberships) {
    const upcomingMembership = await UpcomingMembership.findOne({
      customers_id: membership.customers_id,
      startDate: membership.endDate,
    });
    if (upcomingMembership) {
      await ActiveMembership.create({
        customers_id: membership.customers_id,
        membership_id: upcomingMembership.membership_id,
        startDate: upcomingMembership.startDate,
        endDate: upcomingMembership.endDate,
      });

      await UpcomingMembership.findByIdAndDelete(upcomingMembership._id);
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
      await MembershipHistory.create({
        customers_id: membership.customers_id,
        membership_id: membership.membership_id,
        startDate: membership.startDate,
        endDate: membership.endDate,
      });
      await ActiveMembership.findByIdAndDelete(membership._id);
    }
  } catch (err) {
    console.error("Error moving expired memberships to history:", err);
  }
}
