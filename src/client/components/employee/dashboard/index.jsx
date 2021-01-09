import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardSidebar from '../sidebar/sidebar.jsx';
import StickyBox from "react-sticky-box";
import { Modal, Figure } from 'react-bootstrap';
import IMG01 from "../../../assets/images/patient.jpg"
// context
import { EmployeeContext } from "../../../context/employee";
import DatePicker from "react-datepicker";
import moment from "moment";
import Loading from "../../loading/pageloading";

function Profile () {

  const {getProfile, profile, loading} = useContext(EmployeeContext);
  const {employeeInfo} = profile;
  const {category: {...category}, country_id, email, mobile, photo, name, birthDate, address, city, state, zipCode, pref, educations, works, languages, skills} = employeeInfo;
  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;

  useEffect( () => {
    getProfile();
  }, [])

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/home">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Profile</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profile</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                < DashboardSidebar />
              </StickyBox>
            </div>

            <div className="col-md-7 col-lg-8 col-xl-9">
              {loading? <Loading loading={loading} /> :
                <>
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
                            <ul className="entry-meta meta-item">
                              <li><i className="fas fa-map-marker-alt"></i> {country_id}</li>
                              <li><i className="far fa-envelope"></i> {email}</li>
                              <li><i className="fas fa-mobile-alt"></i> {mobile}</li>
                            </ul>
                          </div>
                        </div>
                        <div className="doc-info-right">
                          <div className="clini-infos">
                            <ul>
                              <li>
                                {/* <i className="far fa-thumbs-up"></i> */}
                                Pending Proposals (5)
                              </li>
                              <li>
                                {/* <i className="far fa-comment"></i> */}
                                Accepted Proposals (6)
                              </li>
                              <li>
                                {/* <i className="fas fa-map-marker-alt"></i> */}
                                Selected Proposals (7)
                              </li>
                              <li>
                                {/* <i className="far fa-money-bill-alt"></i>  */}
                                Rejected Proposals (8)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              
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
                </>
              }

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;