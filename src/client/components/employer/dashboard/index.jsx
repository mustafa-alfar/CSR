import React,{ useContext, useState, useEffect } from 'react';
import DoctorSidebar from '../sidebar';
import { Link, useHistory } from 'react-router-dom';
import ProgressBar from 'react-customizable-progressbar';
import StickyBox from "react-sticky-box";
import { Icon01, Icon02, Icon03, IMG01 } from './img';
import { Modal } from 'react-bootstrap';
// context
import { EmployerContext } from "../../../context/employer";
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";
import PageLoading from "../../loading/pageloading";
import ViewProposal from "../viewproposal"

function EmployerDashboard () {

  const history = useHistory();
  // context values
  const { getLastProposals, lastProposals, total, getJobWithProposals, viewProposal, acceptProposal, selectProposal, rejectProposal, loading } = useContext(EmployerContext);

  // state values
  const [activeModal, setActiveModal] = useState(null);
  const [proposalDetails, setProposalDetalis] = useState({});
  const [action, setAction] = useState({});

  useEffect(() => {
    getLastProposals();
  }, [])

  const openModal = (id) => {
	  setActiveModal(id);
  }

	const closeModal = () => {
    setActiveModal(false);
  };

  const handleViewBtn = (proposal, id) => {
    setProposalDetalis(proposal);
    openModal("coverLetter");
    viewProposal(id);
  }

  const handleActionBtn = (name, func) => {
    openModal('action');
    setAction({name, func});
  }

  const handleSingleJob = async (id) => {
    await getJobWithProposals(id);
    history.push("/employer/jobs/single-job");
  }

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Dashboard</h2>
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
              {
                loading? <PageLoading loading={loading} /> :
                <>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="card dash-card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12 col-lg-4">
                              <div className="dash-widget dct-border-rht">
                                <ProgressBar
                                  width={20}
                                  radius={100}
                                  progress={50}
                                  rotate={-210}
                                  strokeWidth={16}
                                  strokeColor="#da3f81"
                                  strokeLinecap="square"
                                  trackStrokeWidth={8}
                                  trackStrokeColor="#e6e6e6"
                                  trackStrokeLinecap="square"
                                  pointerRadius={0}
                                  initialAnimation={true}
                                  transition="1.5s ease 0.5s"
                                  trackTransition="0s ease"
                                >
                                  <div className="indicator-volume">
                                    <img src={Icon01} className="img-fluid" alt="Patient" />
                                  </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                  <h6>Total Jobs</h6>
                                  <h3>{total.totalJobs}</h3>
                                  <p className="text-muted">Till Today</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                              <div className="dash-widget dct-border-rht">
                                <ProgressBar
                                  width={20}
                                  radius={100}
                                  progress={60}
                                  rotate={-210}
                                  strokeWidth={16}
                                  strokeColor="#68dda9"
                                  strokeLinecap="square"
                                  trackStrokeWidth={8}
                                  trackStrokeColor="#e6e6e6"
                                  trackStrokeLinecap="square"
                                  pointerRadius={0}
                                  initialAnimation={true}
                                  transition="1.5s ease 0.5s"
                                  trackTransition="0s ease"
                                >
                                  <div className="indicator-volume">
                                    <img src={Icon02} className="img-fluid" alt="Patient" />
                                  </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                  <h6>Total Proposals</h6>
                                  <h3>{total.totalProposals}</h3>
                                  <p className="text-muted">06, Nov 2019</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                              <div className="dash-widget">
                                <ProgressBar
                                  width={20}
                                  radius={100}
                                  progress={70}
                                  rotate={-210}
                                  strokeWidth={16}
                                  strokeColor="#1b5a90"
                                  strokeLinecap="square"
                                  trackStrokeWidth={8}
                                  trackStrokeColor="#e6e6e6"
                                  trackStrokeLinecap="square"
                                  pointerRadius={0}
                                  initialAnimation={true}
                                  transition="1.5s ease 0.5s"
                                  trackTransition="0s ease"
                                >
                                  <div className="indicator-volume">
                                    <img src={Icon03} className="img-fluid" alt="Patient" />
                                  </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                  <h6>Total Closed Jobs</h6>
                                  <h3>{total.totalCompletedJobs}</h3>
                                  <p className="text-muted">06, Apr 2019</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="mb-4">Last Proposals</h4>
                      <div className="appointment-tab">
                        <div className="tab-pane show active" id="upcoming-appointments">
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Eployee Name</th>
                                      <th>Job Title</th>
                                      <th>Posted At</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      lastProposals.map((item, index)=>{
                                        const {employee, job, id, message, created_at, status} = item;
                                        const {name, photo} = employee;
                                        const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
                                        const {id: JobId, title, image} = job;
                                        const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
                                        const posted_at = moment(created_at).format("YYYY-MM-DD");
                                        const proposalStatus = status === "0"? "Pending" : status === "1"? "Accepted" : status === "2"? "Selected" : "Rejected";
                                        const statusClass = status === "0"? "warning" : status === "1"? "primary" : status === "2"? "success" : "danger";

                                        const proposal = {...employee, message, photoUrl, status, proposalId: id};
                                        return (
                                          <tr key={id}>
                                            <td>
                                              <h2 className="table-avatar">
                                                <Link to="#" className="avatar avatar-sm mr-2">
                                                  <img className="avatar-img rounded-circle" src={photoUrl} alt="User" />
                                                </Link>
                                                <Link to="#">
                                                  {name}
                                                </Link>
                                              </h2>
                                            </td>
                                            <td>
                                              <h2 className="table-avatar">
                                                <Link to="#" onClick={()=>handleSingleJob(JobId)} className="avatar avatar-sm mr-2">
                                                  <img className="avatar-img rounded-circle" src={imageUrl} alt="User" />
                                                </Link>
                                                <Link to="#" onClick={()=>handleSingleJob(JobId)}>
                                                  {title}
                                                </Link>
                                              </h2>
                                            </td>
                                            <td>{posted_at}</td>
                                            <td><span className={`badge badge-pill bg-${statusClass}-light`}>{proposalStatus}</span></td>
                                            <td className="text-right">
                                              <div className="table-action">
                                                <button className="btn btn-sm bg-info-light" onClick={()=>handleViewBtn(proposal, id)}>
                                                  <i className="far fa-eye"></i> View
                                                </button>
                                                {
                                                  status === "0"?
                                                  <>
                                                    <button className="btn btn-sm bg-primary-light"
                                                      onClick={()=>handleActionBtn("Accept", ()=>acceptProposal(id))}>
                                                      <i className="fas fa-check"></i> Accept
                                                    </button>
                                                    <button className="btn btn-sm bg-danger-light"
                                                      onClick={()=>handleActionBtn("Reject", ()=>rejectProposal(id))}>
                                                      <i className="fas fa-times"></i> Reject
                                                    </button>
                                                  </>
                                                  : status === "1"?
                                                  <button className="btn btn-sm bg-success-light"
                                                    onClick={()=>handleActionBtn("Select", ()=>selectProposal(id))}>
                                                    <i className="fas fa-check-double"></i> Select
                                                  </button>
                                                  : null
                                                }
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>

                                {/* cover letter modal */}
                                <ViewProposal proposal={proposalDetails} activeModal={activeModal} closeModal={closeModal} handleActionBtn={handleActionBtn} />

                                {/* action modal */}
                                <Modal show={activeModal === 'action'} onHide={closeModal} centered>
                                  <Modal.Body className="text-center">
                                    <div className="form-content p-2">
                                      <h4 className="modal-title">{action.name}</h4>
                                      <p className="mb-4">Are you sure want to {action.name}?</p>
                                      <button type="button" className="btn bg-success-light mr-2" onClick={()=>{action.func(); closeModal()}}> OK </button>
                                      <button type="button" className="btn bg-danger-light" data-dismiss="modal" onClick={closeModal}>Cancel</button>
                                    </div>
                                  </Modal.Body>
                                </Modal>
                              </div>
                            </div>
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

export default EmployerDashboard;
