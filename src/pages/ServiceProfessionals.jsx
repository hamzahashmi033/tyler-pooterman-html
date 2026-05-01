import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Typography, Card, Upload, message, Tag, Result, Carousel } from "antd";
import { UploadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const C = {
    primary: "#1563df",
    primaryDeep: "#0f4fbe",
    primaryLight: "rgba(21,99,223,0.08)",
    primaryBorder: "rgba(21,99,223,0.2)",
    slate: "#161E2D",
    muted: "#6B7280",
    softBg: "#f3f7fd",
    white: "#ffffff"
};

const PLAN_OPTIONS = [
    {
        key: "plan1",
        badge: "Most Popular",
        badgeColor: "processing",
        title: "Service Company (1)",
        price: "$165/month",
        accent: "#1563df",
        gradient: "linear-gradient(135deg,#EEF4FF 0%,#DCE9FF 100%)",
        features: [
            "Unlimited entries for properties serviced",
            "Attach service paperwork and bids/proposals in report ledger",
            "Import paperwork into fillable forms for office records",
            "Follow-up reminders for maintenance and quality control",
            "Up to 8 report views/month, then $60 per report"
        ]
    },
    {
        key: "plan2",
        badge: "Flexible",
        badgeColor: "default",
        title: "Service Company (2)",
        price: "$50 Signup Fee + $10/Entry",
        accent: "#0ea5b7",
        gradient: "linear-gradient(135deg,#ECFEFF 0%,#D9F5F9 100%)",
        features: [
            "Per entry includes date and brief service description",
            "No service paperwork attachments",
            "No follow-up reminders",
            "No paperwork import/digitization",
            "Reports charged at full price"
        ]
    }
];

const HERO_IMAGES = [
    "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const ServiceProfessionals = () => {
    const [form] = Form.useForm();
    const [cardForm] = Form.useForm();
    const planCarouselRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const [activeHeroImageIndex, setActiveHeroImageIndex] = useState(0);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const onFinish = (values) => {
        console.log("Service Professional Data:", values);
        setSubmitted(true);
        setSelectedPlan("");
        setActivePlanIndex(0);
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

    const goToPlanSlide = (index) => {
        setActivePlanIndex(index);
        planCarouselRef.current?.goTo(index);
    };

    const handlePrevPlan = () => {
        const prevIndex = activePlanIndex === 0 ? PLAN_OPTIONS.length - 1 : activePlanIndex - 1;
        goToPlanSlide(prevIndex);
    };

    const handleNextPlan = () => {
        const nextIndex = activePlanIndex === PLAN_OPTIONS.length - 1 ? 0 : activePlanIndex + 1;
        goToPlanSlide(nextIndex);
    };

    useEffect(() => {
        const heroInterval = setInterval(() => {
            setActiveHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 3000);

        return () => clearInterval(heroInterval);
    }, []);

    return (
        <>
            <section style={{ background: "#0b1628", minHeight: "100vh", padding: "24px 0" }}>
                <div className="container">
                    <div
                        className="row g-0 shadow-sm overflow-hidden"
                        style={{
                            minHeight: "calc(100vh - 48px)",
                            borderRadius: "30px",
                            background: "#fff"
                        }}
                    >
                        <div
                            className="col-lg-6 d-none d-lg-flex"
                            style={{
                                position: "relative",
                                alignItems: "flex-end",
                                padding: "40px",
                                overflow: "hidden"
                            }}
                        >
                            {HERO_IMAGES.map((image, index) => (
                                <div
                                    key={image}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundImage: `linear-gradient(160deg, rgba(9, 27, 62, 0.24), rgba(9, 27, 62, 0.58)), url(${image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        opacity: activeHeroImageIndex === index ? 1 : 0,
                                        transition: "opacity 900ms ease-in-out"
                                    }}
                                />
                            ))}
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <Title level={1} style={{ color: "#fff", fontFamily: "Manrope, sans-serif", marginBottom: 10 }}>
                                    Grow Your Service Business
                                </Title>
                                <Text style={{ color: "rgba(255,255,255,0.92)", fontSize: 15, lineHeight: 1.7, fontFamily: "Manrope, sans-serif" }}>
                                    Create your professional profile to receive service opportunities, stay organized,
                                    and build trust with homeowners.
                                </Text>
                            </div>
                        </div>
                        <div
                            className="col-lg-6"
                            style={{
                                padding: "34px 30px",
                                maxHeight: "calc(100vh - 48px)",
                                overflowY: "auto",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {!submitted && (
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    style={{ fontFamily: "Manrope, sans-serif" }}
                                >
                                    <div style={{ textAlign: 'start', marginBottom: '30px' }}>
                                        <Title level={2} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "8px" }}>
                                            Service Professional Sign Up
                                        </Title>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Company Name */}
                                            <Form.Item
                                                name="companyName"
                                                label="Company Name"
                                                rules={[{ required: true, message: 'Please enter your company name' }]}
                                            >
                                                <Input placeholder="Reliable Services Inc." size="large" />
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-6">
                                            {/* Address */}
                                            <Form.Item
                                                name="address"
                                                label="Business Address"
                                                rules={[{ required: true, message: 'Please enter your business address' }]}
                                            >
                                                <Input placeholder="123 Business St, Suite 100, City, State" size="large" />
                                            </Form.Item>
                                        </div>
                                    </div>

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
                                                <Upload name="logo" listType="picture" maxCount={1} beforeUpload={() => false} style={{ width: '100%', height: '54px', borderRadius: '100px', borderColor: '#e4e4e4' }}>
                                                    <Button icon={<UploadOutlined />} size="large" style={{ width: '100%', height: '54px', borderRadius: '100px', borderColor: '#e4e4e4' }}>Click to Upload</Button>
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
                                            style={{ borderRadius: '20px', padding: '15px' }}
                                            rows={4}
                                            placeholder="Tell homeowners about the services you provide, specialties, and service areas..."
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        style={{ marginBottom: '0px' }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            style={{
                                                backgroundColor: '#1562df',
                                                borderColor: '#1562df',
                                                fontFamily: "Manrope, sans-serif",
                                                marginTop: '10px',
                                                borderRadius: '100px',
                                                height: '54px',
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
                                        {!paymentCompleted && (
                                            <Tag color="blue" style={{ fontFamily: "Manrope, sans-serif", padding: "6px 12px", borderRadius: "20px" }}>
                                                Step 2 of 3
                                            </Tag>
                                        )}
                                        {!paymentCompleted && (
                                            <Button onClick={handleBackToEdit} style={{ fontFamily: "Manrope, sans-serif" }}>
                                                Back to Edit Form
                                            </Button>
                                        )}
                                    </div>
                                    {!showCardDetails && (
                                        <>
                                            <Title level={3} style={{ fontFamily: "Manrope, sans-serif", textAlign: "center", marginBottom: "10px" }}>
                                                Choose a Pricing Plan
                                            </Title>
                                            <Text style={{ display: "block", textAlign: "center", color: "#666", marginBottom: "20px" }}>
                                                Select one plan to continue to card details.
                                            </Text>
                                            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                                                <Carousel
                                                    ref={planCarouselRef}
                                                    dots
                                                    afterChange={setActivePlanIndex}
                                                    style={{ marginBottom: "18px" }}
                                                >
                                                    {PLAN_OPTIONS.map((plan) => {
                                                        const isSelected = selectedPlan === plan.key;
                                                        return (
                                                            <div key={plan.key}>
                                                                <Card
                                                                    bordered={false}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        background: C.white,
                                                                        borderRadius: "18px",
                                                                        border: isSelected ? `2px solid ${plan.accent}` : "1px solid #dce8f8",
                                                                        boxShadow: isSelected
                                                                            ? "0 18px 36px rgba(21,99,223,0.22)"
                                                                            : "0 8px 20px rgba(22,30,45,0.08)",
                                                                        overflow: "hidden",
                                                                        transition: "all 0.25s ease",
                                                                        margin: "0 20px"
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            background: plan.gradient,
                                                                            margin: "-24px -24px 20px",
                                                                            padding: "20px 22px 16px",
                                                                            borderBottom: `1px solid ${C.primaryBorder}`
                                                                        }}
                                                                    >
                                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                                                                            <Tag color={plan.badgeColor} style={{ fontFamily: "Manrope, sans-serif", borderRadius: "999px", padding: "3px 11px" }}>
                                                                                {plan.badge}
                                                                            </Tag>
                                                                            <span
                                                                                style={{
                                                                                    width: "30px",
                                                                                    height: "30px",
                                                                                    borderRadius: "10px",
                                                                                    display: "inline-flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    background: `${plan.accent}1A`,
                                                                                    border: `1px solid ${plan.accent}4D`
                                                                                }}
                                                                            >
                                                                                {plan.key === "plan1" ? "★" : "⚙"}
                                                                            </span>
                                                                        </div>
                                                                        <Title level={4} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "4px", color: C.slate }}>
                                                                            {plan.title}
                                                                        </Title>
                                                                        <Text strong style={{ color: plan.accent, fontSize: "18px", fontFamily: "Manrope, sans-serif" }}>
                                                                            {plan.price}
                                                                        </Text>
                                                                    </div>

                                                                    <ul style={{ marginTop: "2px", paddingLeft: "0px", listStyle: "none", color: C.slate }}>
                                                                        {plan.features.map((feature) => (
                                                                            <li key={feature} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: C.muted, lineHeight: "1.55" }}>
                                                                                <span style={{ color: plan.accent, fontWeight: 700 }}>✓</span>
                                                                                <span>{feature}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>

                                                                    <Button
                                                                        type={isSelected ? "primary" : "default"}
                                                                        block
                                                                        onClick={() => setSelectedPlan(plan.key)}
                                                                        style={{
                                                                            marginTop: "8px",
                                                                            height: "42px",
                                                                            borderRadius: "10px",
                                                                            fontFamily: "Manrope, sans-serif",
                                                                            borderColor: isSelected ? plan.accent : "#cad8ef",
                                                                            background: isSelected ? plan.accent : C.softBg,
                                                                            color: isSelected ? "#fff" : C.slate,
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {isSelected ? "Selected Plan" : "Select Plan"}
                                                                    </Button>
                                                                </Card>
                                                            </div>
                                                        );
                                                    })}
                                                </Carousel>

                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
                                                    <Button shape="circle" icon={<LeftOutlined />} onClick={handlePrevPlan} />
                                                    <Text style={{ color: C.muted, fontFamily: "Manrope, sans-serif" }}>
                                                        {activePlanIndex + 1} / {PLAN_OPTIONS.length}
                                                    </Text>
                                                    <Button shape="circle" icon={<RightOutlined />} onClick={handleNextPlan} />
                                                </div>
                                            </div>

                                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    disabled={!selectedPlan}
                                                    onClick={() => setShowCardDetails(true)}
                                                    style={{
                                                        backgroundColor: !selectedPlan ? "#d9d9d9" : "#1562df",
                                                        borderColor: !selectedPlan ? "#d9d9d9" : "#1562df",
                                                        color: !selectedPlan ? "#888" : "#fff",
                                                        cursor: !selectedPlan ? "not-allowed" : "pointer",
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
                                        <div
                                        >
                                            <Result
                                                style={{ fontFamily: "Manrope, sans-serif" }}
                                                status="success"
                                                title="Subscription Completed Successfully"
                                                subTitle="Your selected plan is now active. You can go back to update details if needed."
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceProfessionals;