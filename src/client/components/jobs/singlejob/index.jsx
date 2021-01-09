import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
import { IMG01 } from '../img.jsx';
// context
import { JobConsumer, JobContext } from "../../../context/jobs";
// react CKEditor text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";
import PageLoading from "../../loading/pageloading"

function SingleJob () {

  // context values
  const {getSingleJob, singleJob, setProposalJob, loading} = useContext(JobContext);
  const {id, image, title, category: {...category}, employer: {...employer}, created_at, finish_at, details, requirements, responsibility} = singleJob;
  const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;

  // state values
  const [coverLetter, setCoverLetter] = useState("");
  const [disabled, setDisabled] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  
  const pageId = useParams().id;

  useEffect(() => {
    getSingleJob(pageId);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.type === "1") {
      setDisabled(true);
      setTitleText("You should post as an employee only");
    }
  }, [])

  const checkUserMember = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.type === "2"){
        setIsEmployee(true);
        openModal('postProposal');
    } else {
      setIsEmployee(false);
      openModal('postProposal');
    }
  }

  const openModal = (id) => {
	  setActiveModal(id);
  }
  
	const closeModal = () => {
		setActiveModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = !coverLetter;
    if(isEmpty){
        return false;
    }else{
      await setProposalJob(id, coverLetter);
      closeModal();
    }
  }

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Job Details</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Job Details</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">

          {
            loading? <PageLoading loading={loading} /> :
            <>
            <div className="card">
              <div className="card-body">
                <div className="doctor-widget">
                  <div className="doc-info-left">
                    <div className="doctor-img">
                      <img src={imageUrl} className="img-fluid" alt="User" />
                    </div>
                    <div className="doc-info-cont">
                      <h4 className="doc-name">{title}</h4>
                      <div className="clini-infos mb-0">
                        <ul>
                          <li><i className="fab fa-sketch"></i> {category.name}</li>
                          <li><i className="fab fa-black-tie"></i> By {employer.name}</li>
                          <li><i className="fas fa-hourglass-start"></i> {moment(created_at).format("YYYY-MM-DD")}</li>
                          <li><i className="fas fa-hourglass-end"></i> {moment(finish_at).format("YYYY-MM-DD")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="doc-info-right">
                    <div className="clinic-booking">
                      <div className="clinic-booking">
                        <button title={titleText} className="apt-btn" disabled={disabled} onClick={checkUserMember}>Post Proposal</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                
                <div className="row">
                  <div className="col-md-12 col-lg-9">

                    <div className="widget about-widget">
                      <h4 className="widget-title">Description</h4>
                      <article>{ReactHtmlParser(details)}</article>
                    </div>

                    <div className="widget education-widget">
                      <h4 className="widget-title">Requirements</h4>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {
                            (requirements && requirements.length>0)? requirements.map((item, index)=>{
                              return (
                                <li key={index}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>{item}</p>
                                    </div>
                                  </div>
                                </li>
                              )
                            }) : null
                          }
                        </ul>
                      </div>
                    </div>

                    <div className="widget experience-widget">
                      <h4 className="widget-title">Responsibilities</h4>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {
                            (responsibility && responsibility.length>0)? responsibility.map((item, index)=>{
                              return (
                                <li key={index}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p>{item}</p>
                                    </div>
                                  </div>
                                </li>
                              )
                            }) : null
                          }
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                  
              </div>
            </div>
            </>
          }
          {/*view modal*/}
          <Modal size="lg" show={activeModal === "postProposal"} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                isEmployee? 
                  <form>
                    <div className="form-group">
                      <label>Cover Letter</label>
                      <CKEditor
                      editor={ ClassicEditor }
                      onChange={(e, editor)=>setCoverLetter(editor.getData())}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2"onClick={(e)=>handleSubmit(e)}>Send</button>
                    <button type="button" className="btn btn-light" onClick={closeModal}>Cancel</button>
                  </form>
                : 
                  <>
                    <p>You must be logged in to make a proposal</p>
                    <Link to="/login" className="btn btn-primary mr-2">Login</Link>
                    <button type="button" className="btn btn-light" onClick={closeModal}>Cancel</button>
                  </>
              } 
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </>
  );
}

export default SingleJob;