import React, {useContext, useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//icon
import { faHospital, faNewspaper, faHandshake } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/images/logo.png";
import IMG01 from "../assets/images/doctor-thumb-02.jpg";
import Dropdown from "react-bootstrap/Dropdown";
// context
import {UserContext} from "../context/user";

const Header = (props) => {

  const url = window.location.pathname.split("/").slice(0, -1).join("/");

  const {user, userLogout} = useContext(UserContext);
  let {token, type, name, photo} = user;
  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
  let userType, dashboardUrl, profileSettingurl;

  if(type === "2"){
    userType = "Employee"; dashboardUrl = "/employee/dashboard"; profileSettingurl = "/employee/profile"
  } else if(type ==="1") {
    userType = "Employer"; dashboardUrl = "/employer/dashboard"; profileSettingurl = "/employer/profile-setting"
  } else if(type ==="0") {
    userType = "Admin"
  }


  return (

    <header className="header">
      <nav className="navbar navbar-expand-lg header-nav">
        <div className="navbar-header">
          <a href="#0" id="mobile_btn">
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <Link to="/home" className="navbar-brand logo">
            <img src={logo} className="img-fluid" alt="Logo" />
          </Link>
        </div>
        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/home" className="menu-logo">
              <img src={logo} className="img-fluid" alt="Logo" />
            </Link>
            <a href="#0" id="menu_close" className="menu-close">
              <i className="fas fa-times"></i>
            </a>
          </div>
          <ul className="main-nav">
            <li className={`has-submenu ${url === "/home" ? "active" : ""}`}>
              <NavLink to="/home" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className={`has-submenu ${url === "/about-us" ? "active" : ""}`}>
              <NavLink to="/about-us" activeClassName="active">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" activeClassName="active">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" activeClassName="active">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/jobs" activeClassName="active">
                Find Job
              </NavLink>
            </li>
            {/* <li className={`has-submenu ${url === "/doctor" ? "active" : ""}`}>
              <a href="#0">
                Employer<i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul className="submenu">
                <li>
                  <Link to="/doctor/doctor-dashboard">Employer Dashboard</Link>
                </li>
                <li>
                  <Link to="/doctor/appointments">Jobs</Link>
                </li>
                <li>
                  <Link to="/doctor/schedule-timing">Schedule Timing</Link>
                </li>
                <li>
                  <Link to="/doctor/my-patients">Patients List</Link>
                </li>
                <li>
                  <Link to="/doctor/patient-profile">Patients Profile</Link>
                </li>
                <li>
                  <Link to="/doctor/chat-doctor">Chat</Link>
                </li>
                <li>
                  <Link to="/doctor/invoice">Invoices</Link>
                </li>
                <li>
                  <Link to="/doctor/profile-setting">Profile Settings</Link>
                </li>
                <li>
                  <Link to="/doctor/review">Reviews</Link>
                </li>
                <li>
                  <Link to="/doctor/doctor-register">Employer Register</Link>
                </li>
              </ul>
            </li>
            <li className={`has-submenu ${url === "/patient" ? "active" : ""}`}>
              <a href="#0">
                Employee <i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul className="submenu">
                <li>
                  <Link to="/patient/dashboard">Employee Dashboard</Link>
                </li>
                <li className="has-submenu">
                  <a href="#0">Doctors</a>
                  <ul className="submenu">
                    <li>
                      <Link to="/patient/doctor-grid">Map Grid</Link>
                    </li>
                    <li>
                      <Link to="/patient/doctor-list">Map List</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/patient/search-doctor">Search Doctor</Link>
                </li>
                <li>
                  <Link to="/patient/doctor-profile">Doctor Profile</Link>
                </li>
                <li>
                  <Link to="/patient/booking">Booking</Link>
                </li>
                <li>
                  <Link to="/patient/checkout">Checkout</Link>
                </li>
                <li>
                  <Link to="/patient/booking-success">Booking Success</Link>
                </li>
                <li>
                  <Link to="/patient/patient-chat">Chat</Link>
                </li>
                <li>
                  <Link to="/patient/profile">Profile Settings</Link>
                </li>
              </ul>
            </li>
            <li className={`has-submenu ${url === "/pages" ? "active" : ""}`}>
              <a href="#0">
                Pages<i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul className="submenu">
                <li>
                  <Link to="/pages/voice-call">Voice Call</Link>
                </li>
                <li>
                  <Link to="/pages/video-call">Video Call</Link>
                </li>

                <li>
                  <Link to="/pages/calendar">Calendar</Link>
                </li>

                <li className="has-submenu">
                  <a href="#0">Invoices</a>
                  <ul className="submenu">

                    <li>
                      <Link to="/pages/invoice-view">Invoice View</Link>
                    </li>
                  </ul>
                </li>

                <li className="active">
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/forgot-password">Forgot Password</Link>
                </li>
              </ul>
            </li>
            <li className={`has-submenu ${url === "/blog" ? "active" : ""}`}>
              <a href="#0">
                Blog<i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul className="submenu">
                <li>
                  <Link to="/blog/blog-list">Blog List</Link>
                </li>
                <li>
                  <Link to="/blog/blog-grid">Blog Grid</Link>
                </li>
                <li>
                  <Link to="/blog/blog-details">Blog Details</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="/admin" target="_blank" to="/admin">Admin</a>
            </li> */}
          </ul>
        </div>
        <ul className="nav header-navbar-rht">
          { token ? [
            <li className="nav-item contact-item" key='0'>
              <div className="header-contact-img">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <div className="header-contact-detail">
                <p className="contact-header">{name}</p>
                {/* <p className="contact-info-header"> +1 315 369 5943</p> */}
              </div>
            </li>,
            (props.location.pathname === "/pages/voice-call" || "/pages/video-call"
              ? (
                <Dropdown className="user-drop nav-item dropdown has-arrow logged-item" key="1">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className="avatar avatar-sm">
                        <img
                          src={photoUrl}
                          alt="User"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="user-header">
                      <div className="avatar avatar-sm">
                        <img
                          src={photoUrl}
                          alt="User"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <div className="user-text">
                        <h6>{name}</h6>
                        <p className="text-muted mb-0">{userType}</p>
                      </div>
                    </div>
                    {
                      type==="0"?
                        <>
                          <Dropdown.Item href="/admin">Dashboard</Dropdown.Item>
                          <Dropdown.Item href="/admin/settings">Profile Settings</Dropdown.Item>
                        </>
                      :
                        <>
                          <Link className="dropdown-item" to={dashboardUrl}>Dashboard</Link>
                          <Link className="dropdown-item" to={profileSettingurl}>Profile Settings</Link>
                        </>
                    }
                    <Link className="dropdown-item" onClick={userLogout} to="#">Logout</Link>
                  </Dropdown.Menu>
                </Dropdown>
              ) : ( <li className="nav-item">
                      <Link to="/login" className="nav-link header-login">
                        login / Signup{" "}
                      </Link>
                    </li>
                  )
            )
          ] : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link header-login">
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link header-login">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
