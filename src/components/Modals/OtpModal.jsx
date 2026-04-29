const OtpModal = () => {
    const handleOtpInput = (e, index) => {
        const input = e.target;
        if (input.value.length === 1) {
            const next = input.nextElementSibling;
            if (next) next.focus();
        }
    };

    const handleOtpKeyDown = (e) => {
        if (e.key === "Backspace" && e.target.value === "") {
            const prev = e.target.previousElementSibling;
            if (prev) prev.focus();
        }
    };

    return (
        <>
            {/* <!-- popup OTP verification --> */}
            <div className="modal modal-account fade" id="modalOtp" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="flat-account">
                            <div className="banner-account">
                                <img src="https://homelengo.vercel.app/images/banner/banner-account1.jpg" alt="banner" />
                            </div>
                            <form className="form-account d-flex align-items-center justify-content-between flex-column">
                                <div className="title-box w-100">
                                    <h4>Verify OTP</h4>
                                    <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                </div>
                                <div className="box w-100">
                                    <p className="caption-2 mb-3" style={{ color: "#A3ABB0" }}>
                                        We've sent a 4-digit verification code to your email. Please enter it below.
                                    </p>
                                    <div
                                        className="d-flex justify-content-center gap-3 mb-4"
                                        style={{ padding: "10px 0" }}
                                    >
                                        {[0, 1, 2, 3].map((i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                maxLength="1"
                                                className="form-control text-center"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    fontSize: "24px",
                                                    fontWeight: "600",
                                                    borderRadius: "10px",
                                                }}
                                                onInput={(e) => handleOtpInput(e, i)}
                                                onKeyDown={handleOtpKeyDown}
                                            />
                                        ))}
                                    </div>
                                    <button type="submit" className="tf-btn primary w-100">Verify</button>
                                    <div className="text text-center mt-3" style={{ color: "#A3ABB0" }}>
                                        Didn't receive the code?{" "}
                                        <a href="#" className="text-primary" onClick={(e) => e.preventDefault()}>
                                            Resend
                                        </a>
                                    </div>
                                </div>
                                <div className="box box-btn w-100">
                                    <div className="text text-center">
                                        Back to{" "}
                                        <a
                                            href="#modalForgotPassword"
                                            data-bs-toggle="modal"
                                            data-bs-dismiss="modal"
                                            className="text-primary"
                                        >
                                            Forgot Password
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtpModal;
