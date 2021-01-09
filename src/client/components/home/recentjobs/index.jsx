import React, { Component } from 'react';
import { IMG01 } from '../img.jsx';
import { Link } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
// slider
import Slider from "react-slick";
// context
import {JobConsumer, JobContext} from "../../../context/jobs";
// react CKEditor text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// ReactHtmlParser
import ReactHtmlParser from 'react-html-parser';
// moment
import moment from "moment";
import PageLoading from "../../loading/pageloading";

class HomeBookDoctor extends Component{

  state = {
    show: false,
    disabled: null,
    titleText: "",
    coverLetter: "",
    jobTitle: "",
    jobId: 0,
    isEmployee: false,
    isPosted: false,
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.type == 1) {
      this.setState({
        disabled: true,
        titleText: "You should post as an employee only"
      });
    }
  }

  // handleSingleJob = async (id) => {
  //   await this.context.getSingleJob(id);
  //   this.props.history.push(`/jobs/single-job/${id}`);
  // }

  postedSend = () => {
    if (this.state.isPosted) {
      this.setState({disabled: true});
    }
  }

  handleClose = () => {
    this.setState({
      show:false
    });
  }

  handleShow = (id, title) => {
    this.checkUserMember();
    this.setState({
      show: true,
      jobId: id,
      jobTitle: title
    });
  }

  checkUserMember = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.type == 2){
      this.setState({
        isEmployee: true,
      });
    } else {
      this.setState({
        isEmployee: false,
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {jobId, coverLetter} = this.state;
    const {setProposalJob} = this.context;
    const isEmpty = !coverLetter;
    if(isEmpty){
        return false;
    }else{
      await setProposalJob(jobId, coverLetter);
      this.handleClose();
    }
  }

  render(){
    const settings = {
      width:400,
      dots:false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      centerPadding: '10px',
      arrows: true,
      centerMode: true,
      responsive: [
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          }
        }
      ]
    };

    return (
      <section className="section section-doctor">
        <div className="container-fluid">
          <div className="section-header text-center">
            <h2>Recent Jobs</h2>
            {/* <p>Lorem Ipsum is simply dummy text </p> */}
          </div>
          <div className="doctor-slider slider">
            {
              <JobConsumer>
              {(value)=>{
                const {categories: {recentJobs}, getCategoriesJobs, getSingleJob, loading} = value;
                if (loading) {
                  return <PageLoading loading={loading} />
                }
                return (
                  <Slider {...settings}>
                    {
                      recentJobs.map((job)=>{
                        const {id, image, title, details, category: {...category}, employer: {...employer}, created_at, finish_at} = job;
                        const {id: categoryId, name: categoryName, image: categoryImg} = category;
                        const {name: employerName} = employer;
                        // job.posted? this.postedSend : false;
                        // const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
                        const categoryImgUrl = categoryImg? `http://joodya.com/crs/public/images/${categoryImg}` : IMG01;
                        const subDetails = details.substr(0, 100);
                        // {ReactHtmlParser(subDetails, node=>node.textContent)}
                        return(
                          <div key={id}>
                            <div className="profile-widget">
                              <div className="pro-content">
                                <h3 className="title">
                                  <Link to="/patient/doctor-profile">{title}</Link>
                                </h3>
                                <p className="speciality">{subDetails}</p>
                                <h5 className="doc-department"><Link to="/jobs" onClick={()=>getCategoriesJobs(categoryId)}><img src={categoryImgUrl} className="img-fluid" alt="Category" />{categoryName}</Link></h5>
                                <ul className="available-info">
                                  <li><i className="fab fa-black-tie"></i> By {employerName}</li>
                                  <li><i className="fas fa-hourglass-start"></i> {moment(created_at).format("YYYY-MM-DD")}</li>
                                  <li><i className="fas fa-hourglass-end"></i> {moment(finish_at).format("YYYY-MM-DD")}</li>
                                </ul>
                                <div className="row row-sm">
                                  <div className="col-6">
                                    <Link to={`/jobs/single-job/${id}`} className="btn view-btn w-100" onClick={()=>getSingleJob(id)}>View Details</Link>
                                  </div>
                                  <div className="col-6">
                                    <button title={this.state.titleText} className="btn book-btn w-100" disabled={this.state.disabled} onClick={()=>this.handleShow(id, title)}>Post Proposal</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </Slider>
                )
              }}
              </JobConsumer>
            }

            <div className="view-all text-center">
              <Link to="/jobs" onClick={()=>this.context.getCategoriesJobs()} className="btn btn-primary">View All</Link>
            </div>

            {/*view modal*/}
            <Modal size="lg" show={this.state.show} onHide={this.handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>{this.state.jobTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.isEmployee
                  ? <form>
                      <div className="form-group">
                        <label>Cover Letter</label>
                        <CKEditor
                          editor={ ClassicEditor }
                          onChange={(e, editor)=>this.setState({coverLetter: editor.getData()})}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mr-2"onClick={(e)=>this.handleSubmit(e)}>Send</button>
                      <button type="button" className="btn btn-light" onClick={()=>this.handleClose()}>Cancel</button>
                    </form>
                  : <>
                      <p>You must be logged in to make a proposal</p>
                      <Link to="/login" className="btn btn-primary mr-2">Login</Link>
                      <button type="button" className="btn btn-light" onClick={()=>this.handleClose()}>Cancel</button>
                    </>
                }
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </section>
    );
  }
}

HomeBookDoctor.contextType = JobContext
export default HomeBookDoctor;