import React, {Component} from 'react';
// context
import {JobConsumer} from "../../../context/jobs";

class JobSearch extends Component{
  state={
    keyword: "",
  }
  
  render(){
    return(
      <>
        <JobConsumer>
          {(value)=>{ 
            const {getCategoriesJobs} = value;
            return (
              <div className="card search-widget">
                <div className="card-body">
                  <form className="search-form">
                    <div className="input-group">
                        <input type="text" placeholder="Search..." className="form-control"
                          onChange={(e)=>this.setState({keyword: e.target.value})}
                          onKeyUp={()=>getCategoriesJobs(this.state.keyword)}
                        />
                        <div className="input-group-append">
                            <button 
                              type="submit"
                              className="btn btn-primary"
                              onClick={(e)=>{
                                e.preventDefault();
                                getCategoriesJobs(this.state.keyword);
                              }}
                            >
                              <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            )
          }}
        </JobConsumer>
      </>
    );
  }
}
export default JobSearch;