import React, { useContext, useState } from 'react';
import StickyBox from "react-sticky-box";
import DoctorSidebar from '../../sidebar';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { Modal } from 'react-bootstrap';
import { IMG01 } from '../img';
// context
import { EmployerContext } from "../../../../context/employer";
import moment from "moment";
import ViewProposal from "../../viewproposal"

function CoverLetters () {

  // context values
  const {proposals, job: {title}, viewProposal, acceptProposal, selectProposal, rejectProposal} = useContext(EmployerContext);
  const {pending, accepted, selected, rejected} = proposals;

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
                  <li className="breadcrumb-item active" aria-current="page">Proposals Job</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Proposals Job</h2>
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
                  <h4 className="card-title">Proposals Job {title}</h4><hr/>
                  <Tabs
                    className="tab-view"
                    activeKey={key}
                    onSelect={handleSelect}
                    id="controlled-tab-example"
                  >
                    <Tab className="nav-item" eventKey={1} title="Pending Proposals">
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
                    <Tab className="nav-item" eventKey={2} title="Accepted Proposals">
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
                    <Tab className="nav-item" eventKey={3} title="Selected Proposals">
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
                    <Tab className="nav-item" eventKey={4} title="Rejected Proposals">
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

export default CoverLetters;