import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { nextButton, prevButton } from "../Redux/Features/ButtonSlice";

// const { TextArea } = Input;

const Membership = () => {
  const data = [
    {
      id: 1,
      label: "Admission fee (one-time)",
      name: "admissionFee",
    },
    {
      id: 2,
      label: "Daily Pass",
      name: "dailyPass",
    },
    {
      id: 3,
      label: "Monthly Pass",
      name: "monthlyPass",
    },
    {
      id: 4,
      label: "3 Month Pass",
      name: "threeMonthPass",
    },
    {
      id: 5,
      label: "6 Month Pass",
      name: "sixMonthPass",
    },
    {
      id: 6,
      label: "Annual Pass",
      name: "annualPass",
    },
  ];

  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(nextButton());
  };

  const handlePrevious = () => {
    dispatch(prevButton());
  };

  const handleFormChange = (e: any) => {
    console.log("name:", e.target.name, "value:", e.target.checked);
    // console.log("e.target : ", e.target)
  };

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <Form
        onFinish={(values) => console.log({ values })}
        onChange={handleFormChange}
      >
        <div className="font-bold text-lg mb-8">
          <h1>Membership options</h1>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between mb-3 "
          >
            <Form.Item
              name={item.name}
              valuePropName="checked"
              wrapperCol={{ span: 30 }}
            >
              <div className=" w-[150px] md:w-[200px]  flex justify-between gap-3">
                {item.label}

                <Checkbox name={item.name}> </Checkbox>
              </div>
            </Form.Item>

            <div className=" ">
              <Form.Item
                label="Price"
                name={`${item.name}Price`}
                wrapperCol={{ span: 6 }}
              >
                <Input className=" w-16" />
              </Form.Item>
            </div>
          </div>
        ))}

        <Form.Item
          label="Other Option"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        >
          <div className="md:ml-20">
            <Input name="other" className="" />
          </div>
        </Form.Item>
      </Form>

      <div className="flex gap-3 justify-center">
        <Button type="primary" className="bg-blue-600 " onClick={handleNext}>
          Next
        </Button>
        <Button className="bg-white " onClick={handlePrevious}>
          Previous
        </Button>
      </div>
    </div>
  );
};

export default Membership;
