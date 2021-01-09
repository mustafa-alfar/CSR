import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// context
import {JobConsumer} from "../../../context/jobs";

class JobsCategories extends Component{
  render(){
    return(
      <div className="card category-widget">
        <div className="card-header">
            <h4 className="card-title">Jobs Categories</h4>
        </div>
        <div className="card-body">
          <ul className="categories">
            <JobConsumer>
              {(value)=>{ 
                const {categories, getCategoriesJobs} = value;
                const {categoriesList} = categories;
                return categoriesList.map((category, index)=>{
                  const {id, name} = category;
                  return (
                    <li key={index}><Link to="/jobs" onClick={() =>getCategoriesJobs(id, name)}>{category.name} <span>({category.jobs_count})</span></Link></li>
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

export default JobsCategories;