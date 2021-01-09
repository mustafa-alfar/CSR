import React,{ useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {EmployeeContext} from "../../../context/employee";

function Languges () {

  const {getLanguages, languages, AddLanguage, updateLanguage, deleteLanguage, loading} = useContext(EmployeeContext);
  // state values
  const [activeModal, setActiveModal] = useState(null);
  // state language values
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect( async () => {
    await getLanguages();
  }, [])

  const openModal = (id) => {
	  setActiveModal(id);
  }

	const closeModal = () => {
		setActiveModal(false);
  };

  const handleAddButton = () => {
    setName("");
    setLevel("");
    setIsEdit(false);
    openModal("addOrEdit");
  }

  const handleEditButton = (item) => {
    setId(item.id);
    setName(item.name);
    setLevel(item.level);
    setIsEdit(true);
    openModal("addOrEdit");
  }

   const handleDeleteButton = (id) => {
    setId(id);
    openModal("delete");
  }

  const initialValues = () => {
    return {
      name: name,
      level: level,
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    isEdit? await updateLanguage({id, ...values}) : await AddLanguage(values);
    closeModal();
  }

  return (
    <>

    <div className="breadcrumb-bar">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12 col-12">
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/home">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Education</li>
              </ol>
            </nav>
            <h2 className="breadcrumb-title">Education</h2>
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
              <div className="card-body">
                <Link to="#" className="btn btn-primary" onClick={handleAddButton}>Add Language</Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Languages</h4>
                {
                  loading? <h3 className="text-center">Languages Loading...</h3> :
                  languages.length<1? <p className="mb-0">Click add language to insert your first language</p> :
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Language</th>
                              <th>Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              languages.map(item=>{
                                return (
                                  <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.level}</td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <button className="btn btn-sm bg-success-light" onClick={()=>handleEditButton(item)}><i className="fe fe-pencil"></i></button>
                                        <button className="btn btn-sm bg-danger-light" onClick={()=>handleDeleteButton(item.id)}><i className="fe fe-trash"></i></button>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                }

                {/* add or edit modal */}
                <Modal size="lg" show={activeModal === 'addOrEdit'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Add Language</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <Formik
                      initialValues={initialValues()}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                      validateOnChange={false}
                      enableReinitialize={true}
                    >
                      {(formik)=>{
                        return (
                          <Form>
                            <div className="form-group">
                              <label htmlFor="title">Language</label>
                              <Field type="text" id="name" name="name" className="form-control" />
                              <ErrorMessage name="name" component="div" className="text-danger text-xs" />
                            </div>
                            <div className="form-group">
                              <Field as="select" id="level" name="level" className="form-control">
                                <option value="" disabled>Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="good">Good</option>
                                <option value="very good">Very Good</option>
                                <option value="fluent">Fluent</option>
                                <option value="native">Native</option>
                              </Field>
                              <ErrorMessage name="level" component="div" className="text-danger text-xs" />
                            </div>
                            <button className="btn btn-primary mr-2" type="submit">Add</button>
                            <button className="btn btn-light" onClick={closeModal} type="button">Cancel</button>
                          </Form>
                        )
                      }}
                    </Formik>
                  </Modal.Body>
                </Modal>

                {/* delete modal */}
                <Modal show={activeModal === 'delete'} onHide={closeModal} centered>
                  <Modal.Body className="text-center">
                    <div className="form-content p-2">
                      <h4 className="modal-title">Delete</h4>
                      <p className="mb-4">Are you sure want to delete?</p>
                      <button type="button" className="btn bg-success-light mr-2" onClick={()=>{deleteLanguage(id); closeModal()}}> OK </button>
                      <button type="button" className="btn btn-light" data-dismiss="modal" onClick={closeModal}>Cancel</button>
                    </div>
                  </Modal.Body>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );

}
export default Languges;

