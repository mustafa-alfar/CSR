import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardSidebar from '../sidebar/sidebar.jsx';
import StickyBox from "react-sticky-box";
import { Modal, Figure } from 'react-bootstrap';
// context
import { EmployeeContext } from "../../../context/employee";
import DatePicker from "react-datepicker";
import moment from "moment";

function Educations () {

  // context values
  const {getEducation, education, AddEducation, updateEducation, deleteEducation, loading} = useContext(EmployeeContext);
  // state values
  const [activeModal, setActiveModal] = useState(null);
  const [attachmentList, setAttachmentList] = useState([]);
  const [preview, setPreview] = useState("");
  // state education values
  let [id, setId] = useState("");
  let [title, setTitle] = useState("");
  let [specialization, setSpecialization] = useState("");
  let [organization, setOrganization] = useState("");
  let [percentage, setPercentage] = useState("");
  let [from_date, setFrom_date] = useState(new Date());
  let [to_date, setTo_date] = useState(new Date());
  let [attachments, setAttachments] = useState(null);

  useEffect(() => {
    getEducation();
  }, [])

  const openModal = (id) => {
	  setActiveModal(id);
  }

	const closeModal = () => {
		setActiveModal(false);
  };

  const handleAddButton = () => {
    setTitle("");
    setSpecialization("");
    setOrganization("");
    setPercentage("");
    setFrom_date(new Date());
    setTo_date(new Date());
    setAttachments(null);
    setPreview("");
    openModal('add');
  }

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    from_date =  moment(from_date).format("YYYY-MM-DD");
    to_date =  moment(to_date).format("YYYY-MM-DD");
    percentage =  parseInt(percentage);
    await AddEducation({title, specialization, organization, percentage, from_date, to_date, attachments});
    closeModal();
  }

  const handleEditButton = (item) => {
    setId(item.id);
    setTitle(item.title);
    setSpecialization(item.specialization);
    setOrganization(item.organization);
    setPercentage(item.percentage);
    setFrom_date(item.from_date);
    setTo_date(item.to_date);
    setAttachments(item.attachments);
    setPreview("");
    openModal('edit');
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    from_date =  moment(from_date).format("YYYY-MM-DD");
    to_date =  moment(to_date).format("YYYY-MM-DD");
    await updateEducation({id, title, specialization, organization, percentage, from_date, to_date, attachments});
    closeModal();
  }

  const handleDeleteButton = (id) => {
    setId(id);
    openModal("delete");
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
                  < DashboardSidebar />
              </StickyBox>
            </div>

          <div className="col-md-7 col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body">
                <Link to="#" className="btn btn-primary" onClick={handleAddButton}>Add Education</Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Education</h4>
                {
                  loading? <h3 className="text-center">Educations Loading...</h3> :
                  education.length<1? <p className="mb-0">Click add education to insert your first education</p> :
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Specialization</th>
                              <th>Organization</th>
                              <th className="text-center">From</th>
                              <th className="text-center">To</th>
                              <th className="text-center">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              education.map(item=>{
                                return (
                                  <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.specialization}</td>
                                    <td>{item.organization}</td>
                                    <td className="text-center">{item.from_date}</td>
                                    <td className="text-center">{item.to_date}</td>
                                    <td className="text-center">{item.percentage}%</td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <button className="btn btn-sm bg-info-light"  onClick={()=>{openModal("attachments"); setAttachmentList(item.attachments)}}><i className="far fa-eye"></i></button>
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

                {/*view attachments*/}
                <Modal size="lg" show={activeModal === 'attachments'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Attachments</h5>
                  </Modal.Header>
                  <Modal.Body>
                    {
                      attachmentList.length>0? attachmentList.map(item=>{
                        return (
                          <Figure key={item.id} className="mr-3">
                            <Figure.Image
                              width={171}
                              height={180}
                              alt="171x180"
                              src={`http://joodya.com/crs/public/images/${item.image}`}
                            />
                          </Figure>
                        )
                      }) : <p>There are no attachments</p>
                    }
                  </Modal.Body>
                </Modal>

                {/*add modal*/}
                <Modal size="lg" show={activeModal === 'add'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Add Education</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmitAdd} encType="multipart/form-data">
                      <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="title">Education Title</label>
                            <input type="text" className="form-control" id="title" onChange={(e)=>setTitle(e.target.value)} />
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor="specialization">Specialization</label>
                              <input type="text" className="form-control" id="specialization" onChange={(e)=>setSpecialization(e.target.value)} />
                          </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="organization">Organization</label>
                          <input type="text" className="form-control" id="organization" onChange={(e)=>setOrganization(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="percentage">Percentage</label>
                            <input type="number" className="form-control" id="percentage" onChange={(e)=>setPercentage(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>From</label>
                          <DatePicker
                            className="form-control"
                            selected={from_date}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            onChange={(from_date)=>setFrom_date(from_date)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>To</label>
                          <DatePicker
                            className="form-control"
                            selected={to_date}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            onChange={(to_date)=>setTo_date(to_date)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="attachments">File</label> */}
                        {preview &&
                          <Figure className="mr-2">
                            <Figure.Image
                              width={100}
                              height={100}
                              alt="Attachment Image"
                              src={preview}
                            />
                          </Figure>
                        }
                        <input type="file" onChange={(e)=>{setPreview(URL.createObjectURL(e.target.files[0])); setAttachments(e.target.files[0])}}></input>
                      </div>
                      <button className="btn btn-primary mr-2" type="submit">Add</button>
                      <button className="btn btn-primary" onClick={closeModal} type="button">Cancel</button>
                    </form>
                  </Modal.Body>
                </Modal>

                 {/*edit modal*/}
                <Modal size="lg" show={activeModal === 'edit'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Edit Education</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
                      <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="title">Education Title</label>
                            <input type="text" className="form-control" id="title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)} />
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor="specialization">Specialization</label>
                              <input type="text" className="form-control" id="specialization" defaultValue={specialization} onChange={(e)=>setSpecialization(e.target.value)} />
                          </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="organization">Organization</label>
                          <input type="text" className="form-control" id="organization" defaultValue={organization} onChange={(e)=>setOrganization(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="number">Percentage</label>
                            <input type="percentage" className="form-control" id="percentage" defaultValue={percentage} onChange={(e)=>setPercentage(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>From</label>
                          <DatePicker
                            className="form-control"
                            selected={new Date(from_date)}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            onChange={(date)=>setFrom_date(date)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>To</label>
                          <DatePicker
                            className="form-control"
                            selected={new Date(to_date)}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            onChange={(date)=>setTo_date(date)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {
                          (attachments && attachments.length>0)? attachments.map(item=>{
                            return (
                              <Figure key={item.id} className="mr-2">
                                <Figure.Image
                                  width={100}
                                  height={100}
                                  alt="Attachment Image"
                                  src={`http://joodya.com/crs/public/images/${item.image}`}
                                />
                              </Figure>
                            )
                          }) : false
                        }
                        {preview &&
                          <Figure className="mr-2">
                            <Figure.Image
                              width={100}
                              height={100}
                              alt="Attachment Image"
                              src={preview}
                            />
                          </Figure>
                        }
                        <input type="file" onChange={(e)=>{setPreview(URL.createObjectURL(e.target.files[0])); setAttachments(e.target.files[0])}}></input>
                      </div>
                      <button className="btn btn-primary mr-2" type="submit">Edit</button>
                      <button className="btn btn-primary" onClick={closeModal} type="button">Cancel</button>
                    </form>
                  </Modal.Body>
                </Modal>

                {/* delete modal */}
                <Modal show={activeModal === 'delete'} onHide={closeModal} centered>
                  <Modal.Body className="text-center">
                    <div className="form-content p-2">
                      <h4 className="modal-title">Delete</h4>
                      <p className="mb-4">Are you sure want to delete?</p>
                      <button type="button" className="btn bg-success-light mr-2" onClick={()=>{deleteEducation(id); closeModal()}}> OK </button>
                      <button type="button" className="btn bg-danger-light" data-dismiss="modal" onClick={closeModal}>Cancel</button>
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

export default Educations;