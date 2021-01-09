import React, { useContext } from 'react';
import StickyBox from "react-sticky-box";
import DoctorSidebar from '../sidebar';
import {Link} from 'react-router-dom';
import { IMG01 } from './img';
import { EmployerContext } from "../../../context/employer";
import moment from "moment";

function EmployeeProfile () {

  // context values
  const {myEmployeeProfile, loading} = useContext(EmployerContext);
  const {id, photo, name, category: {...category}, country_id, email, mobile, pref, educations, works, languages, skills, success_story} = myEmployeeProfile;
  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/doctor/appointments">Jobs</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Single Job</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Single Job</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DoctorSidebar />
              </StickyBox>
            </div>
            
            <div className="col-md-7 col-lg-8 col-xl-9">

              {/* start */}
              <div className="card">
                <div className="card-body">
                  <div className="doctor-widget">
                    <div className="doc-info-left">
                      <div className="doctor-img">
                        <img src={photoUrl} className="img-fluid" alt="User" />
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">{name}</h4>
                        <p className="doc-speciality">{category.name}</p>
                        <div className="clinic-details">
                          <ul>
                            <li className="doc-location d-block mb-2"><i className="fas fa-map-marker-alt"></i> {country_id}</li>
                            <li className="doc-location d-block mb-2"><i className="far fa-envelope"></i> {email}</li>
                            <li className="doc-location d-block mb-2"><i className="fas fa-mobile-alt"></i> {mobile}</li>
                        </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}

              {/* start */}
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-9">

                      <div className="widget about-widget">
                        <h4 className="widget-title">About Me</h4>
                        <p>{pref}</p>
                      </div>

                      <div className="widget education-widget">
                        <h4 className="widget-title">Education</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {
                              educations && educations.map(item=>{
                                return(
                                  <li key={item.id}>
                                    <div className="experience-user">
                                      <div className="before-circle"></div>
                                    </div>
                                    <div className="experience-content">
                                      <div className="timeline-content">
                                        <h4 className="name exp-year">{item.title}</h4>
                                        <div>{item.specialization}</div>
                                        <span className="time">{`${item.from_date} - ${item.to_date}`}</span>
                                      </div>
                                    </div>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>

                      <div className="widget experience-widget">
                        <h4 className="widget-title">Work & Experience</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {
                              works && works.map(item=>{
                                return(
                                  <li key={item.id}>
                                    <div className="experience-user">
                                      <div className="before-circle"></div>
                                    </div>
                                    <div className="experience-content">
                                      <div className="timeline-content">
                                        <h4 className="name exp-year">{item.title}</h4>
                                        <div>{item.organization}</div>
                                        <span className="time">{`${item.from_date} - ${item.to_date}`}</span>
                                      </div>
                                    </div>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>

                      <div className="service-list">
                        <h4>Languages</h4>
                        <ul className="clearfix">
                          {
                              languages && languages.map(item=>{
                                return(
                                  <li key={item.id}>
                                    {`${item.name} (${item.level})`}
                                  </li>
                                )
                              })
                            }
                        </ul>
                      </div>

                      <div className="service-list">
                        <h4>Skills</h4>
                        <ul className="clearfix">
                          {
                              skills && skills.map(item=>{
                                return(
                                  <li key={item.id}>
                                    {item.name}
                                  </li>
                                )
                              })
                            }
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {/* end */}
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeProfile;