import React from 'react';
import IMG_01 from "../../../assets/images/employee.jpg";
import IMG_02 from "../../../assets/images/employers.jpg";
import { Link } from 'react-router-dom';
const Services = () => {
  return(
    <>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Services</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Services</h2>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              
              <div className="card">
                <div className="card-header">
                  <div className="blog-image">
                    <img src={IMG_01} className="img-fluid" alt="User" />
                  </div>
                  <h4 className="widget-title mb-0">Employee:</h4>
                </div>
                <div className="card-body">
                  <div className="widget education-widget">
                    <h4 className="widget-title">Find your dream job in nursing!</h4>
                    <p>We bring caregivers together with certified care facilities, hospitals and leasing companies free of charge and discreetly.</p>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <h4 className="name exp-year">Top employer</h4>
                              <div>We only work with employers who offer their employees good working conditions.</div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <h4 className="name exp-year">Professional and confidential</h4>
                              <div>We work professionally and always treat your request confidentially.</div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <h4 className="name exp-year">Free for employee</h4>
                              <div>Our service is completely free for Employee!</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="widget experience-widget">
                    <h4 className="widget-title">Three steps to your dream job</h4>
                    <p>At C.R.S you get job offers from certified care institutions in the field of care & medicine. Registration is free and only takes 3 minutes.</p>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <h4 className="name exp-year">Register for free</h4>
                              <div>Register for free. Registration will be treated confidentially and only takes 3 minutes, complete your profile</div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <h4 className="name exp-year">Get job offers</h4>
                              <div>At C.R.S you will find lot of job offers from certified care institutions in the nursing and medicine. You can apply for the suitable job. </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <h4 className="name exp-year">Job Interview</h4>
                              <div>You will get to know the companies personally in the job interview. We accompany you during the entire application process.</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              </div>
              <div className="col-md-6">

                <div className="card">
                  <div className="card-header">
                     <div className="blog-image">
                      <img src={IMG_02} className="img-fluid" alt="User" />
                    </div>
                    <h4 className="widget-title mb-0">Employer:</h4></div>
                  <div className="card-body">
                    <div className="widget education-widget">
                      <p>The new way to find nursing staff<br />C.R.S is the digital personnel consultancy for care facilities, hospitals and other facilities.</p>
                    </div>
                    <div className="widget education-widget">
                      <h4 className="widget-title">Our focus: nursing staff</h4>
                      <p>We have specialized in the placement of nursing staff, We refer our candidates to hospitals, nursing homes, outpatient care services, and other care facilities (hospices, rehabilitation facilities, etc.).</p>
                    </div>

                    <div className="widget education-widget">
                      <h4 className="widget-title">Three steps to your dream job</h4>
                      <p>At C.R.S you get job offers from certified care institutions in the field of care & medicine. Registration is free and only takes 3 minutes.</p>
                    </div>
                    <div className="widget experience-widget">
                      <h4 className="widget-title">Become a partner:</h4>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <div>Did our offer make you curious? We would be happy to provide you with information on the details of a collaboration in an initial information meeting.</div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <div>In an initial information meeting, we will inform you about the details of a collaboration and our range of services.</div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <div>Register as an employer and post your job offers.</div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <div>You will quickly receive the first profiles and can contact the candidates directly.</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

            </div>

          </div>
        </div>
      </div>		
    </>
  );
}

export default Services;