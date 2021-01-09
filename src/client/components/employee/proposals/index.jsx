import React,{ useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import IMG01 from '../../../assets/images/patient.jpg';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../paginationfunction";

// context
import { EmployeeContext } from "../../../context/employee";
import moment from "moment";
import ViewProposal from "../viewproposal";

function Proposals () {
  
  // context values
  const {getProposals, proposals, loading} = useContext(EmployeeContext);
  const {accepted, pending, rejected, selected} = proposals;

  // state values
  const [key, setKey] = useState(1);
  const [activeModal, setActiveModal] = useState(null);
  const [proposalDetails, setProposalDetalis] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getProposals();
  }, [])
		
	const handleSelect = (key) => {
		setKey(key);
	}

  const openModal = (id) => {
	  setActiveModal(id);
  }
  
	const closeModal = () => {
		setActiveModal(false);
  };

  const handleViewBtn = (proposal) => {
    setProposalDetalis(proposal);
    setIsEdit(false);
    openModal("coverLetter");
  }

  const columns = [
    {
      title: "Job",
      dataIndex: "job",
      render: ({id, title, image}) => {
        const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
        return (
          <div className="table-avatar">
            <Link to={`/jobs/single-job/${id}`} className="avatar avatar-sm mr-2">
              <img alt="" src={imageUrl} />
            </Link>
            <Link to={`/jobs/single-job/${id}`}>{title}</Link>
          </div>
        )
      },
      sorter: (a, b) => a.job.title.length - b.job.title.length,
    },
    {
      title: "Employer ",
      dataIndex: "employer",
      render: ({name, photo}) => {
        const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
        return (
          <div className="table-avatar">
            <Link to="#" className="avatar avatar-sm mr-2">
              <img alt="" src={photoUrl} />
            </Link>
            <Link to="#">{name}</Link>
          </div>
        )
      },
      sorter: (a, b) => a.employer.name.length - b.employer.name.length,
    },
    {
      title: "Seen",
      dataIndex: "seen",
      className: "text-center",
      render: (seen) => {
        const seenClass =  seen === "1"? "text-success" : "";
        return <i className={`far fa-eye d-block ${seenClass}`}></i>;
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
      render: (message, item) => {
        return <button className="btn btn-sm bg-info-light" onClick={()=>handleViewBtn(item)}>View</button>;
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
                  <li className="breadcrumb-item"><Link to="/doctor/appointments">Proposals</Link></li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Proposals</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>
            
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Proposals</h4>
                </div>
                <div className="card-body">
                  <Tabs
                    className="tab-view"
                    activeKey={key}
                    onSelect={handleSelect}
                    id="controlled-tab-example"
                  >
                    <Tab className="nav-item" eventKey={1} title="Pending Proposal">
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
                    <Tab className="nav-item" eventKey={2} title="Accepted Proposal">
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
                    <Tab className="nav-item" eventKey={3} title="Selected Proposal">
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
                    <Tab className="nav-item" eventKey={4} title="Rejected Proposal">
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
              {/*view modal*/}
              <ViewProposal proposal={proposalDetails} isEdit={isEdit} activeModal={activeModal} closeModal={closeModal} setIsEdit={setIsEdit} />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Proposals;