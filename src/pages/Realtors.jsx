import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, Input, Button, Select, Typography, Card } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const Realtors = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Realtor Data:", values);
    };

    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "50px", marginBottom: "50px" }}>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <Card bordered={false} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", backgroundColor: "#f3f7fd" }}>
                            <div style={{ textAlign: 'center', marginBottom: "30px" }}>
                                <Title level={2} style={{ textAlign: 'center', fontFamily: "Manrope, sans-serif", marginBottom: "8px" }}>
                                    Realtor Registration
                                </Title>
                                <Text style={{ fontFamily: "Manrope, sans-serif", color: "#666", fontSize: "16px" }}>
                                    Join our professional network and start managing your listings.
                                </Text>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                scrollToFirstError
                                style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                                {/* Full Name */}
                                <Form.Item
                                    name="fullname"
                                    label="Full Name"
                                    rules={[{ required: true, message: 'Please enter your full name' }]}
                                >
                                    <Input placeholder="John Doe" size="large" />
                                </Form.Item>

                                {/* Email and Phone Row */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="email"
                                            label="Email Address"
                                            rules={[
                                                { type: 'email', message: 'The input is not valid E-mail!' },
                                                { required: true, message: 'Please input your E-mail!' },
                                            ]}
                                        >
                                            <Input placeholder="email@example.com" size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input placeholder="+1 (555) 000-0000" size="large" />
                                        </Form.Item>
                                    </div>
                                </div>

                                {/* Professional Info */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="license"
                                            label="Real Estate License #"
                                            rules={[{ required: true, message: 'License number is required' }]}
                                        >
                                            <Input placeholder="RE-12345678" size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item
                                            name="experience"
                                            label="Years of Experience"
                                        >
                                            <Select placeholder="Select experience" size="large">
                                                <Option value="0-2">0-2 Years</Option>
                                                <Option value="3-5">3-5 Years</Option>
                                                <Option value="5-10">5-10 Years</Option>
                                                <Option value="10+">10+ Years</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                {/* Agency/Brokerage Name */}
                                <Form.Item
                                    name="agency"
                                    label="Agency / Brokerage Name"
                                    rules={[{ required: true, message: 'Please enter your agency name' }]}
                                >
                                    <Input placeholder="e.g. Dream Home Realty" size="large" />
                                </Form.Item>

                                {/* Password */}
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    hasFeedback
                                >
                                    <Input.Password size="large" />
                                </Form.Item>

                                {/* Submit Button */}
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" block
                                        style={{ backgroundColor: "#1562df", borderColor: "#1562df", fontFamily: "Manrope, sans-serif" }}
                                    >
                                        Register as Realtor
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

export default Realtors;