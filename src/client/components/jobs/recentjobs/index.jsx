import React, {Component} from 'react';
import {IMG_blog_th01} from '../img.jsx';
import { Link } from 'react-router-dom';
import moment from "moment";
// context
import {JobConsumer} from "../../../context/jobs";

class RecentJobs extends Component{
  render(){
    return(
      <div className="card post-widget">
        <div className="card-header">
          <h4 className="card-title">Recent Jobs</h4>
        </div>
        <div className="card-body">
          <ul className="latest-posts">
            <JobConsumer>
              {(value)=>{ 
                const {categories, getSingleJob} = value;
                const {recentJobs} = categories;
                return recentJobs.map((job, index)=>{
                  const {id, image, title, created_at} = job;
                  const imageUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG_blog_th01;
                  return(
                    <li key={index}>
                      <div className="post-thumb">
                        <Link to={`/jobs/single-job/${id}`} onClick={()=>getSingleJob(id)}>
                          <img className="img-fluid" src={imageUrl} alt="" />
                        </Link>
                      </div>
                      <div className="post-info">
                        <h4>
                          <Link to={`/jobs/single-job/${id}`} onClick={()=>getSingleJob(id)}>{title}</Link>
                        </h4>
                        <p>{moment(created_at).format("YYYY-MM-DD")}</p>
                      </div>
                    </li>
                  )
                })
              }}
            </JobConsumer>
          </ul>
        </div>
      </div>
    );
  }
}

export default RecentJobs;