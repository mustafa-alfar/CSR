import React , { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";
import {UserContext} from "../../../context/user";
import {EmployeeContext} from "../../../context/employee";
import IMG01 from "../../../assets/images/patient.jpg"
// react CKEditor text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ViewProposal({proposal, isEdit, activeModal, closeModal, setIsEdit}) {

  const {user} = useContext(UserContext);
  const {setProposalJob, getProposals} = useContext(EmployeeContext);
  const {photo, name, birthDate, country_id, educations, works, languages, skills} = user;
  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
  const {message, status, editable, job} = proposal;
  const statusName = status === "0"? "Penging Proposal" : status === "1"? "Accepted Proposal" : status === "2"? "selected Proposal" : "Rejected Proposal";
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await setProposalJob(job.id, coverLetter);
    getProposals();
    closeModal();
  }

  return (
    <Modal size="lg" show={activeModal === 'coverLetter'} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Cover Letter</h5>
      </Modal.Header>
      <Modal.Body>
        {!isEdit && <>
        <div className="card">
          <div className="card-body">
            <div className="doctor-widget">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <img src={photoUrl} className="img-fluid" alt="User" />
                </div>
                <div className="doc-info-cont">
                  <h4 className="doc-name">{name}</h4>
                  {/* <h5 className="doc-department"><img src={categoryImgUrl} className="img-fluid" alt="Category" />{categoryName}</h5> */}
                  <ul className="entry-meta meta-item">
                    {/* <li><i className="fab fa-sketch"></i> {category? category.name : null}</li> */}
                    <li><i className="fas fa-sun"></i> {statusName}</li>
                    <li><i className="fas fa-birthday-cake"></i> {moment(birthDate).format("YYYY-MM-DD")}</li>
                    <li><i className="fas fa-map-marker-alt"></i> {country_id}</li>
                  </ul>
                </div>
              </div>
              <div className="doc-info-right">
                {
                  editable==="1" && <button className="btn btn-sm bg-success-light float-right" onClick={()=>setIsEdit(true)}><i className="fe fe-pencil"></i></button>
                }
              </div>
          </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {ReactHtmlParser(message)}
          </div>
        </div>
            
        <div className="card">
          <div className="card-body">

            <div className="widget education-widget">
              <h4 className="widget-title">Educations</h4>
              <div className="experience-box">
                <ul className="experience-list">
                  {
                    educations && educations.map((item, index)=>{
                      return (
                        <li key={index}>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                                <p>{`${item.title} in ${item.specialization}`}</p>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

            <div className="widget experience-widget">
              <h4 className="widget-title">Work & Experience</h4>
              <div className="experience-box">
                <ul className="experience-list">
                  {
                    works && works.map((item, index)=>{
                      return (
                        <li key={index}>
                          <div className="experience-user">
                            <div className="before-circle"></div>
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <p>{`${item.months} month as ${item.title}`}</p>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

            <div className="service-list">
              <h4>Languages</h4>
              <ul className="clearfix">
                {
                  languages && languages.map(item=>{
                    return(
                      <li key={item.id}>
                        {`${item.name} (${item.level})`}
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className="service-list">
              <h4>Skills</h4>
              <ul className="clearfix">
                {
                  skills && skills.map(item=>{
                    return(
                      <li key={item.id}>
                        {item.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>

          </div>
        </div>
        </>}
        {isEdit && 
          <form onSubmit={handleSubmitEdit}>
            <div className="form-group">
              <label>Cover Letter for {job.title} Job</label>
              <CKEditor
                editor={ ClassicEditor }
                onChange={(e, editor,)=>setCoverLetter(editor.getData())}
                data={message}
              />
            </div>
            <button className="btn btn-primary mr-2" type="submit">Edit</button>
            <button className="btn bg-info-light" onClick={closeModal} type="button">Cancel</button>
          </form>
        }
      </Modal.Body>
    </Modal>
  )
}

export default ViewProposal

