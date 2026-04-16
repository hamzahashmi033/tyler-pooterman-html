import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper/modules";

const WhoItsFor = () => {
    const teamMembers = [
        {
            name: "Aman Jain",
            role: "Product manager",
            color: "#8eb7f8ff",
            image: "./images/home/bohemian-man.png"
        },
        {
            name: "Tarun Gola",
            role: "Back-end developer",
            color: "#b8b9bbff",
            image: "./images/home/brunette-man.png"
        },
        {
            name: "Aman Jain",
            role: "Product manager",
            color: "#8eb7f8ff",
            image: "./images/home/bohemian-man.png"
        },
        {
            name: "Tarun Gola",
            role: "Back-end developer",
            color: "#b8b9bbff",
            image: "./images/home/brunette-man.png"
        }
    ];

    return (
        <>
            <style>
                {`
                .profile-card {
                    height: 450px;
                    border-radius: 30px;
                    padding: 30px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    color: white;
                }
                .profile-card h4 {
                    font-weight: 700;
                    margin-bottom: 5px;
                    font-size: 1.5rem;
                }
                .profile-card p {
                    font-weight: 400;
                    opacity: 0.9;
                }
                .profile-img-wrapper {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    text-align: center;
                }
                .profile-img-wrapper img {
                    width: 90%;
                    display: block;
                    margin: 0 -60px 0 auto;
                }
                /* Swiper slide gap */
                .swiper-slide {
                    padding: 10px;
                }
                `}
            </style>

            <section className="who-its-for-main">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 box-title">
                            <h3 className="title mb-3" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                Who It’s For
                            </h3>
                            <p className="mb-3 fs-5" style={{ lineHeight: "1.5", color: "#555" }}>
                                Designed for every stakeholder involved in property management, service, and transactions.
                            </p>
                        </div>
                        <div className="col-md-7">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                autoplay={{
                                    delay: 2500, // 2.5 sec baad slide change
                                    disableOnInteraction: false,
                                }}
                                slidesPerView={2.3}
                                breakpoints={{
                                    320: { slidesPerView: 1.5 },
                                    768: { slidesPerView: 2.3 }
                                }}
                            >
                                {teamMembers.map((member, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="profile-card" style={{ backgroundColor: member.color }}>
                                            <h4>{member.name}</h4>
                                            <p>{member.role}</p>
                                            <div className="profile-img-wrapper">
                                                <img src={member.image} alt={member.name} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhoItsFor;