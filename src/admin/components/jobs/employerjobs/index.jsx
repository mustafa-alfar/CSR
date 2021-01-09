import React, { Component } from "react";
import SidebarNav from "../../sidebar";
import { Link } from 'react-router-dom';
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../../components/paginationfunction";
import IMG01 from "../../../assets/images/doctor-thumb-01.jpg";
// context
import { AdminContext } from "../../../context/admin";
// moment
import moment from "moment";

class EmployerJobs extends Component {

  handleSingleJob = async (id) => {
    await this.context.getSingleJob(id);
    this.props.history.push(`/admin/single-job/${id}`);
  }

  render () {
    const {employerInfo: {...employerInfo}, jobs} = this.context.singleEmployer;
    const {name} = employerInfo;
    const {closed, coplete, open, processed} = jobs;
    const data = [...closed, ...coplete, ...open, ...processed];
    
    const columns = [
      {
        title: "Job Name",
        dataIndex: "title",
        render: (title, {image, id}) => {
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
        title: "Status",
        dataIndex: "status",
        render: (status) => {
        const statusValue = status === "0"? "Open" : status === "1"? "Closed" : status === "2"? "Processed":  "Completed";
        const statusClass = status === "0"? "warning" : status === "1"? "danger" : status === "2"? "primary" : "success";
        return <span className={`badge badge-pill bg-${statusClass}-light`}>{statusValue}</span>;
        },
        sorter: (a, b) => a.employer.status.length - b.employer.status.length,
      },
      {
        title: "Posted At",
        dataIndex: "created_at",
        render: (date) => (moment(date).format("YYYY-MM-DD")),
        sorter: (a, b) => a.created_at.length - b.created_at.length,
      },
      {
        title: "Proposals Count",
        dataIndex: "",
        render: () => ("Proposals (0)"),
      },
      {
        title: "Details",
        dataIndex: "id",
        render: (id, record) => (
          <button className="btn btn-sm bg-info-light" onClick={()=>this.handleSingleJob(id)}>View ({record.jobs_count})</button>
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
                  <h3 className="page-title">{name} Jobs</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">Jobs</li>
                    <li className="breadcrumb-item active">{name} Jobs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
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
                          total: data? data.length : 0,
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

          </div>
        </div>
      </>
    );
  }
}

EmployerJobs.contextType = AdminContext;
export default EmployerJobs;