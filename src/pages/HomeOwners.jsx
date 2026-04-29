import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Input, Button, Select, Typography, Card, InputNumber } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const HomeOwners = () => {
    const [form] = Form.useForm();

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

                                <Form.Item style={{ marginTop: '20px' }}>
                                    <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#1562df', borderColor: '#1562df', fontFamily: "Manrope, sans-serif" }}>
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