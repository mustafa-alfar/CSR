import React, { Component } from 'react';
import SidebarNav from '../../sidebar';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../components/paginationfunction";
import { Modal} from 'react-bootstrap';
import IMG01 from '../../../assets/images/avatar-01.jpg';
// context
import { AdminContext } from "../../../context/admin";
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";
import ViewProposal from "../../viewproposal"

class SingleJob extends Component {

  componentDidMount = () => {
    const {getSingleJob, singleJob} = this.context;
    const {id} = this.props.match.params;
    if(singleJob.length===0){getSingleJob(id)};
  }
  state = {
    key: 1,
    activeModal: null,
    proposal: {},
	}

	handleSelect = (key) => {
		console.log("selected " + key);
		this.setState({ key });
	}

  openModal = (id) => {
	  this.setState({
      activeModal: id
    })
  }

	closeModal = () => {
		this.setState({activeModal: false});
  };

  handleViewBtn = (proposal) => {
    this.setState({proposal})
    this.openModal("coverLetter");
  }

  render () {
    const {singleJob, jobStatus, completeJob} = this.context;
    const {job: {...job}, proposals: {...proposals}} = singleJob;
    const {pending, accepted, selected, rejected} = proposals;
    const {id, image, title, status, category: {... category}, employer: {...employer}, proposals_count, created_at, finish_at, details, requirements, responsibility} = job;
    const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
    const categoryImgUrl = category.image? `http://joodya.com/crs/public/images/${category.image}` : IMG01;
    const statusValue = jobStatus.toString() || status;
    const statusName = statusValue === "0"? "Opened Job" : statusValue === "1"? "Closed Job" : statusValue === "2"? "processed Job" : "completed Job";
    const columns = [
      {
        title: "Employee Name",
        dataIndex: "employee",
        render: ({name, photo}) => {
          const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
          return (
            <div className="table-avatar">
              <Link to="/admin/profile/employee" className="avatar avatar-sm mr-2">
                <img alt="" src={photoUrl} />
              </Link>
              <Link to="/admin/profile/employee">{name}</Link>
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
        title: "Seen",
        dataIndex: "seen",
        className: "text-center",
        render: (seen) => {
          const seenClass =  seen === "1"? "text-success" : "";
          return <i className={`far fa-eye d-block ${seenClass}`} ></i>;
        },
      },
      {
        title: "Cover Letter",
        dataIndex: "message",
        className: "text-center",
        render: (message, record) => {
        const {employee, status} = record;
        const {photo} = employee
        const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
        const proposal = {...employee, message, photoUrl, status};
        return <button className="btn btn-sm bg-info-light" onClick={()=>this.handleViewBtn(proposal)}>View</button>;
        },
      },
    ];

    return (
      <>
        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">

            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">{title}</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                    <li className="breadcrumb-item">Jobs</li>
                    <li className="breadcrumb-item active">{title}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="doctor-widget">
                  <div className="doc-info-left">
                    <div className="doctor-img">
                      <img src={imageUrl} className="img-fluid" alt="User" />
                    </div>
                    <div className="doc-info-cont">
                      <h4 className="doc-name">{title}</h4>
                      <p className="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
                      <h5 className="doc-department"><img src={categoryImgUrl} className="img-fluid" alt="Category" />{category.name}</h5>
                      <ul className="entry-meta meta-item">
                        <li><i className="fas fa-sun"></i> {statusName}</li>
                        {/* <li><i className="fab fa-sketch"></i> {categoryName}</li> */}
                        <li><i className="fas fa-file-signature"></i> {proposals_count} Proposals</li>
                        <li><i className="fab fa-black-tie"></i> By {employer.name}</li>
                        <li><i className="fas fa-hourglass-start"></i> {moment(created_at).format("YYYY-MM-DD")}</li>
                        <li><i className="fas fa-hourglass-end"></i> {moment(finish_at).format("YYYY-MM-DD")}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="doc-info-right">
                    <div className="clinic-booking">
                      {
                        statusValue === "2"?
                          <button className="apt-btn" onClick={()=>this.openModal('action')}>
                            Complete Job
                          </button>
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
                  activeKey={this.state.key}
                  onSelect={this.handleSelect}
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
            <ViewProposal proposal={this.state.proposal} activeModal={this.state.activeModal} closeModal={this.closeModal} />
            {/* <Modal size="lg" show={this.state.activeModal === 'coverLetter'} onHide={this.closeModal} centered>
              <Modal.Header closeButton>
              <h5 className="modal-title">Cover Letter</h5>
              </Modal.Header>
              <Modal.Body>
                <div className="card">
                  <div className="card-header">
                    <div className="doc-info-left">
                      <div className="doctor-img">
                        <img src={imageUrl} className="img-fluid" alt="User" />
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">{title}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {ReactHtmlParser(this.state.coverLetter)}
                  </div>
                </div>
              </Modal.Body>
            </Modal> */}

            {/* action modal */}
            <Modal show={this.state.activeModal === 'action'} onHide={this.closeModal} centered>
              <Modal.Body className="text-center">
                <div className="form-content p-2">
                  <h4 className="modal-title">Complete</h4>
                  <p className="mb-4">Are you sure want to complete?</p>
                  <button type="button" className="btn bg-success-light mr-2" onClick={()=>{completeJob(id); this.closeModal()}}> OK </button>
                  <button type="button" className="btn bg-danger-light" data-dismiss="modal" onClick={this.closeModal}>Cancel</button>
                </div>
              </Modal.Body>
            </Modal>

          </div>
        </div>
      </>
    );
  }
}

SingleJob.contextType = AdminContext;
export default SingleJob;