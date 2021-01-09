import React, { Component } from 'react';
import HomeSearch from './search';
import HomeCategories from './categories';
import HomeRecentJobs from './recentjobs';
import HomeSuccessStories from './success-stories';

class Home extends Component{
    render(){
        return(
        <div>
            <div className="main-wrapper">
                <HomeSearch />
                <HomeCategories />
                <HomeRecentJobs />
                <HomeSuccessStories />
            </div>
        </div>
    );
    }
}

export default Home;