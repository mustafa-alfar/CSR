import React, { useContext, useState, useEffect } from 'react';
import StickyBox from "react-sticky-box";
import DoctorSidebar from '../sidebar';
import {Link, useHistory} from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { Modal} from 'react-bootstrap';
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { IMG01 } from './img';
// context
import { EmployerContext } from "../../../context/employer";
import ReactHtmlParser, {convertNodeToElement } from 'react-html-parser';
import moment from "moment";
import PageLoading from "../../loading/pageloading";

function Appointments () {

  const history = useHistory();
  // context values
  const {getEmployerJobs, employerJobs, getJobWithProposals, closeJob, openJob, processJob, loading} = useContext(EmployerContext);
  const {open, close, coplete, processed} = employerJobs;

  // state values
  const [key, setKey] = useState(1);
  const [activeModal, setActiveModal] = useState(null);
  const [action, setAction] = useState({});

	const handleSelect = (key) => {
		setKey(key);
	}

  useEffect(() => {
    getEmployerJobs();
  }, [])

  const handleSingleJob = async (id) => {
    await getJobWithProposals(id);
    history.push("/employer/jobs/single-job");
  }

  const handleJobProposals  = async (id) => {
    await getJobWithProposals(id);
    history.push("/employer/jobs/cover-letters");
  }

  const transform = (node) => {
    node.name = 'span';
    return convertNodeToElement(node);
  }

  const openModal = (id) => {
	  setActiveModal(id);
  }

	const handleCloseModal = () => {
		setActiveModal(false);
  };

  const handleActionBtn = (name, func) => {
    openModal('action');
    setAction({name, func});
  }

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      render: (title, {id, image}) => {
        const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
        return (
          <div className="table-avatar">
            <Link to="#" onClick = {()=>handleSingleJob(id)} className="avatar avatar-sm mr-2">
              <img alt="" src={imageUrl} />
            </Link>
            <Link to="#" onClick = {()=>handleSingleJob(id)}>{title}</Link>
          </div>
        )
      },
      sorter: (a, b) => a.title.length - b.title.length,
    },
    // {
    //   title: "Details",
    //   dataIndex: "details",
    //   render: (details) => (ReactHtmlParser(details, {transform})),
    //   sorter: (a, b) => a.details.length - b.details.length,
    // },
    {
      title: "Category",
      dataIndex: "category",
      render: (category) => (category? category.name : null),
      sorter: (a, b) => a.category.name.length - b.category.name.length,
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
      render: (status, {id, proposals_count}) => {
        return (
          <div className="appointments">
            <div className="appointment-action">
              <Link to="#" className="btn btn-sm bg-info-light" onClick={()=>handleJobProposals(id)}>
                <i className="far fa-eye"></i> Proposals ({proposals_count})
              </Link>
              {
                status === "0"?
                <>
                  <button className="btn btn-sm bg-danger-light" onClick={()=>handleActionBtn("Close", ()=>closeJob(id))}>
                    <i className="fas fa-lock"></i> Close
                  </button>
                  <button className="btn btn-sm bg-primary-light" onClick={()=>handleActionBtn("Process", ()=>processJob(id))}>
                    <i className="fas fa-hourglass-end"></i> Process
                  </button>
                </>
                : status === "1"?
                <>
                  <button className="btn btn-sm bg-success-light" onClick={()=>handleActionBtn("Open", ()=>openJob(id))}>
                    <i className="fas fa-lock-open"></i> Open
                  </button>
                  <button className="btn btn-sm bg-primary-light" onClick={()=>handleActionBtn("Process", ()=>processJob(id))}>
                    <i className="fas fa-hourglass-end"></i> Process
                  </button>
                </>
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
                  <li className="breadcrumb-item"><Link to="/employer/jobs">Jobs</Link></li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Job</h2>
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
                <div className="card">
                  <div className="card-header">
                    {/* <h4 className="card-title">Jobs</h4><hr/> */}
                    <Link to="/employer/jobs/add-job" className="btn btn-primary">Add Job</Link>
                  </div>
                  <div className="card-body">
                    <Tabs
                      className="tab-view"
                      activeKey={key}
                      onSelect={handleSelect}
                      id="controlled-tab-example"
                    >
                      <Tab className="nav-item" eventKey={1} title="Opened Jobs">
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
                      <Tab className="nav-item" eventKey={2} title="Closed Jobs">
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
                                    dataSource={close}
                                    rowKey={(record) => record.id}
                                    showSizeChanger={true}
                                    pagination={{
                                      total: close? close.length : 0,
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
                      <Tab className="nav-item" eventKey={3} title="processed Jobs">
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
                    </Tabs>
                  </div>
                </div>
              }

              {/* action modal */}
              <Modal show={activeModal === 'action'} onHide={handleCloseModal} centered>
                <Modal.Body className="text-center">
                  <div className="form-content p-2">
                    <h4 className="modal-title">{action.name}</h4>
                    <p className="mb-4">Are you sure want to {action.name}?</p>
                    <button type="button" className="btn bg-success-light mr-2" onClick={()=>{action.func(); handleCloseModal()}}> OK </button>
                    <button type="button" className="btn bg-danger-light" data-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
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

export default Appointments;