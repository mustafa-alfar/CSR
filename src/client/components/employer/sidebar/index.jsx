import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';
// context
import { UserConsumer } from "../../../context/user";

class EmployerSidebar extends Component{
  render(){
    return(
      <UserConsumer>
        {(value) => {
          const {userLogout, user: {photo, name, birthDate, country_id}} = value;
          const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
          return(
            <div className="profile-sidebar">
              <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                  <Link to="#" className="booking-doc-img">
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
                    <NavLink to="/employer/dashboard">
                      <i className="fas fa-columns"></i>
                      <span>Dashboard</span>
                    </NavLink>
                  </Nav.Item>

                  <Nav.Item> 
                    <NavLink to="/employer/jobs" activeClassName="active">
                      <i className="fas fa-calendar-check"></i>
                      <span>Jobs</span> 
                    </NavLink>
                  </Nav.Item>

                  <Nav.Item> 
                    <NavLink to="/employer/my-employees">
                      <i className="fas fa-user-injured"></i>
                      <span>My Employees</span>
                    </NavLink>
                  </Nav.Item>
                  
                  {/* <Nav.Item> 
                    <NavLink to="/employer/chat-employer">
                      <i className="fas fa-comments"></i>
                      <span>Message</span>
                      <small className="unread-msg">23</small>
                    </NavLink>
                  </Nav.Item> */}

                  <Nav.Item> 
                    <NavLink to="/employer/profile-setting">
                      <i className="fas fa-user-cog"></i>
                      <span>Profile Settings</span>
                    </NavLink>
                  </Nav.Item> 

                  <Nav.Item> 
                    <NavLink to="/employer/change-password">
                      <i className="fas fa-lock"></i>
                      <span>Change Password</span>
                    </NavLink>
                  </Nav.Item> 

                  <Nav.Item> 
                    <NavLink to="/login" activeClassName="active">
                      <i className="fas fa-sign-out-alt"></i>
                      <span onClick={userLogout}>Logout</span>
                    </NavLink>
                  </Nav.Item> 

                </Nav> 
              </div>
            </div>
          );
        }}
      </UserConsumer>
    )
  }
}
export default EmployerSidebar;
   