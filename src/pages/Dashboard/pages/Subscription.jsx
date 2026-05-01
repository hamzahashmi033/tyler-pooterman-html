import { useMemo, useState } from 'react';
import { Button, Card, Col, Modal, Progress, Row, Table, Tag, message } from 'antd';
import { CalendarOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import Dashboard from '../Dashboard';

const REPORTS_STORAGE_KEY = 'dashboardReports';
const SUBSCRIPTION_PLAN_KEY = 'dashboardSubscriptionPlanId';
const DEFAULT_MONTHLY_PLAN_ID = 'service-company-1';

const plans = [
    {
        id: 'service-company-1',
        planName: 'Service Company (1)',
        pricing: '$165 / month',
        type: 'Monthly',
        monthlyPrice: 165,
        signupFee: 0,
        entryFee: 0,
        includesReportViews: 8,
        reportOverageCost: 60,
        features: [
            'Unlimited entries for properties serviced',
            'Allows attaching service paperwork and bids/proposals into the report ledger',
            'Import company paperwork to convert into fillable forms and email to office staff for record keeping',
            'Follow-up reminders for maintenance, bid follow-ups, and quality control',
            'View up to 8 reports/month; each additional report costs $60'
        ]
    },
    {
        id: 'service-company-2',
        planName: 'Service Company (2)',
        pricing: '$50 signup fee + $10 / entry',
        type: 'Pay As You Go',
        monthlyPrice: 0,
        signupFee: 50,
        entryFee: 10,
        includesReportViews: 0,
        reportOverageCost: 60,
        features: [
            'Per-entry reporting: Date + brief description of service',
            'No document attachments',
            'No follow-up reminders',
            'No paperwork import/digitization',
            'Reports charged at full price'
        ]
    }
];

const currentSubscription = { nextBillingDate: '2026-05-20' };
const panelStyle = {
    borderRadius: 18,
    border: '1px solid #e1e9fa',
    boxShadow: '0 12px 26px rgba(18,42,93,0.08)',
    background: '#fff'
};
const bulletItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
    color: '#334155',
    fontSize: 13,
    lineHeight: 1.55
};
const iconBadge = {
    width: 30,
    height: 30,
    borderRadius: 10,
    background: 'rgba(21,99,223,0.12)',
    border: '1px solid rgba(21,99,223,0.28)',
    color: '#1563df',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
};

