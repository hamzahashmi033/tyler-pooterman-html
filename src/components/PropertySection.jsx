import {
    FaExclamationTriangle,
    FaCheckCircle
} from 'react-icons/fa';

const PropertySection = () => {
    return (
        <>
            <style>
                {`
                .property-history-section {
                    padding: 80px 0;
                }
                .info-card {
                    background: #fff;
                    border-radius: 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    margin-bottom: 25px;
                    position: relative;
                    overflow: hidden;
                }

                .card-number {
                    color: white;
                    font-weight: bold;
                    font-size: 1.5rem;
                    padding: 15px 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
                    margin-right: 20px;
                }

                .card-1 .card-number { background: linear-gradient(90deg, #1563df, #1563df); }
                .card-2 .card-number { background: linear-gradient(90deg, #1563df, #1563df); }
                .card-3 .card-number { background: linear-gradient(90deg, #1563df, #1563df); }

                .card-content {
                    padding: 15px 20px;
                }

                .card-content h5 {
                font-Size: 20px;
                    margin-bottom: 5px;
                    font-weight: 700;
                }
                @media (max-width: 768px) {
                    .info-card { flex-direction: column; align-items: flex-start; }
                    .card-number { width: 100%; clip-path: none; margin-bottom: 10px; }
                }
                `}
            </style>

            <section className="property-history-section">
                <div className="container">

                    {/* TOP ROW: PROBLEM vs SOLUTION */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="">
                                <div className="d-flex align-items-center mb-3">
                                    <h3 className="mb-0">Problem</h3>
                                </div>
                                <p className="lead fw-bold mb-3" style={{ color: "#1563df", fontSize: "17px" }}>Property service history is fragmented and unreliable.</p>
                                <ul className="text-muted ps-3" style={{ listStyleType: "disc", listStyle: "circle" }}>
                                    <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Scattered service records</li>
                                    <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>No verified property history</li>
                                    <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Difficult for buyers to trust data</li>
                                    <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Manual and inconsistent documentation</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <h3 className="mb-0">Solution</h3>
                            </div>
                            <p className="lead fw-bold mb-3" style={{ color: "#1563df", fontSize: "17px" }}>A centralized and verified property history platform.</p>
                            <ul className="text-muted ps-3">
                                <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Property-based structured data</li>
                                <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Verified service timeline</li>
                                <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Secure and privacy-first system</li>
                                <li style={{ listStyleType: "disc", listStyle: "circle", fontSize: "15px", marginBottom: "10px" }}>Easy access for buyers and agents</li>
                            </ul>
                            {/* PROCESS CARDS */}
                            <div className="row justify-content-center mt-5">
                                <div className="col-lg-12">
                                    {/* Card 1 */}
                                    <div className="info-card card-1">
                                        <div className="card-number">01</div>
                                        <div className="card-content d-flex align-items-center">
                                            <div>
                                                <h5>Log Service Records</h5>
                                                <p className="text-muted mb-0">Securely upload and digitize your property documents.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="info-card card-2">
                                        <div className="card-number">02</div>
                                        <div className="card-content d-flex align-items-center">
                                            <div>
                                                <h5>Build Property Timeline</h5>
                                                <p className="text-muted mb-0">Create a chronological flow of every maintenance event.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="info-card card-3">
                                        <div className="card-number">03</div>
                                        <div className="card-content d-flex align-items-center">
                                            <div>
                                                <h5>Access Verified Reports</h5>
                                                <p className="text-muted mb-0">Generate professional analytics and data reports.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>
    );
};

export default PropertySection;