import React, {Component} from 'react';
import {JobConsumer} from "../../../context/jobs";

class TagsWidget extends Component{
  render(){
    return(
      <div className="card tags-widget">
        <div className="card-header">
          <h4 className="card-title">Tags</h4>
        </div>
        <div className="card-body">
          <ul className="tags">
            <JobConsumer>
              {(value)=>{ 
                const {categories, getCategoriesJobs} = value;
                const {tags} =  categories;
                return tags.map((tag, index)=>{
                  const {name} = tag;
                  return (
                    <li key={index}>
                      <button onClick={()=>getCategoriesJobs(name)} className="tag">{name}</button>
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

export default TagsWidget;