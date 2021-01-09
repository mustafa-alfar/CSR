import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/footer-logo.png';
const Footer = (props) => {
 	const exclusionArray = [
		'/pages/doctor-grid',
		'/pages/doctor-list',
		'/pages/video-call',
		'/pages/voice-call',
		'/pages/chat-doctor',
		'/patient/doctor-list',
		'/patient/doctor-grid'
	]
	if (exclusionArray.indexOf(props.location.pathname) >= 0) {
		return '';
	}
	return (
			
			
				<footer className="footer">
				
				
				<div className="footer-top">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-3 col-md-6">
							
							
								<div className="footer-widget footer-about">
									<div className="footer-logo">
										<img src={logo} alt="logo" />
									</div>
									<div className="footer-about-content">
										<p>We work closely with the best employers in the healthcare sector and know the most exciting jobs. so you can find the job that suits you perfectly in record time.</p>
									</div>
								</div>
							
								
							</div>
							
							<div className="col-lg-3 col-md-6">
							
								
								<div className="footer-widget footer-menu">
									<h2 className="footer-title">Jobs</h2>
									<ul>
										<li><Link to="/jobs">Search for Job</Link></li>
										<li><Link to="/jobs">Recent Jobs</Link></li>
										<li><Link to="/jobs">Categories Jobs</Link></li>
									</ul>
								</div>
							
								
							</div>
							
							<div className="col-lg-3 col-md-6">
							
								
								<div className="footer-widget footer-menu">
									<h2 className="footer-title">Pages</h2>
									<ul>
										<li><Link to="/login">Login</Link></li>
										<li><Link to="/register">Register</Link></li>
										<li><Link to="/about-us">About Us</Link></li>
										<li><Link to="/services">services</Link></li>
									</ul>
								</div>
							
								
							</div>
							
							<div className="col-lg-3 col-md-6">
							
							
								<div className="footer-widget footer-contact">
									<h2 className="footer-title">Contact Us</h2>
									<div className="footer-contact-info">
										<div className="footer-address">
											<span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
											<p>Germany</p>
										</div>
										<p>
										<i className="fa fa-phone" aria-hidden="true"></i>
											+0 000 000 0000
										</p>
										<p className="mb-0">
											<i className="fa fa-envelope" aria-hidden="true"></i>
											info@crs-consulting.com
										</p>
									</div>
								</div>
								
								
							</div>
							
						</div>
					</div>
				</div>
			
				
			
                <div className="footer-bottom">
					<div className="container-fluid">
					
					
						<div className="copyright">
							<div className="row">
								<div className="col-md-6 col-lg-6">
									<div className="copyright-text">
										<p className="mb-0">&copy; 2020 CRS. All rights reserved.</p>
									</div>
								</div>
								<div className="col-md-6 col-lg-6">
								
								
									<div className="copyright-menu">
										<ul className="policy-menu">
											<li><Link to="/terms">Terms and Conditions</Link></li>
											<li><Link to="/privacy-policy">Policy</Link></li>
										</ul>
									</div>
								
									
								</div>
							</div>
						</div>
					
						
					</div>
				</div>
			
				
			</footer>
			
		
			
	);
};

export default Footer;