import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Input, Button, Select, Typography, Card, InputNumber } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const HomeOwners = () => {
    const [form] = Form.useForm();
    const [agreed, setAgreed] = useState(false);

    const onFinish = (values) => {
        console.log("HomeOwner Data:", values);
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
                                <Title level={2} style={{ fontFamily: "Manrope, sans-serif" }}>Homeowner Sign Up</Title>
                                <Text style={{ fontFamily: "Manrope, sans-serif", color: "#666", fontSize: "16px" }}>
                                    List your property or get a professional valuation.
                                </Text>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                {/* Personal Info Section */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="firstName"
                                            label="First Name"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input placeholder="Jane" size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="lastName"
                                            label="Last Name"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input placeholder="Smith" size="large" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    rules={[{ type: 'email', required: true }]}
                                >
                                    <Input placeholder="jane.smith@email.com" size="large" />
                                </Form.Item>

                                <hr style={{ margin: '25px 0' }} />

                                {/* Property Details Section */}
                                <Form.Item
                                    name="address"
                                    label="Property Address"
                                    rules={[{ required: true, message: 'Please enter your property address' }]}
                                >
                                    <Input placeholder="123 Maple Avenue, City, State" size="large" />
                                </Form.Item>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="propertyType"
                                            label="Property Type"
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select type" size="large">
                                                <Option value="single-family">Single Family Home</Option>
                                                <Option value="condo">Condo / Apartment</Option>
                                                <Option value="townhouse">Townhouse</Option>
                                                <Option value="multi-family">Multi-Family</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="estimatedValue"
                                            label="Estimated Value (Optional)"
                                        >
                                            <InputNumber
                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                style={{ width: '100%' }}
                                                size="large"
                                                placeholder="500,000"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item
                                    name="intent"
                                    label="I am looking to..."
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="Select your goal" size="large">
                                        <Option value="sell">Sell my home</Option>
                                        <Option value="rent">Rent out my home</Option>
                                        <Option value="valuation">Get a free valuation</Option>
                                        <Option value="refinance">Explore refinancing</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Create Password"
                                    rules={[{ required: true, min: 6 }]}
                                >
                                    <Input.Password size="large" />
                                </Form.Item>

                                {/* Terms & Conditions */}
                                <div style={{
                                    border: "1.5px solid #D8E6F7",
                                    borderRadius: "12px",
                                    padding: "18px 20px",
                                    background: agreed ? "rgba(21,99,223,0.04)" : "#fff8f8",
                                    marginBottom: "20px",
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
                                        <span style={{ fontSize: "13px", color: "#4A5568", lineHeight: "1.65", fontFamily: "Manrope, sans-serif" }}>
                                            <strong style={{ color: "#161E2D", display: "block", marginBottom: "6px", fontSize: "13px" }}>
                                                Required Checkbox (Must Be Checked)
                                            </strong>
                                            I agree to the{" "}
                                            <Link to="/terms-conditions" target="_blank" style={{ color: "#1563df", fontWeight: "700" }}>Terms of Use</Link>
                                            {" "}and{" "}
                                            <Link to="/privacy-policy" target="_blank" style={{ color: "#1563df", fontWeight: "700" }}>Privacy Policy</Link>.
                                            {" "}I understand that:
                                            <ul style={{ margin: "8px 0 0", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "4px" }}>
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
                                            cursor: agreed ? "pointer" : "not-allowed",
                                            transition: "background-color 0.25s, border-color 0.25s",
                                        }}
                                    >
                                        Create Homeowner Account
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomeOwners;