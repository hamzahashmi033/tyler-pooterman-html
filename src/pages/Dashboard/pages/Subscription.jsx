import { useMemo, useState } from 'react';
import { Button, Card, Col, Progress, Row, Table, Tag, message } from 'antd';
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
        { title: 'Item', dataIndex: 'item', key: 'item' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Unit Cost', dataIndex: 'unitCost', key: 'unitCost' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' }
    ];

    return (
        <Dashboard pageTitle="Subscription">
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card title="Current Plan" bordered={false} style={{ height: '100%' }}>
                                <p><strong>Plan:</strong> {activePlan.planName}</p>
                                <p>
                                    <strong>Type:</strong>{' '}
                                    <Tag color={activePlan.type === 'Monthly' ? 'green' : 'blue'}>
                                        {activePlan.type}
                                    </Tag>
                                </p>
                                <p><strong>Pricing:</strong> {activePlan.pricing}</p>
                                <p><strong>Next Billing Date:</strong> {currentSubscription.nextBillingDate}</p>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card title="Reports Included & Usage" bordered={false}>
                                <p><strong>Included Reports:</strong> {includedReports > 0 ? includedReports : 'Not included in this plan'}</p>
                                <p><strong>Report Entries (This Month):</strong> {viewedReports}</p>
                                <p><strong>Overage Reports:</strong> {overageReports}</p>
                                <Progress percent={reportUsagePercent} status={reportUsagePercent >= 90 ? 'exception' : 'active'} />
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
                    <div className="widget-box-2 mb-24">
                        <h5 className="title mb-20">Additional Cost Breakdown</h5>
                        <Table
                            rowKey="id"
                            columns={subscriptionColumns}
                            dataSource={additionalCostData}
                            pagination={false}
                            locale={{ emptyText: 'No additional costs.' }}
                            footer={() => (
                                <div style={{ textAlign: 'right' }}>
                                    <strong>Total Additional Cost: ${totalAdditional.toFixed(2)}</strong>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="col-xl-12 mt-5">
                    <div className="widget-box-2 mb-24">
                        <h5 className="title mb-20">Plan Details</h5>
                        <Row gutter={[16, 16]}>
                            {plans.map((plan) => (
                                <Col xs={24} md={12} key={plan.id}>
                                    <Card
                                        title={plan.planName}
                                        bordered
                                        style={{ height: '100%' }}
                                        extra={plan.id === activePlan.id ? <Tag color="green">Current Plan</Tag> : null}
                                    >
                                        <p><strong>Pricing:</strong> {plan.pricing}</p>
                                        <ul style={{ paddingLeft: '18px', marginBottom: 0 }}>
                                            {plan.features.map((feature) => (
                                                <li key={feature} style={{ marginBottom: '6px' }}>{feature}</li>
                                            ))}
                                        </ul>
                                        <div style={{ marginTop: '14px' }}>
                                            <Button
                                                type={plan.id === activePlan.id ? 'default' : 'primary'}
                                                block
                                                disabled={plan.id === activePlan.id}
                                                onClick={() => handlePlanChange(plan.id)}
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
