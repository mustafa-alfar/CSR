import React,{ useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import { Modal, Figure } from 'react-bootstrap';
// context
import {EmployeeContext} from "../../../context/employee";
// react CKEditor text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// ReactHtmlParser
import ReactHtmlParser from 'react-html-parser';
// DatePicker
import DatePicker from "react-datepicker";
// moment
import moment from "moment";

function Education () {

  const {getWorks, works, AddWork, updateWork, deleteWork, loading} = useContext(EmployeeContext);
  // state values
  const [activeModal, setActiveModal] = useState(null);
  const [attachmentList, setAttachmentList] = useState([]);
  const [preview, setPreview] = useState("");
  // state education values
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let [from_date, setFrom_date] = useState(new Date());
  let [to_date, setTo_date] = useState(new Date());
  const [attachments, setAttachments] = useState(null);

  useEffect(() => {
    getWorks();
  }, [])

  const openModal = (id) => {
	  setActiveModal(id);
  }

	const closeModal = () => {
		setActiveModal(false);
  };

  const handleAddButton = () => {
    setTitle("");
    setDescription("");
    setFrom_date(new Date());
    setTo_date(new Date());
    setAttachments(null);
    setPreview("");
    openModal('add');
  }

  const handleSubmitAdd = async (e)=>{
    e.preventDefault();
    from_date = moment(from_date).format("YYYY-MM-DD");
    to_date = moment(to_date).format("YYYY-MM-DD");
    await AddWork({title, description, from_date, to_date, attachments});
    closeModal();
  }

  const handleEditButton = (item) => {
    setId(item.id);
    setTitle(item.title);
    setDescription(item.description);
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
    console.log({title, description, from_date, to_date, attachments});
    await updateWork({id, title, description, from_date, to_date, attachments});
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
                <li className="breadcrumb-item active" aria-current="page">Works Experience</li>
              </ol>
            </nav>
            <h2 className="breadcrumb-title">Works Experience</h2>
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
                <Link to="#" className="btn btn-primary" onClick={handleAddButton}>Add Work</Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Works Experience</h4>
                {
                  loading? <h3 className="text-center">Works Loading...</h3> :
                  works.length<1? <p className="mb-0">Click add work to insert your first Work</p> :
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Work Title</th>
                              <th>Description</th>
                              <th>Period</th>
                              <th className="text-center">From</th>
                              <th className="text-center">To</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              works.map(item=>{
                                const {id, title, description, work_time, from_date, to_date, attachments} = item;
                                const subDescription = description.substr(0, 30);
                                return (
                                  <tr key={id}>
                                    <td>{title}</td>
                                    <td>{ReactHtmlParser(subDescription, node=>node.textContent)}</td>
                                    <td>{work_time}</td>
                                    <td className="text-center">{from_date}</td>
                                    <td className="text-center">{to_date}</td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <button className="btn btn-sm bg-info-light"  onClick={()=>{openModal("attachments"); setAttachmentList(item)}}><i className="far fa-eye"></i></button>
                                        <button className="btn btn-sm bg-success-light" onClick={()=>handleEditButton(item)}><i className="fe fe-pencil"></i></button>
                                        <button className="btn btn-sm bg-danger-light" onClick={()=>handleDeleteButton(id)}><i className="fe fe-trash"></i></button>
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

                {/*attachments modal*/}
                <Modal size="lg" show={activeModal === 'attachments'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Details</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="widget experience-widget">
                      <h4 className="widget-title">Work Info</h4>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            {/* <div className="experience-user">
                              <div className="before-circle"></div>
                            </div> */}
                            <div className="experience-content">
                              <div className="timeline-content">
                                <h4 className="name exp-year mb-2">{attachmentList.title}</h4>
                                <article>{ReactHtmlParser(attachmentList.description, node=>node.textContent)}</article>
                                <span className="time">{`${attachmentList.from_date} - ${attachmentList.to_date}`}</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="widget experience-widget">
                      <h4 className="widget-title">Attachments</h4>
                        {
                          (attachmentList.attachments)?
                          (attachmentList.attachments.length>0)?
                          (attachmentList.attachments.map(item=>{
                            return(
                              <Figure key={item.id} className="mr-3">
                                <Figure.Image
                                  width={171}
                                  height={180}
                                  alt="171x180"
                                  src={`http://joodya.com/crs/public/images/${item.image}`}
                                />
                              </Figure>
                            )
                          })) : <p>There are no attachments</p> : null
                        }
                    </div>
                  </Modal.Body>
                </Modal>

                {/*add modal*/}
                <Modal size="lg" show={activeModal === 'add'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Add Work</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmitAdd}>
                      <div className="form-group">
                        <label htmlFor="title">Work Title</label>
                        <input type="text" className="form-control" id="title" onChange={(e)=>setTitle(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <CKEditor
                          editor={ ClassicEditor }
                          onChange={(e, editor,)=>setDescription(editor.getData())}
                        />
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
                        {/* <label htmlFor="attachments">Attach files</label> */}
                        {/* <input type="file" multiple className="form-control" id="attachments" onChange={(e)=>setAttachments(e.target.files)} /> */}
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
                    <h5 className="modal-title">Edit Work</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmitEdit}>
                      <div className="form-group">
                        <label htmlFor="title">Work Title</label>
                        <input type="text" className="form-control" id="title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <CKEditor
                          editor={ ClassicEditor }
                          onChange={(e, editor,)=>setDescription(editor.getData())}
                          data={description}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>From</label>
                          <DatePicker
                            className="form-control"
                            selected={new Date(from_date)}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            onChange={(from_date)=>setFrom_date(from_date)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>To</label>
                          <DatePicker
                            className="form-control"
                            selected={new Date(to_date)}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            onChange={(to_date)=>setTo_date(to_date)}
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
                      <button type="button" className="btn bg-success-light mr-2" onClick={()=>{deleteWork(id);closeModal()}}> OK </button>
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

export default Education;