import React, {Component} from 'react';
import {IMG01} from '../img';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
// context
import {JobConsumer} from "../../../../context/jobs";

class RecentStories extends Component{
  render(){
    return(
      <div className="card post-widget">
        <div className="card-header">
          <h4 className="card-title">Recent Stories</h4>
        </div>
        <div className="card-body">
          <ul className="latest-posts">
            <JobConsumer>
              {(value)=>{ 
                const {successStories} = value;
                return successStories.map(user=>{
                  const {id, name, type, success_story, story_image} = user;
                  const storyUrl = story_image? `http://joodya.com/crs/public/images/${story_image}` : IMG01;
                  return(
                    <li key={id}>
                      <div className="post-thumb">
                        <Link to={`/success-stories/${id}`}>
                          <img className="img-fluid" src={storyUrl} alt="" />
                        </Link>
                      </div>
                      <div className="post-info">
                        <p><i className="fab fa-black-tie"></i> {type==="1"? "Employer" : "Employee"}</p>
                        <h4>
                          <Link to={`/success-stories/${id}`}>{ReactHtmlParser(success_story, node=>node.textContent)}</Link>
                        </h4>
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

export default RecentStories;