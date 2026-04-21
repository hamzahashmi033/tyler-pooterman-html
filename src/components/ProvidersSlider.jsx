import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const testimonials = [
    {
        name: "Courtney Henry",
        role: "Homeowner · New York, NY",
        image: "https://homelengo.vercel.app/images/avatar/avt-png1.png",
        text: `"I claimed my property profile in minutes and uploaded 3 years of service records. When I listed my home for sale, buyers could see the full history — the HVAC, roof, and electrical work — all verified. It genuinely helped me close $15K above asking."`,
    },
    {
        name: "Esther Howard",
        role: "Home Buyer · Austin, TX",
        image: "https://homelengo.vercel.app/images/avatar/avt-png2.png",
        text: `"Before making an offer I unlocked the property report for $30. It showed a roof that was 18 years old with no recent inspection — the seller hadn't disclosed it. That $30 saved me from a $12,000 surprise repair. Best money I've ever spent."`,
    },
    {
        name: "Annette Black",
        role: "Real Estate Agent · Miami, FL",
        image: "https://homelengo.vercel.app/images/avatar/avt-png4.png",
        text: `"As an agent I pull property reports for every listing I show. My clients walk into viewings already knowing the Health Score, the service history, and any red flags. It cuts due diligence time in half and my buyers feel confident making offers faster."`,
    },
    {
        name: "Marcus Webb",
        role: "HVAC Service Provider · Denver, CO",
        image: "https://homelengo.vercel.app/images/avatar/avt-png6.png",
        text: `"I've been doing HVAC work for 11 years with no way to prove my track record online. Since joining the provider dashboard, every job I complete gets attached to the property record. New clients find me through the platform — my bookings are up 40% this quarter."`,
    },
    {
        name: "Sandra Torres",
        role: "Property Manager · Chicago, IL",
        image: "https://homelengo.vercel.app/images/avatar/avt-png3.png",
        text: `"We manage 47 rental properties and tracking service history used to be a spreadsheet nightmare. Now every maintenance event is logged by the provider, attached to the property, and visible in one dashboard. Our tenants love the transparency too."`,
    },
    {
        name: "James Holloway",
        role: "First-Time Buyer · Phoenix, AZ",
        image: "https://homelengo.vercel.app/images/avatar/avt-png5.png",
        text: `"I was skeptical at first — paying $30 for a report felt steep. But the report showed the property had a Health Score of 61 with three overdue inspections flagged. We walked away. Two weeks later, we found a property with a score of 94 and bought it with total confidence."`,
    },
];

const ProvidersSlider = () => {
    const sliderRef = useRef(null);
    const trackRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".testimonial-card");
            const totalCards = cards.length;
            const cardWidth = cards[0]?.offsetWidth || 400;
            const gap = 30;
            const totalWidth = (cardWidth + gap) * (totalCards / 2);

            gsap.set(trackRef.current, { x: 0 });

            animationRef.current = gsap.to(trackRef.current, {
                x: `-=${totalWidth}`,
                duration: 50,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => {
                        const normalized = parseFloat(x) % totalWidth;
                        return normalized;
                    })
                }
            });

            const draggableInstance = Draggable.create(trackRef.current, {
                type: "x",
                throwProps: true,
                bounds: {
                    minX: -totalWidth,
                    maxX: 0
                },
                onDragStart() {
                    animationRef.current.pause();
                },
                onDragEnd() {
                    animationRef.current.play();
                },
                onThrowComplete() {
                    animationRef.current.play();
                }
            })[0];

            sliderRef.current.addEventListener("mouseenter", () => animationRef.current.pause());
            sliderRef.current.addEventListener("mouseleave", () => animationRef.current.play());

        }, sliderRef);

        return () => ctx.revert();
    }, []);

    const loopedItems = [...testimonials, ...testimonials, ...testimonials];

    return (
        <>
            <style>
                {`
                .testimonial-slider {
                    overflow: hidden;
                    width: 100%;
                    cursor: grab;
                    padding: 40px 0;
                    position: relative;
                }
                .testimonial-slider:active { cursor: grabbing; }
                .testimonial-track {
                    display: flex;
                    width: max-content;
                    will-change: transform;
                }
                .testimonial-card {
                    width: 400px;
                    padding: 0 15px;
                    flex-shrink: 0;
                }
                `}
            </style>

            <section className="flat-section bg-primary-new flat-testimonial">
                <div className="box-title px-15" data-animate="up">
                    <div className="text-center wow fadeInUp">
                        <div className="text-subtitle text-primary">Real User Reviews</div>
                        <h3 className="title mt-4">Trusted by Owners, Buyers & Providers</h3>
                        <p className="desc text-variant-1">From first-time buyers to seasoned service providers — see how verified property history is changing the way people buy, sell, and service homes.</p>
                    </div>
                </div>

                <div ref={sliderRef} className="testimonial-slider">
                    <div ref={trackRef} className="testimonial-track">
                        {loopedItems.map((item, index) => (
                            <div className="testimonial-card" key={index}>
                                <div className="box-tes-item">
                                    <span className="icon icon-quote"></span>
                                    <p className="note body-2 mb-3">{item.text}</p>
                                    <div className="box-avt d-flex align-items-center gap-12 mt-4">
                                        <div className="avatar avt-60 round">
                                            <img src={item.image} alt={item.name} style={{ width: 60, borderRadius: '50%' }} />
                                        </div>
                                        <div className="info">
                                            <h6>{item.name}</h6>
                                            <p className="caption-2 text-variant-1">{item.role}</p>
                                            <ul className="list-star mt-1">
                                                <li className="icon icon-star"></li>
                                                <li className="icon icon-star"></li>
                                                <li className="icon icon-star"></li>
                                                <li className="icon icon-star"></li>
                                                <li className="icon icon-star"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProvidersSlider;