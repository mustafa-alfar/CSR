import React, { Component } from 'react';
import SidebarNav from '../../sidebar';
import {Link} from 'react-router-dom';
import IMG01 from '../../../assets/images/avatar-01.jpg';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import moment from "moment";
import { Modal } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// context
import { AdminContext } from "../../../context/admin";

class EmployerProfile extends Component {

  constructor(props) {
		super(props);
		this.state = {
			key: 1,
      coverLetter: "",
      action: {},
      successStory: "",
      storyImage: null,
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
    const {setSuccessStory, getEmployerProfile} = this.context;
    await setSuccessStory(id, successStory, storyImage);
    this.closeModal();
    getEmployerProfile(id);
  }

  handleSingleJob = async (id) => {
    await this.context.getSingleJob(id);
    this.props.history.push(`/admin/single-job/${id}`);
  }

  handleActionBtn = (name, func) => {
    this.openModal('action');
    this.setState({action: {name, func}});
  }

  render () {
    const {EmployerProfile, activateEmployer, deactivateEmployer, employerActive} = this.context;
    const {info: {...info}, jobs} = EmployerProfile;
    const {id, photo, name, country_id, email, mobile, pref, success_story, active} = info;
    const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
    const {open, closed, coplete, processed} = jobs;
    const activeValue = employerActive.toString() || active;
    const activeClass = activeValue === "1"? "text-success" : "";
    const activeName = activeValue === "1"? "Activate" : "Deactivate";

    const columns = [
      {
        title: "Job",
        dataIndex: "title",
        render: (title, {id, image}) => {
          const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
          return (
            <h2 className="table-avatar">
              <Link to="#" onClick={()=>this.handleSingleJob(id)} className="avatar avatar-sm mr-2">
                <img alt="Job Image" src={imageUrl} />
              </Link>
              <Link to="#" onClick={()=>this.handleSingleJob(id)}>{title}</Link>
            </h2>
          )
        },
        sorter: (a, b) => a.title.length - b.title.length,
      },
      {
        title: "Category",
        dataIndex: "category",
        render: (category) => (category? category.name : "null"),
        sorter: (a, b) => a.category.name.length - b.category.name.length,
      },
      {
        title: "Posted At",
        dataIndex: "created_at",
        render: (date) => (moment(date).format("YYYY-MM-DD")),
        sorter: (a, b) => a.created_at.length - b.created_at.length,
      },
      // {
      //   title: "Proposals Count",
      //   dataIndex: "proposals_count",
      //   render: (proposals_count) => (`Proposals (${proposals_count})`),
      // },
      {
        title: "Details",
        dataIndex: "id",
        render: (id) => (
          <button onClick={()=>this.handleSingleJob(id)} className="btn btn-sm bg-info-light">View</button>
        ),
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
                      <ul className="entry-meta meta-item">
                        <li><i className="fas fa-map-marker-alt"></i> {country_id}</li>
                        <li><i className="far fa-envelope"></i> {email}</li>
                        <li><i className="fas fa-mobile-alt"></i> {mobile}</li>
                        <li><i className={`fab fa-black-tie ${activeClass}`}></i> {activeName}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="doc-info-right">
                    <div className="clini-infos">
                      <ul>
                        <li>
                          {/* <i className="far fa-thumbs-up"></i>  */}
                          Opened Jobs ({open && open.length})</li>
                        <li>
                          {/* <i className="far fa-comment"></i> */}
                          Closed Jobs ({closed && closed.length})
                          </li>
                        <li>
                          {/* <i className="fas fa-map-marker-alt"></i> */}
                            processed Jobs ({coplete && coplete.length})</li>
                        <li>
                          {/* <i className="far fa-money-bill-alt"></i> */}
                            Completed Jobs ({processed && processed.length})</li>
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
                      <button className="apt-btn" onClick={()=>this.openModal('story')}>Success Story</button>
                      {activeValue==="0"?
                        <button className="btn btn-sm bg-success-light"  onClick={()=>this.handleActionBtn("activate", ()=>activateEmployer(id))}>Activate</button> :
                        <button className="btn btn-sm bg-danger-light" onClick={()=>this.handleActionBtn("deactivate", ()=>deactivateEmployer(id))}>Deactivate</button>
                      }
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
                            <h4 className="widget-title">Employer Details</h4>
                            <p>{pref}</p>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab className="nav-item" eventKey={2} title="Opened Jobs">
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
                                  dataSource={open}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: open? open.length : 0,
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
                    <Tab className="nav-item" eventKey={3} title="Closed Jobs">
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
                                  dataSource={closed}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: closed? closed.length : 0,
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
                    <Tab className="nav-item" eventKey={4} title="Completed Jobs">
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
                                  dataSource={coplete}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: coplete? coplete.length : 0,
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
                    <Tab className="nav-item" eventKey={5} title="Processed Jobs">
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
                                  dataSource={processed}
                                  rowKey={(record) => record.id}
                                  showSizeChanger={true}
                                  pagination={{
                                    total: processed? processed.length : 0,
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
            {/* end */}

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

            {/* action Modal */}
            <Modal show={this.state.activeModal === 'action'} onHide={this.closeModal} centered>
              <Modal.Body className="text-center">
                <div className="form-content p-2">
                  <h4 className="modal-title">{this.state.action.name}</h4>
                  <p className="mb-4">Are you sure want to {this.state.action.name}?</p>
                  <button type="button" className="btn btn-success" onClick={()=>{this.state.action.func(); this.closeModal()}}>Send</button>
                  <button type="button" className="btn btn-light" data-dismiss="modal" onClick={()=>this.closeModal()}>cancel</button>
                </div>
              </Modal.Body>
            </Modal>

          </div>
        </div>

      </div>
    );
  }
}

EmployerProfile.contextType = AdminContext;
export default EmployerProfile;