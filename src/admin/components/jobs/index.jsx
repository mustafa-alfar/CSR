import React, { Component } from "react";
import SidebarNav from "../sidebar";
import { Link } from 'react-router-dom';
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../components/paginationfunction";
import moment from "moment";
import IMG01 from "../../assets/images/doctor-thumb-01.jpg";
// context
import { AdminContext } from "../../context/admin";
import PageLoading from "../loading/pageloading"

class Jobs extends Component {

  componentDidMount = () => {
    const {getJobs, jobs} = this.context;
    const {status} = this.props.match.params;
    if(jobs.length===0){getJobs(status)};
  }

  handleSingleJob = async (id) => {
    await this.context.getSingleJob(id);
    this.props.history.push(`/admin/single-job/${id}`);
  }

  handleEmployerProfile = async (id) => {
    await this.context.getEmployerProfile(id);
    this.props.history.push("/admin/profile/employer");
  }

  render () {
    const {status} = this.props.match.params;
    const statusName = status === "0"? "Opend" : status === "1"? "Closed" : status === "2"? "Processed" : "Completed";
    const {jobs, loading} = this.context;
    const data = jobs
    const imageUrl = "http://joodya.com/crs/public/images/";
    const columns = [
      {
        title: "Job Name",
        dataIndex: "title",
        render: (title, record) => {
          return (
            <h2 className="table-avatar">
              <Link to="#" onClick={()=>this.handleSingleJob(record.id)} className="avatar avatar-sm mr-2">
                <img alt="Job Image" src={record.image? (imageUrl+record.image) : IMG01} />
              </Link>
              <Link to="#" onClick={()=>this.handleSingleJob(record.id)}>{title}</Link>
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
        title: "Employer Name",
        dataIndex: "employer",
        render: ({name, photo, id}) => (
          <h2 className="table-avatar">
            <Link to="" onClick={()=>this.handleEmployerProfile(id)} className="avatar avatar-sm mr-2">
              <img alt="Job Image" src={photo? (imageUrl+photo) : IMG01} />
            </Link>
            <Link to="" onClick={()=>this.handleEmployerProfile(id)}>{name}</Link>
          </h2>
        ),
        sorter: (a, b) => a.employer.name.length - b.employer.name.length,
      },
      {
        title: "Posted At",
        dataIndex: "created_at",
        render: (date) => (moment(date).format("YYYY-MM-DD")),
        sorter: (a, b) => a.created_at.length - b.created_at.length,
      },
      {
        title: "Proposals Count",
        dataIndex: "proposals_count",
        render: (proposals_count) => (`Proposals (${proposals_count})`),
      },
      {
        title: "Details",
        dataIndex: "id",
        render: (id) => (
          <button onClick={()=>this.handleSingleJob(id)} className="btn btn-sm bg-info-light">View</button>
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
                  <h3 className="page-title">Jobs</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                    <li className="breadcrumb-item active">{statusName} Jobs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    {
                    loading? <PageLoading loading={loading} /> :
                    <div className="table-responsive">
                      <Table
                        className="table-striped"
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={data}
                        rowKey={(record) => record.id}
                        showSizeChanger={true}
                        pagination={{
                          total: data.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                      />
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

Jobs.contextType = AdminContext;
export default Jobs;