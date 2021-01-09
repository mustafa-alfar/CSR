import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { JobContext } from "../../../context/jobs";
import history from "../../../../history";

class homeSearch extends Component{
  state={
    keyword: "",
  }

  handleSearchJob = (e) => {
    e.preventDefault();
    this.context.getCategoriesJobs(this.state.keyword)
    history.push('/jobs');
  }

  render(){
    return(
      <section className="section section-search">
        <div className="container-fluid">
          <div className="banner-wrapper">

            <div className="banner-header text-center">
              <h1>Find your dream job in nursing & healthcare sector</h1>
              <p>Discover job offers & employers that suit you exactly and apply with your profile. You can also use the opportunity to be found and contacted by employers.</p>
            </div>
            <div className="search-box">
              <form>
                <div className="form-group search-info">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Find Job"
                    onChange={(e)=>this.setState({keyword: e.target.value})}
                  />
                  <span className="form-text">Ex : Surgical Assistant or Dentist etc</span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary search-btn"
                  onClick={(e)=>this.handleSearchJob(e)}
                >  
                  <FontAwesomeIcon icon={faSearch} /> <span>Search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

homeSearch.contextType = JobContext;
export default homeSearch;
	
    