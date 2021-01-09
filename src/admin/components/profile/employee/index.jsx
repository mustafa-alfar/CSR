import React, { Component } from 'react';
import SidebarNav from '../../sidebar';
import {Link} from 'react-router-dom';
import IMG01 from '../../../assets/images/avatar-01.jpg';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Modal} from 'react-bootstrap';
import moment from "moment";
// context
import { AdminContext } from "../../../context/admin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ViewProposal from "../../viewproposal";

class EmployeeProfile extends Component {

  constructor(props) {
		super(props);
		this.state = {
			key: 1,
      activeModal: null,
      coverLetter: "",
      successStory: "",
      storyImage: null,
      proposal: {},
		}
		this.handleSelect = this.handleSelect.bind(this);
  }

	handleSelect (key) {
		this.setState({ key })
	}

  openModal = (id) => {
	  this.setState({activeModal: id}); 
  }
  
  closeModal = () => {
		this.setState({activeModal: false}); 
  };

  handleSubmit = async (e, id) => {
    e.preventDefault();
    const {successStory, storyImage} = this.state;
    const {setSuccessStory, getEmployeeProfile} = this.context;
    await setSuccessStory(id, successStory, storyImage);
    this.closeModal();
    getEmployeeProfile(id);
  }

  handleSingleJob = async (id) => {
    await this.context.getSingleJob(id);
    this.props.history.push(`/admin/single-job/${id}`);
  }

  handleViewBtn = (proposal) => {
    this.setState({proposal})
    this.openModal("coverLetter");
  }
  
  render () {
    const EmployeeProfile = this.context.EmployeeProfile;
    const {info, proposals} = EmployeeProfile;
    const {id, photo, name, category: {...category}, country_id, email, mobile, pref, educations, works, languages, skills, success_story} = info;
    const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
    const {pending, accepted, selected, rejected} = proposals;
    
    const columns = [
      {
        title: "Job",
        dataIndex: "job",
        render: ({id, title, image}) => {
          const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
          return (
            <div className="table-avatar">
              <Link to="#" onClick={()=>this.handleSingleJob(id)} className="avatar avatar-sm mr-2">
                <img alt="" src={imageUrl} />
              </Link>
              <Link to="#" onClick={()=>this.handleSingleJob(id)}>{title}</Link>
            </div>
          )
        },
        sorter: (a, b) => a.job.title.length - b.job.title.length,
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
        title: "Posted At",
        dataIndex: "created_at",
        render: (date) => (moment(date).format("YYYY-MM-DD")),
        sorter: (a, b) => a.created_at.length - b.created_at.length,
      },
      {
        title: "Cover Letter",
        dataIndex: "message",
        className: "text-center",
        render: (message, {status}) => {
        const {photo} = info
        const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
        const proposal = {...info, message, photoUrl, status};
          return (
            <div className="appointments">
              <div className="appointment-action">
                <button className="btn btn-sm bg-info-light" onClick={()=>this.handleViewBtn(proposal)}>
                  <i className="far fa-eye"></i> View
                </button>
              </div>
            </div>
          )
        },
      },
    ];

    return (
      <div>

        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">
        
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Profile</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                    <li className="breadcrumb-item active">Profile</li>
                  </ul>
                </div>
              </div>
            </div>
                           
           
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
                    <div className="doc-info-right">
                      <div className="clini-infos">
                        <ul>
                          <li>
                            {/* <i className="far fa-thumbs-up"></i> */}
                             Pending Proposals ({pending && pending.length})
                          </li>
                          <li>
                            {/* <i className="far fa-comment"></i> */}
                             Accepted Proposals ({accepted && accepted.length})
                          </li>
                          <li>
                            {/* <i className="fas fa-map-marker-alt"></i> */}
                             Selected Proposals ({selected && selected.length})
                          </li>
                          <li>
                            {/* <i className="far fa-money-bill-alt"></i>  */}
                            Rejected Proposals ({rejected && rejected.length})
                          </li>
                        </ul>
                      </div>
                      <div className="doctor-action">
                        <a href="#0" className="btn btn-white fav-btn">
                          <i className="far fa-bookmark"></i>
                        </a>
                        <Link to="/doctor/chat-doctor" className="btn btn-white msg-btn">
                          <i className="far fa-comment-alt"></i>
                        </Link>
                        <a href="#0"
                          className="btn btn-white call-btn"
                          data-toggle="modal"
                          onClick={()=>this.openModal('voice')}
                        >
                          <i className="fas fa-phone"></i>    
                        </a>
                        <a href="#0"
                          className="btn btn-white call-btn"
                          data-toggle="modal"
                          onClick={()=>this.openModal('video')}
                          >
                          <i className="fas fa-video"></i>
                        </a>
                      </div>
                      <div className="clinic-booking">
                        <button to="/patient/booking" className="apt-btn" onClick={()=>this.openModal('story')}>Success Story</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}

              {/* start */}
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
            
            {/* success story modal*/}
            <Modal size="lg" show={this.state.activeModal === 'story'} onHide={this.closeModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Success Story</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <label>write success story</label>
                    <CKEditor
                      editor={ ClassicEditor }
                      onChange={(e, editor)=>this.setState({successStory: editor.getData()})}
                      data={success_story}
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload image to success story</label>
                    <input type="file" id="" className="form-control" onChange={(e)=>this.setState({storyImage: e.currentTarget.files[0]})} />
                  </div>
                  <button type="submit" className="btn btn-primary mr-2" onClick={(e)=>this.handleSubmit(e, id)}>Save</button>
                  <button type="button" className="btn btn-light" onClick={this.closeModal}>Cancel</button>
                </form>
              </Modal.Body>
            </Modal>

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
                        <img src={IMG01} className="img-fluid" alt="User" />
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">title</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {ReactHtmlParser(this.state.coverLetter)}
                  </div>
                </div>
              </Modal.Body>
            </Modal> */}

            {/* end */}              
                           
          </div>
        </div>
        
      </div>
    );
  }
}

EmployeeProfile.contextType = AdminContext;
export default EmployeeProfile;