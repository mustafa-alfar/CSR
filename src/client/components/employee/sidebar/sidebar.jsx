import React,{ useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../../assets/images/patient.jpg';
// context
import { UserContext } from "../../../context/user";

export function DashboardSidebar () {

  // context values
	const {userLogout, user: {photo, name, birthDate, country_id}} = useContext(UserContext);
  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
  
  return(
    <div className="profile-sidebar">
      <div className="widget-profile pro-widget-content">
        <div className="profile-info-widget">
          <Link to="/employee/dashboard" className="booking-doc-img">
            <img src={photoUrl} alt="User" />
          </Link>
          <div className="profile-det-info">
            <h3>{name}</h3>
            <div className="patient-details">
              <h5><i className="fas fa-birthday-cake"></i> {birthDate}</h5>
              <h5 className="mb-0"><i className="fas fa-map-marker-alt"></i> {country_id}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-widget">
        <Nav className="dashboard-menu">
          <Nav.Item>
            <NavLink to="/employee/dashboard">
              <i className="fas fa-columns"></i>
              <span>Profile</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employee/proposals">
              <i className="fas fa-file-signature"></i>
              <span>Proposals</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employee/education">
              <i className="fas fa-university"></i>
              <span>Education</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employee/works">
              <i className="fas fa-briefcase"></i>
              <span>Works Experience</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employee/skills">
              <i className="fas fa-cogs"></i>
              <span>Skills</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employee/languages">
              <i className="fas fa-language"></i>
              <span>Languages</span>
            </NavLink>
          </Nav.Item>
          {/* <Nav.Item>
            <NavLink to="/employee/employee-chat">
              <i className="fas fa-comments"></i>
              <span>Message</span>
              <small className="unread-msg">23</small>
            </NavLink>
          </Nav.Item> */}
          <Nav.Item>
            <NavLink to="/employee/profile">
              <i className="fas fa-user-cog"></i>
              <span>Profile Settings</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employee/change-password">
              <i className="fas fa-lock"></i>
              <span>Change Password</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/login">
              <i className="fas fa-sign-out-alt"></i>
              <span onClick={userLogout}>Logout</span>
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
export default DashboardSidebar;