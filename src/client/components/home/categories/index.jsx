import React, { Component } from 'react';
import { IMG01 } from '../img.jsx';
import { Link } from 'react-router-dom';
//slider
import Slider from "react-slick";
// context
import {JobConsumer} from "../../../context/jobs";
import PageLoading from "../../loading/pageloading";

class HomeCategories extends Component{
  render(){
    const settings = {
      dots:true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerPadding: '10px',
      arrows: true,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 3000,
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
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              
            }
        }
      ]
    };

    return(
      <>
        <section className="section section-specialities">
          <div className="container-fluid">

            <div className="section-header text-center">
              <h2>Categories</h2>
              {/* <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
            </div>

            <div className="row justify-content-center">
              <div className="col-md-9">
            
                <div className="specialities-slider slider">
                
                  <JobConsumer>
                    {(value)=>{ 
                      const {categories: {categoriesList}, getCategoriesJobs, loading} = value;
                      if (loading) {
                        return <PageLoading loading={loading} />
                      }
                      return (
                        <Slider {...settings}>
                          {categoriesList.map(category=>{
                            const {image, id, name, jobs_count} = category;
                            const categoryImgUrl = image? `http://joodya.com/crs/public/images/${image}` : IMG01;
                            return (
                              <div key={id}>
                                <div className="speicality-item text-center">
                                  <Link to="/jobs" onClick={()=>getCategoriesJobs(id, name)}>
                                    <div className="speicality-img mx-auto">
                                      <img loading="lazy" src={categoryImgUrl} className="img-fluid" alt="Speciality" />
                                      <span><i className="fa fa-circle" aria-hidden="true"></i></span>
                                    </div>
                                  </Link>
                                  <p>{name}</p>
                                  <span>Jobs ({jobs_count})</span>
                                </div>	
                              </div>
                            )
                          })}
                        </Slider>
                      )
                    }}
                  </JobConsumer>

                </div>

              </div>
            </div>

          </div>   
        </section>
      </>	 
    );
  }
}

export default HomeCategories;