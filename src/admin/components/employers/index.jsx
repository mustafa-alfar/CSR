import React, { Component } from "react";
import SidebarNav from "../sidebar";
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import { Modal} from 'react-bootstrap';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../components/paginationfunction";
import IMG01 from "../../assets/images/doctor-thumb-01.jpg";
// context
import { AdminContext } from "../../context/admin"

class Employers extends Component {

  constructor(props) {
		super(props);
		this.state = {
      key: 1,
      activeModal: null,
      action: {},
		}
		this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount = () => {
    this.context.getEmployers();
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

  handleEmployerJobs = async (id) => {
    await this.context.getEmployerJobs(id);
    this.props.history.push("/admin/employer-jobs");
  }

  handleEmployerProfile = async (id) => {
    await this.context.getEmployerProfile(id);
    this.props.history.push("/admin/profile/employer");
  }

  handleActionBtn = (name, func) => {
    this.openModal('action');
    this.setState({action: {name, func}});
  }

  render () {
    const {employers, activateEmployer, deactivateEmployer} = this.context;
    const {active, not_active} = employers;
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        sorter: (a, b) => a.id.length - b.id.length,
      },
      {
        title: "Employer Name",
        dataIndex: "name",
        render: (name, record) => {
          const imageUrl = record.photo? `http://joodya.com/crs/public/images/${record.photo}` : IMG01;
          return (
            <h2 className="table-avatar">
              <Link to ="#" onClick={()=>this.handleEmployerProfile(record.id)} className="avatar avatar-sm mr-2">
                <img alt="" src={imageUrl} />
              </Link>
              <Link to ="#" onClick={()=>this.handleEmployerProfile(record.id)}>{name}</Link>
            </h2>
          )
        },
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: "Country",
        dataIndex: "country_id",
        sorter: (a, b) => a.country_id.length - b.country_id.length,
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => a.email.length - b.email.length,
      },
      {
        title: "Jobs",
        dataIndex: "id",
        render: (id, {active}) => (
          <>
            <button className="btn btn-sm bg-primary-light" onClick={()=>this.handleEmployerJobs(id)}>View</button>
            {active==="0"?
              <button className="btn btn-sm bg-success-light" onClick={()=>this.handleActionBtn("activate", ()=>activateEmployer(id))}>Activate</button> :
              <button className="btn btn-sm bg-danger-light" onClick={()=>this.handleActionBtn("deactivate", ()=>deactivateEmployer(id))}>Deactivate</button>
            }
          </>
        ),
      },
    ];

    return (
      <>
        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">

            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">List of Employees</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">Users</li>
                    <li className="breadcrumb-item active">Employees</li>
                  </ul>
                </div>
              </div>
            </div>

          {/* start */}
          <div className="card">
            <div className="card-body">
              <Tabs
                className="tab-view"
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="controlled-tab-example"
              >
                <Tab className="nav-item" eventKey={1} title="Activate">
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
                              dataSource={active}
                              rowKey={(record) => record.id}
                              showSizeChanger={true}
                              pagination={{
                                total: active? active.length : 0,
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
                <Tab className="nav-item" eventKey={2} title="Deactivate">
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
                              dataSource={not_active}
                              rowKey={(record) => record.id}
                              showSizeChanger={true}
                              pagination={{
                              total: not_active? not_active.length : 0,
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
      </>
    );
  }
}

Employers.contextType = AdminContext;
export default Employers;