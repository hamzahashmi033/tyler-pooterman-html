import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Input, Button, Select, Typography, Card, InputNumber } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const HERO_IMAGES = [
    "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const HomeOwners = () => {
    const [form] = Form.useForm();
    const [agreed, setAgreed] = useState(false);
    const [activeHeroImageIndex, setActiveHeroImageIndex] = useState(0);

    const onFinish = (values) => {
        console.log("HomeOwner Data:", values);
    };

    useEffect(() => {
        const heroInterval = setInterval(() => {
            setActiveHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);

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
                                    Showcase Your Home With Confidence
                                </Title>
                                <Text style={{ color: "rgba(255,255,255,0.92)", fontSize: 15, lineHeight: 1.7, fontFamily: "Manrope, sans-serif" }}>
                                    Create your homeowner profile to list your property, request valuation, and connect
                                    with trusted professionals faster.
                                </Text>
                            </div>
                        </div>
                        <div
                            className="col-lg-6"
                            style={{
                                padding: "34px 30px",
                                maxHeight: "calc(100vh - 48px)",
                                overflowY: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className="homeowner-form"
                                style={{ width: "100%", fontFamily: "Manrope, sans-serif" }}
                            >
                                <div style={{ textAlign: "start", marginBottom: "30px" }}>
                                    <Title level={2} style={{ fontFamily: "Manrope, sans-serif", marginBottom: "8px" }}>
                                        Homeowner Sign Up
                                    </Title>
                                </div>
                                {/* Personal Info Section */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="firstName"
                                            label="First Name"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input placeholder="Jane" size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="lastName"
                                            label="Last Name"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input placeholder="Smith" size="large" />
                                        </Form.Item>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="email"
                                            label="Email Address"
                                            rules={[{ type: 'email', required: true }]}
                                        >
                                            <Input placeholder="jane.smith@email.com" size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        {/* Property Details Section */}
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="address"
                                            label="Property Address"
                                            rules={[{ required: true, message: 'Please enter your property address' }]}
                                        >
                                            <Input placeholder="123 Maple Avenue, City, State" size="large" />
                                        </Form.Item>
                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="propertyType"
                                            label="Property Type"
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select type" size="large"
                                                style={{ height: '54px', borderRadius: '100px' }}
                                            >
                                                <Option value="single-family">Single Family Home</Option>
                                                <Option value="condo">Condo / Apartment</Option>
                                                <Option value="townhouse">Townhouse</Option>
                                                <Option value="multi-family">Multi-Family</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="estimatedValue"
                                            label="Estimated Value (Optional)"
                                        >
                                            <InputNumber
                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                style={{ height: '54px', borderRadius: '100px', width: '100%' }}
                                                size="large"
                                                placeholder="500,000"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="intent"
                                            label="I am looking to..."
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select your goal" size="large"
                                                style={{ height: '54px', borderRadius: '100px' }}
                                            >
                                                <Option value="sell">Sell my home</Option>
                                                <Option value="rent">Rent out my home</Option>
                                                <Option value="valuation">Get a free valuation</Option>
                                                <Option value="refinance">Explore refinancing</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            style={{ marginBottom: "15px" }}
                                            name="password"
                                            label="Create Password"
                                            rules={[{ required: true, min: 6 }]}
                                        >
                                            <Input.Password size="large"
                                                style={{ height: '54px', borderRadius: '100px' }}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>


                                {/* Terms & Conditions */}
                                <div style={{
                                    border: "1.5px solid #D8E6F7",
                                    borderRadius: "12px",
                                    padding: "12px 15px",
                                    background: agreed ? "rgba(21,99,223,0.04)" : "#fff8f8",
                                    marginBottom: "15px",
                                    transition: "background 0.2s, border-color 0.2s",
                                    borderColor: agreed ? "rgba(21,99,223,0.35)" : "#f0c0c0",
                                }}>
                                    <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={e => setAgreed(e.target.checked)}
                                            style={{
                                                marginTop: "3px",
                                                width: "18px",
                                                height: "18px",
                                                accentColor: "#1563df",
                                                flexShrink: 0,
                                                cursor: "pointer",
                                            }}
                                        />
                                        <span style={{ fontSize: "12px", color: "#4A5568", lineHeight: "1.65", fontFamily: "Manrope, sans-serif" }}>
                                            <strong style={{ color: "#161E2D", display: "block", marginBottom: "12px", fontSize: "13px" }}>
                                                Required Checkbox (Must Be Checked)
                                            </strong>
                                            I agree to the{" "}
                                            <Link to="/terms-conditions" target="_blank" style={{ color: "#1563df", fontWeight: "700" }}>Terms of Use</Link>
                                            {" "}and{" "}
                                            <Link to="/privacy-policy" target="_blank" style={{ color: "#1563df", fontWeight: "700" }}>Privacy Policy</Link>.
                                            {" "}I understand that:
                                            <ul style={{ margin: "8px 0 0", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                                                <li>The platform does not verify or guarantee any submitted information</li>
                                                <li>I am solely responsible for the accuracy and legality of my data</li>
                                                <li>The platform holds no liability for pesticide use, environmental conditions, or property-related claims</li>
                                                <li>I accept full responsibility for any legal, financial, or regulatory consequences related to my property</li>
                                            </ul>
                                        </span>
                                    </label>
                                </div>

                                {!agreed && (
                                    <p style={{ fontSize: "12px", color: "#DC3545", marginBottom: "12px", fontFamily: "Manrope, sans-serif", display: "flex", alignItems: "center", gap: "6px" }}>
                                        <span>⚠️</span> You must accept the terms and conditions to create an account.
                                    </p>
                                )}

                                <Form.Item style={{ marginTop: '4px', marginBottom: 0 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        disabled={!agreed}
                                        style={{
                                            backgroundColor: agreed ? '#1562df' : '#a0b4d6',
                                            borderColor: agreed ? '#1562df' : '#a0b4d6',
                                            fontFamily: "Manrope, sans-serif",
                                            borderRadius: "100px",
                                            height: "54px",
                                            cursor: agreed ? "pointer" : "not-allowed",
                                            transition: "background-color 0.25s, border-color 0.25s",
                                        }}
                                    >
                                        Create Homeowner Account
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeOwners;