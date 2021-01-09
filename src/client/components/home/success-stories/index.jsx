import React, { Component } from 'react';
import { IMG01, IMG02, IMG03, IMG04 } from '../img.jsx';
//slider
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import PageLoading from "../../loading/pageloading";
import {JobConsumer, JobContext} from "../../../context/jobs";
import ReactHtmlParser from 'react-html-parser';
class HomeSuccessStories extends Component{
  
  
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

    return(
      <section className="section section-doctor">
        <div className="container-fluid">

          <div className="section-header text-center">
            <h2>Success Stories</h2>
            {/* <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
          </div>
    
            <div className="doctor-slider slider">
            {<JobConsumer>
              {(value)=>{
                const {successStories, loading} = value;
                console.log(successStories);
                if (loading) {
                  return <PageLoading loading={loading} />
                }
                return (
                  <Slider {...settings}>
                    {successStories.map(user=>{
                      const {id, photo, name, type, success_story, story_image} = user;
                      const storyUrl = story_image? `http://joodya.com/crs/public/images/${story_image}` : IMG01;
                      const photoUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;
                      const subStory = success_story.substr(0, 30);
                      return(
                        <div key={id}>
                          <div className="blog grid-blog">
                        <div className="blog-image">
                            <Link to={`/success-stories/${id}`}><img className="img-fluid" src={storyUrl} alt="Post" /></Link>
                        </div>
                        <div className="blog-content">
                            <ul className="entry-meta meta-item">
                                <li>
                                    <div className="post-author">
                                        <Link to={`/success-stories/${id}`}><img src={photoUrl} alt="Post Author" />
                                          <span>{name}</span>
                                        </Link>
                                    </div>
                                </li>
                                <li><i className="fab fa-black-tie"></i> {type==="1"? "Employer" : "Employee"}</li>
                            </ul>
                            {/* <h3 className="blog-title">
                              <Link to="#">Doccure – Making your clinic painless visit?</Link>
                            </h3> */}
                            <p className="mb-0">{ReactHtmlParser(subStory, node=>node.textContent)}</p>
                        </div>
                    </div>
                        </div>
                      );
                    })}
                </Slider>
                ) 
              }}
            </JobConsumer>}
          </div>

          {/* <div className="view-all text-center"> 
            <a href="#0" className="btn btn-primary">View All</a>
          </div> */}
          
        </div>
      </section>
    );
  }
}

export default HomeSuccessStories;