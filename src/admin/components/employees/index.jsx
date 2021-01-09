import React, { Component } from "react";
import SidebarNav from "../sidebar";
import { Link } from "react-router-dom";
import { Table } from "antd";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../components/paginationfunction";
import IMG01 from "../../assets/images/doctor-thumb-01.jpg";
// context
import { AdminContext } from "../../context/admin";

class Patients extends Component {
  
  componentDidMount = () => {
    this.context.getEmployees();
  }

  handleEmployeeProfile = async (id) => {
    await this.context.getEmployeeProfile(id);
    this.props.history.push("/admin/profile/employee");
  }

  render () {
    const data = this.context.employees;
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        sorter: (a, b) => a.id.length - b.id.length,
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        render: (name, record) => {
          const imageUrl = record.photo? `http://joodya.com/crs/public/images/${record.photo}` : IMG01;
          return (
            <h2 className="table-avatar">
              <Link to="#" onClick={()=>this.handleEmployeeProfile(record.id)} className="avatar avatar-sm mr-2">
                <img alt="Employee Photo" src={imageUrl} />
              </Link>
              <Link to="#" onClick={()=>this.handleEmployeeProfile(record.id)}>{name}</Link>
            </h2>
          )
        },
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: "Category",
        dataIndex: "category",
        render: (category) => (category? category.name : "null"),
        sorter: (a, b) => a.category.name.length - b.category.name.length,
      },
      {
        title: "Country",
        dataIndex: "country_id",
        sorter: (a, b) => a.country_id.length - b.country_id.length,
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => a.email.length - b.email.length,
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
      },
      {
        title: "Proflie",
        dataIndex: "id",
        render: (id) => (
          <button className="btn btn-sm bg-info-light" onClick={()=>this.handleEmployeeProfile(id)}>View</button>
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
                          total: data.length,
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

Patients.contextType = AdminContext;
export default Patients;