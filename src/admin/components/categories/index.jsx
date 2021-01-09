import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import SidebarNav from '../sidebar';
import { Modal } from 'react-bootstrap';
import {itemRender,onShowSizeChange} from "../../components/paginationfunction";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IMG01 from '../../assets/images/specialities-01.png';
// context
import { AdminContext } from "../../context/admin";

class Categories extends Component{
	constructor(props) {
		super(props);
		this.state = {
      show: null,
      isEdit: false,
      id: "",
      name: "",
      parent: "",
      image: null,
		}
	}

	componentDidMount = () => {
    this.context.getCategories();
  }

	handleClose=()=>{
		this.setState({
			show:false
		});
	}

	handleShow=(id)=>{
		this.setState({
			show:id
		});
  }

  handleAddBtn = () => {
    this.setState({
      id: "",
      name: "",
      parent: "",
      image: "",
      isEdit: false
    });
    this.handleShow('edit');
  }

  handleEditBtn = ({id, name, parent, image}) => {
    this.setState({
      id,
      name,
      parent,
      image,
      isEdit: true
    });
    this.handleShow('edit');
  }

  handleDeleteBtn = (id) => {
    this.setState({id});
    this.handleShow('delete');
  }

  initialValues = () => {
    return {
      name: this.state.name,
      parent: this.state.parent,
      image: null,
    }
  }


  validationSchema = () =>{
     const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

    return Yup.object().shape({
    name: Yup.string().required("Required"),
    parent: Yup.string().required("Required"),
    image: Yup
        .mixed()
        .required("Required")
        // .test(
        //   "fileSize",
        //   "File too large",
        //   value => value && value.size <= FILE_SIZE
        // )
        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )
    });
  }

  handleSubmit = async (values) => {
    const id = this.state.id;
    this.state.isEdit? await this.context.updateCategory({id, ...values}) : await this.context.addCategory(values);
    this.handleClose();
  }

  render(){
    const {categories, getSubCategories} = this.context;
		const data = categories;

		const columns = [
			{
			  title: '#',
			  dataIndex: 'id',
			  sorter: (a, b) => a.id.length - b.id.length,
			},
			{
			  title: 'Category',
        dataIndex: 'name',
        render: (text, {image, name, id}) => {
          const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
          return(
            <h2 className="table-avatar">
              <Link to={`/admin/categories/${id}`} onClick={()=>getSubCategories(id)} className="avatar avatar-sm mr-2"><img src={imageUrl} className="avatar-img" alt=""  /></Link>
              <Link to={`/admin/categories/${id}`} onClick={()=>getSubCategories(id)}>{name}</Link>
            </h2>
          )
        },
			  sorter: (a, b) => a.name.length - b.name.length,
			},
			{
        title: 'Actions',
        dataIndex: 'id',
			  render: (id, record) => (
          <div className="actions">
              <button className="btn btn-sm bg-success-light" onClick={()=>this.handleEditBtn(record)}><i className="fe fe-pencil"></i> Edit</button>
              <button className="btn btn-sm bg-danger-light" onClick={()=>this.handleDeleteBtn(id)}><i className="fe fe-trash"></i> Delete</button>
          </div>
        ),
			},
		]

    return(
      <>
        <SidebarNav />
        <div className="page-wrapper">
          <div className="content container-fluid">

            <div className="page-header">
              <div className="row">
                <div className="col-sm-7 col-auto">
                  <h3 className="page-title">Categories</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Categories</li>
                  </ul>
                </div>
                <div className="col-sm-5 col">
                  <button className="btn btn-primary float-right mt-2" onClick={this.handleAddBtn}>Add</button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table className="table-striped"
                        style = {{overflowX : 'auto'}}
                        columns={columns}
                        // bordered
                        dataSource={data}
                        ascend={true}
                        rowKey={record => record.id}
                        showSizeChanger={true}
                        pagination= { {total : data.length,
                          showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          <Modal show={this.state.show === 'edit'} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title><h5 className="modal-title">Category</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={this.initialValues()}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
                validateOnChange={false}
                enableReinitialize={true}
              >
                {(formik)=>{
                  const {setFieldValue} = formik;
                   return (
                    <Form>
                      <div className="row form-row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Category Name</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Main Category</label>
                            <Field as="select" name="parent" className="form-control">
                              <option value="" disabled>Select Parent Category</option>
                              <option value="0">Main Category</option>
                              {
                                categories.map((category) => {
                                  return (
                                    <option key={category.id} value={category.id}>
                                      {category.name}
                                    </option>
                                  );
                                })
                              }
                            </Field>
                            <ErrorMessage name="parent" />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>Image</label>
                            <Field type="file" name="file" className="form-control" onChange={(event)=>{
                                setFieldValue("image", event.currentTarget.files[0]);
                              }}
                            />
                            <ErrorMessage name="image" />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
                    </Form>
                  )
                }}
              </Formik>
            </Modal.Body>
          </Modal>

          {/* Delete Modal */}
          <Modal show={this.state.show === 'delete'} onHide={this.handleClose} centered>
            <Modal.Body className="text-center">
              <div className="form-content p-2">
                <h4 className="modal-title">Delete</h4>
                <p className="mb-4">Are you sure want to delete?</p>
                <button type="button" className="btn btn-primary" onClick={()=>{this.context.deleteCategory(this.state.id); this.handleClose()}}>Save </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>this.handleClose()}>Close</button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    )
  }
}

Categories.contextType = AdminContext;
export default Categories;