const ForgetModal = () => {
    return (
        <>
            {/* <!-- popup forgot password --> */}
            <div className="modal modal-account fade" id="modalForgotPassword" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="flat-account">
                            <div className="banner-account">
                                <img src="https://homelengo.vercel.app/images/banner/banner-account1.jpg" alt="banner" />
                            </div>
                            <form className="form-account d-flex align-items-center justify-content-between flex-column">
                                <div className="title-box w-100">
                                    <h4>Forgot Password</h4>
                                    <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                </div>
                                <div className="box w-100">
                                    <p className="caption-2 mb-3" style={{ color: "#A3ABB0" }}>
                                        Enter your email address and we'll send you a link to reset your password.
                                    </p>
                                    <fieldset className="box-fieldset">
                                        <label>Email Address</label>
                                        <div className="ip-field">
                                            <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.375 3.375H14.625C15.4534 3.375 16.125 4.04657 16.125 4.875V13.125C16.125 13.9534 15.4534 14.625 14.625 14.625H3.375C2.54657 14.625 1.875 13.9534 1.875 13.125V4.875C1.875 4.04657 2.54657 3.375 3.375 3.375Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.125 4.875L9 9.75L1.875 4.875" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input type="email" className="form-control" placeholder="Your email address" />
                                        </div>
                                    </fieldset>
                                    <button type="submit" className="tf-btn primary w-100">Send Reset Link</button>
                                </div>
                                <div className="box box-btn w-100">
                                    <div className="text text-center">
                                        Remember your password?{" "}
                                        <a
                                            href="#modalLogin"
                                            data-bs-toggle="modal"
                                            data-bs-dismiss="modal"
                                            className="text-primary"
                                        >
                                            Back to Login
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

export default ForgetModal;
