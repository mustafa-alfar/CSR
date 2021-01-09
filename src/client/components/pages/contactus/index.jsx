import React from 'react';
import { Link } from 'react-router-dom';
const ContactUs = () => {
    return(
           <>
			<div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">Contact Us</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Contact Us</h2>
						</div>
					</div>
				</div>
			</div>
		
			<div className="content">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3>Contact Us</h3>
						</div>
					</div>
				</div>
			</div>		
		</>
    );
}

export default ContactUs;