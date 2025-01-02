import React from 'react'
import about_1 from '../assets/img/about-1.jpg'
import carousel_3 from '../assets/img/carousel-3.jpg'
import feature from '../assets/img/feature.jpg'
import team_1 from '../assets/img/team-1.jpg'
import team_2 from '../assets/img/team-2.jpg'
import team_3 from '../assets/img/team-3.jpg'
import team_4 from '../assets/img/team-4.jpg'
import testimonial_1 from '../assets/img/testimonial-1.jpg'
import testimonial_2 from '../assets/img/testimonial-2.jpg'
import testimonial_3 from '../assets/img/testimonial-3.jpg'

const HomePage = () => {
    return (
        <div>
            {/* <!-- Topbar Start --> */}
            <div className="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-7 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-map-marker-alt text-primary me-2"></small>
                            <small>123 Street, New York, USA</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center py-3">
                            <small className="far fa-clock text-primary me-2"></small>
                            <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                        </div>
                    </div>
                    <div className="col-lg-5 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-phone-alt text-primary me-2"></small>
                            <small>+012 345 6789</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href=""><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-0" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}

            {/* <!-- Header Start --> */}
            <div className="container-fluid header bg-primary p-0 mb-5">
                <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
                    <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
                        <h1 className="display-4 text-white mb-5">Your Trusted Healthcare Partner Book Appointments with Ease</h1>
                        <div className="row g-4">
                            <div className="col-sm-4">
                                <div className="border-start border-light ps-4">
                                    <h2 className="text-white mb-1" data-toggle="counter-up">123</h2>
                                    <p className="text-light mb-0">Expert Doctors</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="border-start border-light ps-4">
                                    <h2 className="text-white mb-1" data-toggle="counter-up">1234</h2>
                                    <p className="text-light mb-0">Medical Stuff</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="border-start border-light ps-4">
                                    <h2 className="text-white mb-1" data-toggle="counter-up">12345</h2>
                                    <p className="text-light mb-0">Total Patients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <div className="owl-carousel header-carousel">
                            <div className="owl-carousel-item position-relative">
                                <img className="img-fluid" src={carousel_3} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Header End */}

            {/* <!-- About Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex flex-column">
                                <img className="img-fluid rounded w-75 align-self-end" src={about_1} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">About Us</p>
                            <h1 className="mb-4">Why You Should Trust Us? Get Know About Us!</h1>
                            <p>We are dedicated to connecting patients with trusted doctors seamlessly and efficiently. Our platform prioritizes your health and convenience by ensuring verified doctor profiles,</p>
                            <p className="mb-4">secure bookings, and a commitment to excellent care. Trust us to make healthcare simple and accessible for you.</p>
                            <p><i className="far fa-check-circle text-primary me-3"></i>Quality health care</p>
                            <p><i className="far fa-check-circle text-primary me-3"></i>Only Qualified Doctors</p>
                            <p><i className="far fa-check-circle text-primary me-3"></i>Medical Research Professionals</p>
                            <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}

            {/* <!-- Service Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Services</p>
                        <h1>Health Care Solutions</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                    <i className="fa fa-heartbeat text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Cardiology</h4>
                                <p className="mb-4">Expert care for heart and cardiovascular conditions, ensuring your heart health is in excellent hands.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                    <i className="fa fa-x-ray text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Pulmonary</h4>
                                <p className="mb-4">Comprehensive care for lung and respiratory conditions, helping you breathe easier and live healthier.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                    <i className="fa fa-brain text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Neurology</h4>
                                <p className="mb-4">Advanced treatment for nervous system disorders to restore health and improve quality of life.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                    <i className="fa fa-wheelchair text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Orthopedics</h4>
                                <p className="mb-4">Specialized care for bones, joints, and muscles to help you regain mobility and strength.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                    <i className="fa fa-tooth text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Dental Surgery</h4>
                                <p className="mb-4">Quality dental procedures to enhance oral health, treat dental issues, and improve smiles.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                                    <i className="fa fa-vials text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Laboratory</h4>
                                <p className="mb-4">Accurate diagnostic testing for fast and reliable health insights, essential for effective treatment.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <!-- Service End --> */}


            {/* <!-- Feature Start --> */}
            <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
                <div className="container feature px-lg-0">
                    <div className="row g-0 mx-lg-0">
                        <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="p-lg-5 ps-lg-0">
                                <p className="d-inline-block border rounded-pill text-light py-1 px-4">Features</p>
                                <h1 className="text-white mb-4">Why Choose Us</h1>
                                <p className="text-white mb-4 pb-2">We are dedicated to connecting patients with trusted doctors seamlessly and efficiently. Our platform prioritizes your health and convenience by ensuring verified doctor profiles</p>
                                <div className="row g-4">
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                                                <i className="fa fa-user-md text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Experience</p>
                                                <h5 className="text-white mb-0">Doctors</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                                                <i className="fa fa-check text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Quality</p>
                                                <h5 className="text-white mb-0">Services</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                                                <i className="fa fa-comment-medical text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Positive</p>
                                                <h5 className="text-white mb-0">Consultation</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                                                <i className="fa fa-headphones text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">24 Hours</p>
                                                <h5 className="text-white mb-0">Support</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{ minBlockSize: '400px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute img-fluid w-100 h-100" src={feature} style={{ objectFit: 'cover' }} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Feature End --> */}


            {/* <!-- Team Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
                        <h1>Our Experienced Doctors</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src={team_1} alt="" />
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Dr. Olivia Bennett</h5>
                                    <p className="text-primary">Cardiology</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src={team_2} alt="" />
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Dr. Ethan Clark</h5>
                                    <p className="text-primary">Orthopedics</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src={team_3} alt="" />
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Dr. Amelia Martinez</h5>
                                    <p className="text-primary">Neurology</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src={team_4} alt="" />
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Dr. Michael Nguyen</h5>
                                    <p className="text-primary">Pulmonary</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Team End --> */}


            {/* <!-- Appointment Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
                            <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
                            <p className="mb-4">Schedule your visit with ease and get the care you deserve. Our doctors are here for you.</p>
                            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }}>
                                    <i className="fa fa-phone-alt text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Call Us Now</p>
                                    <h5 className="mb-0">+012 345 6789</h5>
                                </div>
                            </div>
                            <div className="bg-light rounded d-flex align-items-center p-5">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }}>
                                    <i className="fa fa-envelope-open text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Mail Us Now</p>
                                    <h5 className="mb-0">info@healthcheck.com</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input type="text" className="form-control border-0" placeholder="Your Name" style={{ height: '55px' }} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="email" className="form-control border-0" placeholder="Your Email" style={{ height: '55px' }} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input type="text" className="form-control border-0" placeholder="Your Mobile" style={{ height: '55px' }} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select className="form-select border-0" style={{ height: '55px' }}>
                                                <option defaultValue>Choose Doctor</option>
                                                <option value="1">Doctor 1</option>
                                                <option value="2">Doctor 2</option>
                                                <option value="3">Doctor 3</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="date" id="date" data-target-input="nearest">
                                                <input type="text"
                                                    className="form-control border-0 datetimepicker-input"
                                                    placeholder="Choose Date" data-target="#date" data-toggle="datetimepicker" style={{ height: '55px' }} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="time" id="time" data-target-input="nearest">
                                                <input type="text"
                                                    className="form-control border-0 datetimepicker-input"
                                                    placeholder="Choose Date" data-target="#time" data-toggle="datetimepicker" style={{ height: '55px' }} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <textarea className="form-control border-0" rows="5" placeholder="Describe your problem"></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Book Appointment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Appointment End --> */}


            {/* <!-- Testimonial Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Testimonial</p>
                        <h1>What Our Patients Say!</h1>
                    </div>
                    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={testimonial_1} style={{ width: '100px', height: '100px' }} />
                            <div className="testimonial-text rounded text-center p-4">
                                <p>"Booking my appointment was quick and easy. The doctor was attentive and helped me feel at ease. I couldn't have asked for a better experience."</p>
                                <h5 className="mb-1">Maria Johnson</h5>
                                <span className="fst-italic">Uk</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={testimonial_2} style={{ width: '100px', height: '100px' }} />
                            <div className="testimonial-text rounded text-center p-4">
                                <p>"The platform connected me with the right specialist for my needs. The process was seamless, and I received excellent care. Highly recommended!"</p>
                                <h5 className="mb-1">David Smith</h5>
                                <span className="fst-italic">Ny, Us</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src={testimonial_3} style={{ width: '100px', height: '100px' }} />
                            <div className="testimonial-text rounded text-center p-4">
                                <p>"I was able to find a doctor in minutes and get an appointment that suited my busy schedule. The care I received was top-notch!"</p>
                                <h5 className="mb-1">Emily Carter</h5>
                                <span className="fst-italic">CA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Testimonial End --> */}


            {/* <!-- Footer Start --> */}
            <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Address</h5>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Services</h5>
                            <a className="btn btn-link" href="">Cardiology</a>
                            <a className="btn btn-link" href="">Pulmonary</a>
                            <a className="btn btn-link" href="">Neurology</a>
                            <a className="btn btn-link" href="">Orthopedics</a>
                            <a className="btn btn-link" href="">Laboratory</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Quick Links</h5>
                            <a className="btn btn-link" href="">About Us</a>
                            <a className="btn btn-link" href="">Contact Us</a>
                            <a className="btn btn-link" href="">Our Services</a>
                            <a className="btn btn-link" href="">Terms & Condition</a>
                            <a className="btn btn-link" href="">Support</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Newsletter</h5>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                                <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a className="border-bottom" href="https://github.com/fredcodee">@fredcode</a>, All Right Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}
        </div>
    )
}

export default HomePage