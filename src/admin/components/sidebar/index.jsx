import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
// context
import { AdminContext } from "../../context/admin";
class SidebarNav extends Component {
    constructor(props){
      super(props);
      this.state={
        show: null
      }
    }

  handleShow(id){
    this.setState({
        show: id
    })
  }

  handleJobsByStatus = async(status) => {
    await this.context.getJobs(status);
    this.props.history.push(`/admin/jobs/${status}`);
  }
  
  render() {
   const {  location } = this.props
   let pathname = location.pathname
   return (
    <div className="sidebar" id="sidebar">
      <div className="primary-nav">
        <nav role="navigation" className="menu">
          <Scrollbars
            style={{
              width: 250,
              height: "100%",
              backgroundColor: "rgb(121 145 165)",
            }}
            className="menu"
          >
            <Link to="/admin" className="logotype">
              LOGO<span>TYPE</span>
            </Link>
            <div className="overflow-container">
              <ul className="menu-dropdown">

                <li className="menu-title">Main</li>

                <li className={`${'/admin' === pathname ? 'active' : '' }`}>
                  <Link to="/admin"><i className="fe fe-home"></i>Dashboard</Link>
                </li>

                <li>
                  <span className={`menu-hasdropdown ${'/admin/open-jobs' === pathname || '/admin/close-jobs' === pathname || '/admin/complete-jobs' === pathname || '/admin/process-jobs' === pathname ? 'active' : '' }`}>
                    <a href="#" onClick={()=>this.handleShow('jobs')}>Jobs</a>
                  </span>

                  <label title="toggle menu" htmlFor="Jobs">
                    <span className="downarrow">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    className="sub-menu-checkbox"
                    id="Jobs"
                  />

                  <ul className={`sub-menu-dropdown submenu ${ this.state.show === 'jobs' ? 'active' : '' } `}>
                    <li>
                      <Link to="#" onClick={()=>this.handleJobsByStatus("0")}>Open Jobs</Link>
                    </li>
                    <li>
                      <Link to="#" onClick={()=>this.handleJobsByStatus("1")}>Close Jobs</Link>
                    </li>
                    <li>
                      <Link to="#" onClick={()=>this.handleJobsByStatus("2")}>Process Jobs</Link>
                    </li>
                    <li>
                      <Link to="#" onClick={()=>this.handleJobsByStatus("3")}>Complete Jobs</Link>
                    </li>
                  </ul>
                </li>
                
                <li className={`${'/admin/employers' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/employers"> <i className="fe fe-user-plus"></i>Employers</Link>
                </li>

                <li className={`${'/admin/employees' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/employees"><i className="fe fe-user"></i>Employees</Link>
                </li>
                
                <li className={`${'/admin/categories' === pathname ? 'active' : '' }`}>
                   <Link to="/admin/categories"><i className="fe fe-users"></i>Categories</Link>
                </li>

                <li className={`${'/admin/reviews' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/reviews"><i className="fe fe-star-o"></i>Reviews</Link>
                </li>
                
                {/* <li className={`${'/admin/profile' === pathname ? 'active' : '' }`}>
                  <span className="icon"></span>
                  <Link to="/admin/profile"> <i className="fe fe-user-plus"></i>Profile</Link>
                </li> */}
                
                <li className={`menu-hasdropdown ${'/admin/404' === pathname || '/admin/500' === pathname ? 'active' : '' }`}>
                  <a href="#0" onClick={()=>this.handleShow('error')}> <i className="fe fe-document"></i>Error Page</a>

                  <label title="toggle menu" htmlFor="errors">
                    <span className="downarrow">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    className="sub-menu-checkbox"
                    id="errors"
                  />

                  <ul className={`sub-menu-dropdown submenu ${ this.state.show === 'error' ? 'active' : '' } `}>
                    <li>
                      <Link to="/admin/404">404 Error</Link>
                    </li>
                    <li>
                      <Link to="/admin/500">500 Error</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Scrollbars>
        </nav>
      </div>
    </div>
  );
}
}

SidebarNav.contextType = AdminContext;
export default withRouter(SidebarNav);
