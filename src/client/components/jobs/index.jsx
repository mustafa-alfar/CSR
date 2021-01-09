import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
//images
import { IMG01} from './img.jsx';
//components
import JobSearch from './search';
import SubCategories from './subcategories';
import RecentJobs from './recentjobs';
import JobsCategories from './jobscategories';
import TagsWidget from './tagswidget';
// react CKEditor text editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// context
import {JobConsumer, JobContext} from "../../context/jobs";
import ReactHtmlParser, {convertNodeToElement} from 'react-html-parser';
import moment from "moment";
import PageLoading from "../loading/pageloading";

class JobsList extends Component{

  state = {
    show: false,
    disabled: null,
    titleText: "",
    coverLetter: "",
    jobTitle: "",
    jobId: "",
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

  handleSingleJob = async (id) => {
    const {getSingleJob} = this.context;
    await getSingleJob(id);
    this.props.history.push(`/jobs/single-job/${id}`);
  }

  handleClose = () => {
      this.setState({
        show:false
    });
  }

  checkUserMember = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.setState({
        isEmployee: true,
      });
    } else {
      this.setState({
        isEmployee: false,
      });
    }
  }

  handleShow = (id, title) => {
    this.checkUserMember();
    this.setState({
      show: true,
      jobId: id,
      jobTitle: title
    });
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

  transform = (node) => {
    node.name = 'span';
    return convertNodeToElement(node);
  }

  render(){
  const transform = this.transform;
  const {categoryName, categoryType} = this.context.categories;

    return(
      <div>
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Jobs</li>
                    {categoryName && 
                      <li className="breadcrumb-item active" aria-current="page">{categoryName}</li>
                    }
                  </ol>
                </nav>
                {categoryName?
                  <h2 className="breadcrumb-title">{categoryName}</h2> :
                  <h2 className="breadcrumb-title">Jobs</h2>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="content">
				  <div className="container">
            <div className="row">

              <div className="col-lg-8 col-md-12">
                <JobConsumer>
                  {(value)=>{ 
                    const {categories, getSingleJob, loading} = value;
                    const {categoryJobs} = categories;
                    if (loading) {
                      return <PageLoading />
                    }
                    return (categoryJobs && categoryJobs.length>0)? (categoryJobs.map((job, index)=>{
                      const {image, id, title, details, category: {...category}, employer: {...employer}, created_at, finish_at} = job;
                      const finishAt = (!finish_at || finish_at === "0000-00-00 00:00:00")? new Date() : new Date(finish_at);
                      const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
                      return (
                        <div key={index} className="card">
                          <div className="card-body">
                            <div className="booking-doc-info">
                              <Link to="#" className="booking-doc-img" onClick={()=>this.handleSingleJob(id)}>
                                <img src={imageUrl} alt="User" />
                              </Link>
                              <div className="booking-info">
                                <h4><Link onClick={()=>this.handleSingleJob(id)}>{title}</Link></h4>
                                <p className="mb-2">{ReactHtmlParser(details, {transform})}</p>
                                <ul className="entry-meta meta-item">
                                  <li><i className="fab fa-sketch"></i> {category.name}</li>
                                  <li><i className="fab fa-black-tie"></i> By {employer.name}</li>
                                  <li><i className="fas fa-hourglass-start"></i> {moment(created_at).format("YYYY-MM-DD")}</li>
                                  <li><i className="fas fa-hourglass-end"></i> {moment(finishAt).format("YYYY-MM-DD")}</li>
                                  <li title={this.state.titleText}>
                                    <Link to="#" className="text-info" disabled={this.state.disabled} onClick={()=>this.handleShow(id, title)}>
                                      <i className="fas fa-file-signature"></i> Post Proposal
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })) : (
                      <div className="appointment-list text-center">
                        <div className="alert mb-0" >
                          No results for this search
                        </div>
                      </div>
                    )
                  }}
                </JobConsumer>

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
                          <button type="button" className="btn btn-primary" onClick={()=>this.handleClose()}>Cancel</button>
                        </form>
                      : <>
                          <p>You must be logged in to make a proposal</p>
                          <Link to="/login" className="btn btn-primary mr-2">Login</Link>
                          <button type="button" className="btn btn-primary" onClick={()=>this.handleClose()}>Cancel</button>
                        </>
                    } 
                  </Modal.Body>
                </Modal>

              </div>

              <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                <JobSearch />
                {!categoryType && <SubCategories />}
                <RecentJobs />
                <JobsCategories/>
                <TagsWidget />
              </div>

              </div>
            </div>
          </div>

        </div>
      );
    }
  }

JobsList.contextType = JobContext
export default JobsList;