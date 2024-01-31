import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { nextButton, prevButton } from "../Redux/Features/ButtonSlice";
import TimeTable from "./TimeTable";
import { ChangeEvent, useState } from "react";
import { addData } from "../Redux/Features/FacilityFeature/FacilititySlice";
import { useAppSelector } from "../Redux/hooks";

const Location = () => {
  const dispatch = useDispatch();
  const handleNext = () => {
    console.log("next membership");

    dispatch(nextButton());
  };

  const handlePrevious = () => {
    console.log("basic info");

    dispatch(prevButton());
  };

  const reduxState = useAppSelector((state) => state.facility);
  console.log({ reduxState });
  const [form] = Form.useForm();

  form.setFieldsValue({
    address: reduxState.address,
    pin_code: reduxState.pin_code,
    country: "India",
    state: "Kerala",
    latitude_lognitude: reduxState.latitude_lognitude,
  });

  const { TextArea } = Input;

  const [infoData, setInfoData] = useState({});
  const handleInputChange = (e: any) => {
    // console.log(e.target, "name:", e.target.name, "value:", e.target.value);

    const fieldName = e.target.name;

    const fieldValue = e.target.value;
    // console.log({fieldValue});

    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      [fieldName]: fieldValue,
    }));
    dispatch(addData({ [fieldName]: fieldValue }));
    return;
    // console.log(e.target.value);
  };

  console.log("locationInfoDaat: ", infoData);

  return (
    <div>
      <div className="font-semibold ">
        <Form
          form={form}
          onFinish={(values) => console.log({ values })}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 25 }}
          onChange={handleInputChange}
          className="max-w-[400px] md:max-w-[500px] "
        >
          <div>
            <div className="font-bold text-lg mb-8">
              <h1>Location</h1>
            </div>

            <div>
              <Form.Item
                label="Address"
                name={"address"}
                rules={[{ required: true, message: "Enter address field" }]}
              >
                <TextArea rows={4} name="address" />
              </Form.Item>

              <Form.Item
                label="Pin Code"
                name={"pin_code"}
                rules={[{ required: true, message: "enter Pin-number" }]}
              >
                <Input name="pin_code" type="number" />
              </Form.Item>

              <Form.Item label="Country" className="" name="country">
                <Input disabled value="India" name="country" />
              </Form.Item>

              <Form.Item label="State" className="" name="state">
                <Input disabled value={"Kerala"} name="state" />
              </Form.Item>

              <Form.Item
                label="Latitude_Lognitude"
                name="latitude_lognitude"
                rules={[
                  {
                    required: true,
                    message: "mark your latitude and longitude",
                  },
                ]}
              >
                <Input name="latitude_lognitude" />
              </Form.Item>
            </div>
          </div>
        </Form>

        <div>
          <div className="font-bold text-lg mb-8">
            <h1>Time</h1>
          </div>
          <div>
            <TimeTable />
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button type="primary" className="bg-blue-600 " onClick={handleNext}>
            Next
          </Button>
          <Button className="bg-white " onClick={handlePrevious}>
            Previous
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Location;
