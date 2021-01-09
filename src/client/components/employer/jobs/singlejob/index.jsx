import React, { useContext, useState } from 'react';
import StickyBox from "react-sticky-box";
import DoctorSidebar from '../../sidebar';
import {Link} from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Modal} from 'react-bootstrap';
import { IMG01 } from '../img';
// context
import { EmployerContext } from "../../../../context/employer";
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";
import ViewProposal from "../../viewproposal"

function EmployerJob () {

  // context values
  const {proposals, job, closeJob, openJob, processJob, jobStatus, viewProposal, acceptProposal, selectProposal, rejectProposal} = useContext(EmployerContext);
  const {pending, accepted, selected, rejected} = proposals;
  const {id, image, title, status, category: {...category}, proposals_count, created_at, finish_at, details, requirements, responsibility} = job;
  const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
  const {name: categoryName, image: categoryImage} = category;
  const categoryImgUrl = categoryImage? `http://joodya.com/crs/public/images/${categoryImage}` : IMG01;
  const statusValue = jobStatus.toString() || status;
  const statusName = statusValue === "0"? "Opened Job" : statusValue === "1"? "Closed Job" : statusValue === "2"? "processed Job" : "completed Job";

  // state values
  const [key, setKey] = useState(1);
  const [activeModal, setActiveModal] = useState(null);
  const [proposalDetails, setProposalDetalis] = useState({});
  const [action, setAction] = useState({});
	const handleSelect = (key) => {
		setKey(key);
	}

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

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employee",
      render: ({name, photo}) => {
        const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
        return (
          <div className="table-avatar">
            <a href="#0" className="avatar avatar-sm mr-2">
              <img alt="" src={photoUrl} />
            </a>
            <a href="#0">{name}</a>
          </div>
        )
      },
      sorter: (a, b) => a.employee.name.length - b.employee.name.length,
    },
    {
      title: "Posted At",
      dataIndex: "created_at",
      render: (date) => (moment(date).format("YYYY-MM-DD")),
      sorter: (a, b) => a.created_at.length - b.created_at.length,
    },
    {
      dataIndex: "status",
      className: "text-right",
      render: (status, record) => {
        const {id, employee, message} = record;
        const {photo} = employee
        const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
        const proposal = {...employee, message, photoUrl, status, proposalId: id};
        return (
          <div className="appointments">
            <div className="appointment-action">
              <button className="btn btn-sm bg-info-light" onClick={()=>handleViewBtn(proposal, id)}>
                <i className="far fa-eye"></i> View
              </button>
              {
                status == 0?
                <>
                  <button className="btn btn-sm bg-primary-light" onClick={()=>handleActionBtn("Accept", ()=>acceptProposal(id))}>
                    <i className="fas fa-check"></i> Accept
                  </button>
                  <button className="btn btn-sm bg-danger-light" onClick={()=>handleActionBtn("Reject", ()=>rejectProposal(id))}>
                    <i className="fas fa-times"></i> Reject
                  </button>
                </>
                : status == 1?
                <button className="btn btn-sm bg-success-light" onClick={()=>handleActionBtn("Select", ()=>selectProposal(id))}>
                  <i className="fas fa-check-double"></i> Select
                </button>
                : null
              }
            </div>
          </div>
        )
      },
    },
  ];

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

              <div className="card">
                <div className="card-body">
                  <div className="doctor-widget">
                    <div className="doc-info-left">
                      <div className="doctor-img">
                        <img src={imageUrl} className="img-fluid" alt="User" />
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">{title}</h4>
                        {/* <p className="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p> */}
                        <h5 className="doc-department"><img src={categoryImgUrl} className="img-fluid" alt="Category" />{categoryName}</h5>
                        <ul className="entry-meta meta-item">
                          <li><i className="fas fa-sun"></i> {statusName}</li>
                          <li><i className="fas fa-file-signature"></i> {proposals_count} Proposals</li>
                          <li><i className="fas fa-hourglass-start"></i> {moment(created_at).format("YYYY-MM-DD")}</li>
                          <li><i className="fas fa-hourglass-end"></i> {moment(finish_at).format("YYYY-MM-DD")}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="doc-info-right">
                      <div className="clinic-booking">
                        {
                          (statusValue === "0")?
                          <>
                            <button className="bg-primary-light" onClick={()=>handleActionBtn("Process", ()=>processJob(id))}>
                              <i className="fas fa-hourglass-end"></i> Process Job
                            </button>
                            <button className="bg-danger-light" onClick={()=>handleActionBtn("Close", ()=>closeJob(id))}>
                              <i className="fas fa-lock"></i> Close Job
                            </button>
                          </>
                          : (statusValue === "1")?
                          <>
                            <button className="bg-success-light" onClick={()=>handleActionBtn("Open", ()=>openJob(id))}>
                              <i className="fas fa-lock-open"></i> Open Job
                            </button>
                            <button className="bg-primary-light" onClick={()=>handleActionBtn("Process", ()=>processJob(id))}>
                              <i className="fas fa-hourglass-end"></i> Process Job
                            </button>
                          </>
                          : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <Tabs
                    className="tab-view"
                    activeKey={key}
                    onSelect={handleSelect}
                    id="controlled-tab-example"
                  >
                    <Tab className="nav-item" eventKey={1} title="Overview">
                      <div className="row">
                        <div className="col-md-12 col-lg-9">

                          <div className="widget about-widget">
                            <h4 className="widget-title">Description</h4>
                            <article>{ReactHtmlParser(details)}</article>
                          </div>

                          <div className="widget education-widget">
                            <h4 className="widget-title">Requirements</h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                {
                                  (requirements && requirements.length>0)? requirements.map((item, index)=>{
                                    return (
                                      <li key={index}>
                                        <div className="experience-user">
                                          <div className="before-circle"></div>
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <p>{item}</p>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  }) : null
                                }
                              </ul>
                            </div>
                          </div>

                          <div className="widget experience-widget">
                            <h4 className="widget-title">Responsibilities</h4>
                            <div className="experience-box">
                              <ul className="experience-list">
                                {
                                  (responsibility && responsibility.length>0)? responsibility.map((item, index)=>{
                                    return (
                                      <li key={index}>
                                        <div className="experience-user">
                                          <div className="before-circle"></div>
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <p>{item}</p>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  }) : null
                                }
                              </ul>
                            </div>
                          </div>

                        </div>
                      </div>
                    </Tab>
                    <Tab className="nav-item" eventKey={2} title="Pending Proposals">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="table-responsive">
                                <Table
                                  className="table-striped"
                                  style={{ overflowX: "auto" }}
                                  columns={columns}
                                  // bordered
                                  dataSource={pending}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: pending? pending.length : 0,
                                    showTotal: (total, range) =>
                                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger: true,
                                    onShowSizeChange: onShowSizeChange,
                                    itemRender: itemRender,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab className="nav-item" eventKey={3} title="Accepted Proposals">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="table-responsive">
                                <Table
                                  className="table-striped"
                                  style={{ overflowX: "auto" }}
                                  columns={columns}
                                  // bordered
                                  dataSource={accepted}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: accepted? accepted.length : 0,
                                    showTotal: (total, range) =>
                                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger: true,
                                    onShowSizeChange: onShowSizeChange,
                                    itemRender: itemRender,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab className="nav-item" eventKey={4} title="Selected Proposals">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="table-responsive">
                                <Table
                                  className="table-striped"
                                  style={{ overflowX: "auto" }}
                                  columns={columns}
                                  // bordered
                                  dataSource={selected}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: selected? selected.length : 0,
                                    showTotal: (total, range) =>
                                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger: true,
                                    onShowSizeChange: onShowSizeChange,
                                    itemRender: itemRender,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab className="nav-item" eventKey={5} title="Rejected Proposals">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card-body">
                              <div className="table-responsive">
                                <Table
                                  className="table-striped"
                                  style={{ overflowX: "auto" }}
                                  columns={columns}
                                  // bordered
                                  dataSource={rejected}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: rejected? rejected.length : 0,
                                    showTotal: (total, range) =>
                                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger: true,
                                    onShowSizeChange: onShowSizeChange,
                                    itemRender: itemRender,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>

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
    </>
  );
}

export default EmployerJob;