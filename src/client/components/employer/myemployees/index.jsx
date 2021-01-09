import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07, IMG08, IMG012  } from './img';
import EmployerSidebar from '../sidebar';
// context
import { EmployerContext } from "../../../context/employer";
import PageLoading from "../../loading/pageloading";

function MyEmployees () {
  const history = useHistory();
  const { getMyEmployees, myEmployees, getMyEmployeeProfile, loading } = useContext(EmployerContext);

  useEffect(() => {
    getMyEmployees();
  }, [])

  // getMyEmployeeProfile
  const handleEmployeeProfile = async (id) => {
    await getMyEmployeeProfile(id);
    history.push("/employer/employee-profile");
  }

  return(
    <>
			<div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">My Employees</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">My Employees</h2>
						</div>
					</div>
				</div>
			</div>

      <div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <EmployerSidebar />
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9">
              {loading? <PageLoading loading={loading} /> :
							<div className="row row-grid">
                {myEmployees.map((employee, index)=>{
                  const {user_id, employee_name, photo, category_name, country, mobile, birthDate, email} = employee;
                  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
                  return (
                    <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                      <div className="card widget-profile pat-widget-profile">
                        <div className="card-body">
                          <div className="pro-widget-content">
                            <div className="profile-info-widget">
                              <Link to="#" onClick = {()=>handleEmployeeProfile(user_id)} className="booking-doc-img">
                                <img src={photoUrl} alt="User" />
                              </Link>
                              <div className="profile-det-info">
                                <h3><Link to="#" onClick = {()=>handleEmployeeProfile(user_id)}>{employee_name}</Link></h3>

                                <div className="patient-details">
                                  <h5><i className="fab fa-sketch"></i> {category_name}</h5>
                                  <h5 className="mb-0"><i className="fas fa-map-marker-alt"></i> {country}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="patient-info">
                            <ul>
                              <li>Phone <span>{mobile}</span></li>
                              <li>Birth Date <span>{birthDate}</span></li>
                              <li>Email <span>{email}</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                }
							</div>
              }
						</div>
					</div>
				</div>
			</div>
    </>
  );
}
export default MyEmployees;