const Subscription = () => {
    const [selectedPlanId, setSelectedPlanId] = useState(
        () => {
            const savedPlanId = localStorage.getItem(SUBSCRIPTION_PLAN_KEY);
            const savedPlan = plans.find((plan) => plan.id === savedPlanId);
            return savedPlan?.type === 'Monthly' ? savedPlanId : DEFAULT_MONTHLY_PLAN_ID;
        }
    );

    const reportEntriesThisMonth = useMemo(() => {
        try {
            const storedReports = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
            const now = new Date();
            return Array.isArray(storedReports)
                ? storedReports.filter((report) => {
                    const dateString = report?.serviceProvidedDate || report?.serviceDate;
                    if (!dateString) return false;
                    const reportDate = new Date(dateString);
                    return (
                        !Number.isNaN(reportDate.getTime()) &&
                        reportDate.getMonth() === now.getMonth() &&
                        reportDate.getFullYear() === now.getFullYear()
                    );
                }).length
                : 0;
        } catch (error) {
            return 0;
        }
    }, []);

    const activePlan = plans.find((plan) => plan.id === selectedPlanId) || plans[0];
    const includedReports = activePlan.includesReportViews;
    const viewedReports = reportEntriesThisMonth;
    const overageReports = includedReports > 0 ? Math.max(viewedReports - includedReports, 0) : viewedReports;
    const overageAmount = overageReports * activePlan.reportOverageCost;
    const basePlanCharge = activePlan.monthlyPrice;
    const signupCharge = activePlan.signupFee;
    const entryCharge = activePlan.entryFee * viewedReports;
    const totalAdditional = overageAmount + entryCharge + signupCharge;
    const reportUsagePercent = includedReports > 0
        ? Math.min(Math.round((viewedReports / includedReports) * 100), 100)
        : 100;

    const handlePlanChange = (value) => {
        setSelectedPlanId(value);
        localStorage.setItem(SUBSCRIPTION_PLAN_KEY, value);
        message.success('Plan updated successfully.');
    };
    const showPlanSwitchConfirm = (plan) => {
        Modal.confirm({
            centered: true,
            title: `Switch to ${plan.planName}?`,
            icon: <ExclamationCircleOutlined style={{ color: '#1563df' }} />,
            content: `You are about to switch your subscription to ${plan.pricing}. This update will be applied to your account billing.`,
            okText: 'Yes, Switch Plan',
            cancelText: 'Keep Current Plan',
            okButtonProps: {
                style: {
                    borderRadius: 10,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1563df 0%, #0f4fbe 100%)',
                    border: 'none'
                }
            },
            cancelButtonProps: {
                style: {
                    borderRadius: 10
                }
            },
            onOk: () => handlePlanChange(plan.id)
        });
    };

    const additionalCostData = [
        {
            id: 'base-charge',
            item: 'Base Plan Charge',
            quantity: 1,
            unitCost: `$${basePlanCharge.toFixed(2)}`,
            amount: `$${basePlanCharge.toFixed(2)}`
        },
        {
            id: 'signup-fee',
            item: 'Signup Fee',
            quantity: signupCharge > 0 ? 1 : 0,
            unitCost: signupCharge > 0 ? `$${signupCharge.toFixed(2)}` : '$0.00',
            amount: signupCharge > 0 ? `$${signupCharge.toFixed(2)}` : '$0.00'
        },
        {
            id: 'entry-cost',
            item: 'Entry Charges',
            quantity: viewedReports,
            unitCost: `$${activePlan.entryFee.toFixed(2)}`,
            amount: `$${entryCharge.toFixed(2)}`
        },
        {
            id: 'overage-cost',
            item: 'Additional Report Charges',
            quantity: overageReports,
            unitCost: `$${activePlan.reportOverageCost.toFixed(2)}`,
            amount: `$${overageAmount.toFixed(2)}`
        }
    ];

    const subscriptionColumns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (value) => <span style={{ fontWeight: 700, color: '#0f172a' }}>{value}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (value) => <span style={{ color: '#334155', fontWeight: 600 }}>{value}</span>
        },
        {
            title: 'Unit Cost',
            dataIndex: 'unitCost',
            key: 'unitCost',
            render: (value) => <span style={{ color: '#475569' }}>{value}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (value) => <span style={{ fontWeight: 800, color: '#0f4fbe' }}>{value}</span>
        }
    ];

    return (
        <Dashboard pageTitle="Subscription" hidePageHeading>
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div
                        style={{
                            marginBottom: 18,
                            borderRadius: 18,
                            border: '1px solid #dbe8ff',
                            background: 'linear-gradient(105deg, #0d47a8 0%, #1563df 60%, #2b7bff 100%)',
                            color: '#fff',
                            padding: '24px'
                        }}
                    >
                        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Subscription</div>
                        <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14 }}>
                            Review your active plan, report usage, and additional billing details.
                        </div>
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card
                                title={<span style={{ display: 'flex', alignItems: 'center' }}><span style={iconBadge}><FundProjectionScreenOutlined /></span>Current Plan</span>}
                                bordered={false}
                                style={{ ...panelStyle, height: '100%', minHeight: 320 }}
                            >
                                <p style={{ marginBottom: 10 }}><strong>Plan:</strong> {activePlan.planName}</p>
                                <p style={{ marginBottom: 10 }}>
                                    <strong>Type:</strong>{' '}
                                    <Tag style={{ borderRadius: 999, paddingInline: 10 }} color={activePlan.type === 'Monthly' ? 'green' : 'blue'}>
                                        {activePlan.type}
                                    </Tag>
                                </p>
                                <p style={{ marginBottom: 10 }}><strong>Pricing:</strong> {activePlan.pricing}</p>
                                <p style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CalendarOutlined style={{ color: '#1563df' }} />
                                    <span><strong>Next Billing Date:</strong> {currentSubscription.nextBillingDate}</span>
                                </p>
                                <div style={{ marginTop: 16, borderTop: '1px solid #e6eefb', paddingTop: 12 }}>
                                    <div style={bulletItemStyle}>
                                        <span style={{ color: '#1563df' }}>•</span>
                                        <span>Active billing model tailored for service providers.</span>
                                    </div>
                                    <div style={bulletItemStyle}>
                                        <span style={{ color: '#1563df' }}>•</span>
                                        <span>Auto tracks usage and calculates overage transparently.</span>
                                    </div>
                                    <div style={{ ...bulletItemStyle, marginBottom: 0 }}>
                                        <span style={{ color: '#1563df' }}>•</span>
                                        <span>Switch plan anytime from the options below.</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card
                                title={<span style={{ display: 'flex', alignItems: 'center' }}><span style={iconBadge}><FileTextOutlined /></span>Reports Included & Usage</span>}
                                bordered={false}
                                style={{ ...panelStyle, height: '100%', minHeight: 320 }}
                            >
                                <p style={{ marginBottom: 10 }}><strong>Included Reports:</strong> {includedReports > 0 ? includedReports : 'Not included in this plan'}</p>
                                <p style={{ marginBottom: 10 }}><strong>Report Entries (This Month):</strong> {viewedReports}</p>
                                <p style={{ marginBottom: 12 }}><strong>Overage Reports:</strong> {overageReports}</p>
                                <Progress
                                    percent={reportUsagePercent}
                                    status={reportUsagePercent >= 90 ? 'exception' : 'active'}
                                    strokeColor={{ '0%': '#60a5fa', '100%': '#1563df' }}
                                />
                                <p style={{ marginTop: '12px', marginBottom: 0 }}>
                                    <strong>Additional Report Cost:</strong>{' '}
                                    {activePlan.reportOverageCost > 0 ? `$${activePlan.reportOverageCost} / report` : 'N/A'}
                                </p>
                                <p style={{ marginTop: '8px', marginBottom: 0 }}>
                                    <strong>Current Overage Amount:</strong> ${overageAmount.toFixed(2)}
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div className="col-xl-12 mt-5">
                    <div className="widget-box-2 mb-24" style={panelStyle}>
                        <h5 className="title mb-20" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={iconBadge}><DollarCircleOutlined /></span>
                            Additional Cost Breakdown
                        </h5>
                        <Table
                            rowKey="id"
                            columns={subscriptionColumns}
                            dataSource={additionalCostData}
                            pagination={false}
                            locale={{ emptyText: 'No additional costs.' }}
                            style={{ borderRadius: 12, overflow: 'hidden' }}
                            size="middle"
                            footer={() => (
                                <div style={{ textAlign: 'right', color: '#0f4fbe' }}>
                                    <strong>Total Additional Cost: ${totalAdditional.toFixed(2)}</strong>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="col-xl-12 mt-5">
                    <div className="widget-box-2 mb-24" style={panelStyle}>
                        <h5 className="title mb-20" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={iconBadge}><CalendarOutlined /></span>
                            Plan Details
                        </h5>
                        <div style={{ marginBottom: 14 }}>
                            <div style={bulletItemStyle}>
                                <span style={{ color: '#1563df' }}>•</span>
                                <span>Compare plans side by side and pick what fits your monthly workflow.</span>
                            </div>
                            <div style={bulletItemStyle}>
                                <span style={{ color: '#1563df' }}>•</span>
                                <span>Each plan clearly shows cost structure, limits, and included benefits.</span>
                            </div>
                            <div style={{ ...bulletItemStyle, marginBottom: 0 }}>
                                <span style={{ color: '#1563df' }}>•</span>
                                <span>Current plan is highlighted for quick visual confirmation.</span>
                            </div>
                        </div>
                        <Row gutter={[16, 16]}>
                            {plans.map((plan) => (
                                <Col xs={24} md={12} key={plan.id}>
                                    <Card
                                        title={plan.planName}
                                        bordered
                                        style={{
                                            height: '100%',
                                            borderRadius: 14,
                                            borderColor: plan.id === activePlan.id ? '#94baf9' : '#d8e4f8',
                                            boxShadow: plan.id === activePlan.id ? '0 10px 22px rgba(21,99,223,0.14)' : 'none'
                                        }}
                                        extra={plan.id === activePlan.id ? <Tag color="green" style={{ borderRadius: 999 }}>Current Plan</Tag> : null}
                                    >
                                        <p><strong>Pricing:</strong> {plan.pricing}</p>
                                        <ul style={{ paddingLeft: 0, marginBottom: 0, marginTop: 8, listStyle: 'none' }}>
                                            {plan.features.map((feature) => (
                                                <li key={feature} style={{ marginBottom: '8px', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                    <span style={{ color: '#16a34a', fontWeight: 800, lineHeight: '1.2', marginTop: 1 }}>✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ marginTop: '14px' }}>
                                            <Button
                                                type={plan.id === activePlan.id ? 'default' : 'primary'}
                                                block
                                                disabled={plan.id === activePlan.id}
                                                onClick={() => showPlanSwitchConfirm(plan)}
                                                style={{
                                                    borderRadius: 10,
                                                    height: 40,
                                                    fontWeight: 700
                                                }}
                                            >
                                                {plan.id === activePlan.id ? 'Current Plan' : 'Switch to this Plan'}
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Subscription;
