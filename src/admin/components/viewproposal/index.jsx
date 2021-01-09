import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";

function ViewProposal({proposal, activeModal, closeModal}) {
  console.log(proposal)
  const {status} = proposal;
  const statusName = status === "0"? "Penging Proposal" : status === "1"? "Accepted Proposal" : status === "2"? "selected Proposal" : "Rejected Proposal";

  return (
    <Modal size="lg" show={activeModal === 'coverLetter'} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Cover Letter</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="card">
          <div className="card-body">
            <div className="doctor-widget">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <img src={proposal.photoUrl} className="img-fluid" alt="User" />
                </div>
                <div className="doc-info-cont">
                  <h4 className="doc-name">{proposal.name}</h4>
                  {/* <h5 className="doc-department"><img src={categoryImgUrl} className="img-fluid" alt="Category" />{categoryName}</h5> */}
                  <ul className="entry-meta meta-item">
                    {/* <li><i className="fab fa-sketch"></i> {proposal.category? proposal.category.name : null}</li> */}
                    <li><i className="fas fa-sun"></i> {statusName}</li>
                    <li><i className="fas fa-birthday-cake"></i> {moment(proposal.birthDate).format("YYYY-MM-DD")}</li>
                    <li><i className="fas fa-map-marker-alt"></i> {proposal.country_id}</li>
                  </ul>
                </div>
              </div>
          </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {ReactHtmlParser(proposal.message)}
          </div>
        </div>
            
        <div className="card">
          <div className="card-body">

            <div className="widget education-widget">
              <h4 className="widget-title">Education</h4>
              <div className="experience-box">
                <ul className="experience-list">
                  {
                    proposal.educations && proposal.educations.map((item, index)=>{
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
                    proposal.works && proposal.works.map((item, index)=>{
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
                  proposal.languages && proposal.languages.map(item=>{
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
                  proposal.skills && proposal.skills.map(item=>{
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
      </Modal.Body>
    </Modal>
  )
}

export default ViewProposal

