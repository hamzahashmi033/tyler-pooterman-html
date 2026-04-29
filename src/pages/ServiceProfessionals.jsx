import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Input, Button, Typography, Card, Upload, message, Tag, Result } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ServiceProfessionals = () => {
    const [form] = Form.useForm();
    const [cardForm] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const onFinish = (values) => {
        console.log("Service Professional Data:", values);
        setSubmitted(true);
        setSelectedPlan("");
        setShowCardDetails(false);
        setPaymentCompleted(false);
        message.success("Profile submitted successfully. Please review the pricing plans below.");
    };

    const onCardFinish = (values) => {
        console.log("Selected Plan:", selectedPlan);
        console.log("Card Details:", values);
        setPaymentCompleted(true);
        message.success("Subscription completed successfully.");
    };

    const handleBackToEdit = () => {
        setSubmitted(false);
        setSelectedPlan("");
        setShowCardDetails(false);
        setPaymentCompleted(false);
        cardForm.resetFields();
    };

    const handleBackToPlans = () => {
        setShowCardDetails(false);
        setPaymentCompleted(false);
        cardForm.resetFields();
    };

    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "50px", marginBottom: "50px" }}>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <Card bordered={false} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", backgroundColor: "#f3f7fd" }}>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <Title level={2} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "8px" }}>
                                    Service Professional Sign Up
                                </Title>
                                <Text style={{ fontFamily: "Manrope, sans-serif", color: "#666", fontSize: "16px" }}>
                                    Partner with us to grow your local service business.
                                </Text>
                            </div>

                            {!submitted && (
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    style={{ fontFamily: "Manrope, sans-serif" }}
                                >
                                    {/* Company Name */}
                                    <Form.Item
                                        name="companyName"
                                        label="Company Name"
                                        rules={[{ required: true, message: 'Please enter your company name' }]}
                                    >
                                        <Input placeholder="Reliable Services Inc." size="large" />
                                    </Form.Item>

                                    {/* Address */}
                                    <Form.Item
                                        name="address"
                                        label="Business Address"
                                        rules={[{ required: true, message: 'Please enter your business address' }]}
                                    >
                                        <Input placeholder="123 Business St, Suite 100, City, State" size="large" />
                                    </Form.Item>

                                    <div className="row">
                                        {/* Phone Number */}
                                        <div className="col-md-6">
                                            <Form.Item
                                                name="phone"
                                                label="Phone Number"
                                                rules={[{ required: true, message: 'Phone number is required' }]}
                                            >
                                                <Input placeholder="(555) 000-0000" size="large" />
                                            </Form.Item>
                                        </div>
                                        {/* Email */}
                                        <div className="col-md-6">
                                            <Form.Item
                                                name="email"
                                                label="Email Address"
                                                rules={[{ type: 'email', required: true, message: 'Valid email is required' }]}
                                            >
                                                <Input placeholder="info@company.com" size="large" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* Website */}
                                        <div className="col-md-6">
                                            <Form.Item name="website" label="Website (Optional)">
                                                <Input placeholder="https://www.yourbusiness.com" size="large" />
                                            </Form.Item>
                                        </div>
                                        {/* Logo Upload */}
                                        <div className="col-md-6">
                                            <Form.Item
                                                name="logo"
                                                label="Company Logo"
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                                            >
                                                <Upload name="logo" listType="picture" maxCount={1} beforeUpload={() => false}>
                                                    <Button icon={<UploadOutlined />} size="large" style={{ width: '100%' }}>Click to Upload</Button>
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* Licensing Agency */}
                                        <div className="col-md-4">
                                            <Form.Item
                                                name="licensingAgency"
                                                label="Licensing Agency"
                                                rules={[{ required: true, message: 'Agency required' }]}
                                            >
                                                <Input placeholder="e.g. State Board" size="large" />
                                            </Form.Item>
                                        </div>
                                        {/* License # */}
                                        <div className="col-md-4">
                                            <Form.Item
                                                name="licenseNumber"
                                                label="License #"
                                                rules={[{ required: true, message: 'License # required' }]}
                                            >
                                                <Input placeholder="LIC-998877" size="large" />
                                            </Form.Item>
                                        </div>
                                        {/* Years in Business */}
                                        <div className="col-md-4">
                                            <Form.Item
                                                name="yearsInBusiness"
                                                label="Years in Business"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input type="number" placeholder="5" size="large" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <Form.Item
                                        name="description"
                                        label="Description of Business & Services"
                                        rules={[{ required: true, message: 'Please provide a brief description' }]}
                                    >
                                        <TextArea
                                            rows={4}
                                            placeholder="Tell homeowners about the services you provide, specialties, and service areas..."
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            style={{
                                                backgroundColor: '#1562df',
                                                borderColor: '#1562df',
                                                fontFamily: "Manrope, sans-serif",
                                                marginTop: '10px'
                                            }}
                                        >
                                            Create Professional Profile
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )}

                            {submitted && (
                                <div style={{ marginTop: "35px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                        <Tag color="blue" style={{ fontFamily: "Manrope, sans-serif", padding: "6px 12px", borderRadius: "20px" }}>
                                            Step 2 of 3
                                        </Tag>
                                        <Button onClick={handleBackToEdit} style={{ fontFamily: "Manrope, sans-serif" }}>
                                            Back to Edit Form
                                        </Button>
                                    </div>
                                    {!showCardDetails && (
                                        <>
                                            <Title level={3} style={{ fontFamily: "Manrope, sans-serif", textAlign: "center", marginBottom: "10px" }}>
                                                Choose a Pricing Plan
                                            </Title>
                                            <Text style={{ display: "block", textAlign: "center", color: "#666", marginBottom: "20px" }}>
                                                Select one plan to continue to card details.
                                            </Text>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <Card
                                                        bordered={false}
                                                        onClick={() => setSelectedPlan("plan1")}
                                                        style={{
                                                            cursor: "pointer",
                                                            height: "100%",
                                                            background: "#ffffff",
                                                            boxShadow: selectedPlan === "plan1" ? "0 10px 24px rgba(21, 98, 223, 0.18)" : "0 4px 12px rgba(0,0,0,0.08)",
                                                            borderTop: "4px solid #1562df",
                                                            border: selectedPlan === "plan1" ? "2px solid #1562df" : "2px solid #e8eef8",
                                                            borderRadius: "12px",
                                                            transition: "all 0.2s ease"
                                                        }}
                                                    >
                                                        <Tag color="processing" style={{ marginBottom: "12px", fontFamily: "Manrope, sans-serif" }}>
                                                            Most Popular
                                                        </Tag>
                                                        <Title level={4} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "6px" }}>
                                                            Service Company (1)
                                                        </Title>
                                                        <Text strong style={{ color: "#1562df", fontSize: "18px" }}>
                                                            $165/month
                                                        </Text>
                                                        <ul style={{ marginTop: "14px", paddingLeft: "20px", color: "#333" }}>
                                                            <li>Allows unlimited entries for properties serviced</li>
                                                            <li>Allows attaching service paperwork and bids/proposals into report ledger</li>
                                                            <li>Import company paperwork to convert into fillable forms emailed to office staff</li>
                                                            <li>Follow-up reminders for maintenance, bid follow-ups, and quality control</li>
                                                            <li>View up to 8 reports per month; additional reports are $60 each</li>
                                                        </ul>
                                                        <Button type={selectedPlan === "plan1" ? "primary" : "default"} block>
                                                            {selectedPlan === "plan1" ? "Selected" : "Select Plan"}
                                                        </Button>
                                                    </Card>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <Card
                                                        bordered={false}
                                                        onClick={() => setSelectedPlan("plan2")}
                                                        style={{
                                                            cursor: "pointer",
                                                            height: "100%",
                                                            background: "#ffffff",
                                                            boxShadow: selectedPlan === "plan2" ? "0 10px 24px rgba(21, 98, 223, 0.18)" : "0 4px 12px rgba(0,0,0,0.08)",
                                                            borderTop: "4px solid #79a7f1",
                                                            border: selectedPlan === "plan2" ? "2px solid #1562df" : "2px solid #e8eef8",
                                                            borderRadius: "12px",
                                                            transition: "all 0.2s ease"
                                                        }}
                                                    >
                                                        <Tag color="default" style={{ marginBottom: "12px", fontFamily: "Manrope, sans-serif" }}>
                                                            Flexible
                                                        </Tag>
                                                        <Title level={4} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "6px" }}>
                                                            Service Company (2)
                                                        </Title>
                                                        <Text strong style={{ color: "#1562df", fontSize: "18px" }}>
                                                            $50 Signup Fee + $10/Entry
                                                        </Text>
                                                        <ul style={{ marginTop: "14px", paddingLeft: "20px", color: "#333" }}>
                                                            <li>Per entry includes date and brief description of service</li>
                                                            <li>No attaching of service paperwork</li>
                                                            <li>No follow-up reminders</li>
                                                            <li>No importing of paperwork for digitizing</li>
                                                            <li>Reports are charged at full price</li>
                                                        </ul>
                                                        <Button type={selectedPlan === "plan2" ? "primary" : "default"} block>
                                                            {selectedPlan === "plan2" ? "Selected" : "Select Plan"}
                                                        </Button>
                                                    </Card>
                                                </div>
                                            </div>

                                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    disabled={!selectedPlan}
                                                    onClick={() => setShowCardDetails(true)}
                                                    style={{
                                                        backgroundColor: "#1562df",
                                                        borderColor: "#1562df",
                                                        fontFamily: "Manrope, sans-serif",
                                                        minWidth: "240px"
                                                    }}
                                                >
                                                    Continue to Card Details
                                                </Button>
                                            </div>
                                        </>
                                    )}

                                    {showCardDetails && !paymentCompleted && (
                                        <Card
                                            bordered={false}
                                            style={{
                                                marginTop: "25px",
                                                background: "#ffffff",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                                borderRadius: "12px"
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                                <Tag color="blue" style={{ fontFamily: "Manrope, sans-serif", padding: "4px 10px", borderRadius: "20px" }}>
                                                    Step 3 of 3
                                                </Tag>
                                                <Button onClick={handleBackToPlans} style={{ fontFamily: "Manrope, sans-serif" }}>
                                                    Back to Plans
                                                </Button>
                                            </div>
                                            <Title level={4} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "16px" }}>
                                                Card Details
                                            </Title>
                                            <Form
                                                form={cardForm}
                                                layout="vertical"
                                                onFinish={onCardFinish}
                                                style={{ fontFamily: "Manrope, sans-serif" }}
                                            >
                                                <Form.Item
                                                    name="cardName"
                                                    label="Name on Card"
                                                    rules={[{ required: true, message: "Please enter the card holder name" }]}
                                                >
                                                    <Input size="large" placeholder="John Smith" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="cardNumber"
                                                    label="Card Number"
                                                    rules={[{ required: true, message: "Please enter your card number" }]}
                                                >
                                                    <Input size="large" placeholder="1234 5678 9012 3456" maxLength={19} />
                                                </Form.Item>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Form.Item
                                                            name="expiryDate"
                                                            label="Expiry Date"
                                                            rules={[{ required: true, message: "Please enter expiry date" }]}
                                                        >
                                                            <Input size="large" placeholder="MM/YY" />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Form.Item
                                                            name="cvv"
                                                            label="CVV"
                                                            rules={[{ required: true, message: "Please enter CVV" }]}
                                                        >
                                                            <Input size="large" placeholder="123" maxLength={4} />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <Form.Item>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        size="large"
                                                        block
                                                        style={{
                                                            backgroundColor: "#1562df",
                                                            borderColor: "#1562df",
                                                            fontFamily: "Manrope, sans-serif"
                                                        }}
                                                    >
                                                        Complete Subscription
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </Card>
                                    )}

                                    {paymentCompleted && (
                                        <Card
                                            bordered={false}
                                            style={{
                                                marginTop: "25px",
                                                background: "#ffffff",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                                borderRadius: "12px"
                                            }}
                                        >
                                            <Result
                                                status="success"
                                                title="Subscription Completed Successfully"
                                                subTitle="Your selected plan is now active. You can go back to update details if needed."
                                            />
                                        </Card>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServiceProfessionals;