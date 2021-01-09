import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
//images
import { IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07} from './img.jsx';
//components
import RecentStories from './recentstories';
import {JobContext} from "../../../context/jobs";
import ReactHtmlParser from 'react-html-parser';
  
function SuccessStory() {

  const { id } = useParams();
  const { successStories } = useContext(JobContext);
  const story = successStories.find((item) => {
    return item.id === parseInt(id);
  });
  console.log(story);
  const {photo, name, type, success_story, story_image} = story;
  const storyUrl = story_image? `http://joodya.com/crs/public/images/${story_image}` : IMG01;
  const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;

  return (
    <>   
      <div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">Success Stories</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Success Stories</h2>
						</div>
					</div>
				</div>
			</div>
      <div className="content">
        <div className="container">
      
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-view">
                <div className="blog blog-single-post">
                  <div className="blog-image">
                    <Link to ="#"><img alt="" src={storyUrl} className="img-fluid" /></Link>
                  </div>
                  {/* <h3 className="blog-title">Doccure – Making your clinic painless visit?</h3> */}
                  <div className="blog-info clearfix">
                    <div className="post-left">
                      <ul>
                        <li>
                          <div className="post-author">
                            <Link to="/patient/doctor-profile"><img src={photoUrl} alt="Post Author" />
                              <span>{name}</span>
                            </Link>
                          </div>
                        </li>
                        <li><i className="fab fa-black-tie"></i> {type==="1"? "Employer" : "Employee"}</li>
                        {/* <li><i className="far fa-calendar"></i>4 Dec 2019</li>
                        <li><i className="fa fa-tags"></i>Health Tips</li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="blog-content">
                    <article>{ReactHtmlParser(success_story)}</article>
                  </div>
                </div>
              
                <div className="card blog-share clearfix">
                  <div className="card-header">
                    <h4 className="card-title">Share the post</h4>
                  </div>
                  <div className="card-body">
                    <ul className="social-share">
                      <li><Link to ="#" title="Facebook"><i className="fab fa-facebook"></i></Link></li>
                      <li><Link to ="#" title="Twitter"><i className="fab fa-twitter"></i></Link></li>
                      <li><Link to ="#" title="Linkedin"><i className="fab fa-linkedin"></i></Link></li>
                      <li><Link to ="#" title="Google Plus"><i className="fab fa-google-plus"></i></Link></li>
                      <li><Link to ="#" title="Youtube"><i className="fab fa-youtube"></i></Link></li>
                    </ul>
                  </div>
                </div>
              
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <RecentStories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessStory;