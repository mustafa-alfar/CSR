import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// context
import {JobConsumer} from "../../../context/jobs";

class SubCategories extends Component{
  render(){
    return(
      <JobConsumer>
        {(value)=>{ 
          const {categories, getCategoriesJobs} = value;
          const {categoryName, subCategories} = categories;
          return (
            <div className="card category-widget">
              <div className="card-header">
                  <h4 className="card-title">{categoryName} Sub Categories</h4>
              </div>
              <div className="card-body">
                <ul className="categories">
                  {
                    subCategories.map((subCategory, index)=>{
                      const {id, name} = subCategory;
                        return (
                          <li key={index}>
                            <Link to="/jobs" onClick={() =>getCategoriesJobs(id, name, "sub")}>{name}</Link>
                          </li>
                        )
                      })                        
                    }
                </ul>
              </div>
            </div>
          )
        }}
      </JobConsumer>
    );
  }
}

export default SubCategories;