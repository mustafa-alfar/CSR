import React, {Component, createContext} from 'react';
import axios from "axios";
import history from "../../history";
// Importing toastify module 
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method,  
 // it is compulsory method. 
toast.configure()

// context
const JobContext = createContext();

// provider
class JobProvider extends Component {
    state = {
        url: "https://joodya.com/crs/api/v1",
        categories: {
            categoriesList: [],
            recentJobs: [],
            categoryJobs: [],
            subCategories: []
        },
        singleJob: {},
        successStories: [],
        loading: false,
    }
    
    componentDidMount = () => {
        this.getCategoriesJobs();
        this.getSuccessStories();
    }

    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            return { Authorization: `Bearer ${user.token}` };
        } else {
            // redirect to login page
            return {};
        }
    }

    // get categories jobs
    getCategoriesJobs = async (catVal, catName, catType) => {
        this.setState({loading: true});
        let category_id, sub_category, keyword;
        if(typeof(catVal) === "number"){
            catType === "sub"? sub_category = catVal : category_id = catVal;
        }else{
            keyword = catVal
        }
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/all_jobs`,
            data: {category_id, sub_category, keyword},
        }).then(
            res => {
                const {data, categories, recent_jobs, tags} = res.data;
                const categoryJobs = data.data;
                const subCategories = category_id? categories.find(cntry => cntry.id == category_id).sub_category : []
                this.setState({
                    categories: {
                        categoriesList: categories,
                        recentJobs: recent_jobs,
                        tags,
                        categoryJobs,
                        categoryName: catName? catName : "",
                        categoryType: catType,
                        subCategories
                    }
                });
                const categoriesStorage = {categoriesList: categories, recentJobs: recent_jobs, tags, categoryJobs}
                localStorage.setItem("categories", JSON.stringify(categoriesStorage));
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    };
    // get storage categories jobs
    getStorageCategoriesJobs = () => {
        return localStorage.getItem("categories")
        ? JSON.parse(localStorage.getItem("categories"))
        : {};
    };

    getSingleJob = async (id) => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/get_job`,
            data: {"job_id": id},
        }).then(
            res => {
                const {data} = res.data;
                const singleJob = data;
                this.setState({singleJob});
                // history.push("/jobs/single-job");
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    };

    setProposalJob = async (id, coverLetter) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/send_proposal`,
            headers: this.authHeader(),
            data: {"job_id": id, "message": coverLetter},
        }).then(
            res => {
                toast.success('Success Post Proposal', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getSuccessStories = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/success_story`,
        }).then(
            res => {
                const {data} = res.data;
                const successStories = data;
                this.setState({successStories});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    };

    render() {
        return (
            <JobContext.Provider value={{
                ...this.state,
                getCategoriesJobs: this.getCategoriesJobs,
                getSingleJob: this.getSingleJob,
                setProposalJob: this.setProposalJob,
                getSuccessStories: this.getSuccessStories,
            }}>
                {this.props.children}
            </JobContext.Provider>
        )
    }
}

// consumer
const JobConsumer = JobContext.Consumer;

export {JobConsumer, JobContext};
export default JobProvider;