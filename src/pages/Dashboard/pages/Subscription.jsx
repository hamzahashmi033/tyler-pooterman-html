import { Card, Col, Progress, Row, Table, Tag } from 'antd';
import Dashboard from '../Dashboard';

const currentSubscription = {
    planName: 'Professional Monthly',
    planType: 'Monthly',
    billingCycle: 'Monthly',
    price: '$79 / month',
    includedReports: 40,
    submittedReports: 28,
    extraReportCost: '$4 / report',
    nextBillingDate: '2026-05-20'
};

const additionalCostData = [
    { id: 1, item: 'Extra Report Entry', unitCost: '$4.00', quantity: 3, amount: '$12.00' },
    { id: 2, item: 'Image Storage Add-on', unitCost: '$8.00', quantity: 1, amount: '$8.00' }
];

const subscriptionColumns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Unit Cost', dataIndex: 'unitCost', key: 'unitCost' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' }
];

const Subscription = () => {
    const reportUsagePercent = Math.min(
        Math.round((currentSubscription.submittedReports / currentSubscription.includedReports) * 100),
        100
    );

    return (
        <Dashboard pageTitle="Subscription">
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card title="Current Plan" bordered={false} style={{ height: '100%' }}>
                                <p><strong>Plan:</strong> {currentSubscription.planName}</p>
                                <p>
                                    <strong>Type:</strong>{' '}
                                    <Tag color={currentSubscription.planType === 'Monthly' ? 'green' : 'blue'}>
                                        {currentSubscription.planType}
                                    </Tag>
                                </p>
                                <p><strong>Billing Cycle:</strong> {currentSubscription.billingCycle}</p>
                                <p><strong>Price:</strong> {currentSubscription.price}</p>
                                <p><strong>Next Billing Date:</strong> {currentSubscription.nextBillingDate}</p>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card title="Reports Included & Usage" bordered={false}>
                                <p><strong>Reports Included:</strong> {currentSubscription.includedReports}</p>
                                <p><strong>Submitted Reports:</strong> {currentSubscription.submittedReports}</p>
                                <p><strong>Remaining Reports:</strong> {currentSubscription.includedReports - currentSubscription.submittedReports}</p>
                                <Progress percent={reportUsagePercent} status={reportUsagePercent >= 90 ? 'exception' : 'active'} />
                                <p style={{ marginTop: '12px', marginBottom: 0 }}>
                                    <strong>Additional Cost:</strong> {currentSubscription.extraReportCost}
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
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Subscription;
