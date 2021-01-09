import React, {Component, createContext} from 'react';
import axios from "axios";
import history from "../../history";
// Importing toastify module 
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method,  
// it is compulsory method. 
toast.configure();

// context
const AdminContext = createContext();

// provider
class AdminProvider extends Component {
    state = {
        url: "https://joodya.com/crs/api/v1",
        jobs: [],
        singleJob: "",
        jobStatus: "",
        employers: [],
        employerActive: "",
        singleEmployer: {},
        employees: [],
        proposals: [],
        categories: [],
        subCategories: [],
        EmployeeProfile: {
            info: {},
            proposals: {}
        },
        EmployerProfile: {
            info: {},
            jobs: {}
        },
        loading: false,
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

    userLogout = () => {
        localStorage.removeItem("user");
        window.open('/login', '_self');
    };

    getJobs = async (status) => {
        this.setState({loading: true});
        if(status==="0"){
            status = JSON.stringify(status);
        }
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/all_jobs`,
            headers: this.authHeader(),
            data: {status},
        }).then(
            res => {
                const {data} = res.data;
                const jobs = data;
                this.setState({jobs})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    getSingleJob = async (job_id) => {
        this.setState({loading: true, jobStatus: ""});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/get_job`,
            headers: this.authHeader(),
            data: {job_id},
        }).then(
            res => {
                const {data} = res.data;
                const singleJob = data;
                this.setState({singleJob})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    completeJob = async (id) => {
        console.log("Complete Job", id);
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/complete_job`,
            headers: this.authHeader(),
            data: {"job_id": id},
        }).then(
            res => {
                const {data, job_status} = res.data;
                this.setState({jobStatus: job_status});
                toast.success('Success Complete Job', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getEmployers = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/get_employers`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const employers = data;
                this.setState({employers})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    activateEmployer = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/activate_user`,
            headers: this.authHeader(),
            data: {"user_id": id},
        }).then(
            res => {
                const {data, active} = res.data;
                this.setState({
                    employers: data,
                    employerActive: active
                });
                toast.success('Success Activate Employer', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    deactivateEmployer = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/deactivate_user`,
            headers: this.authHeader(),
            data: {"user_id": id},
        }).then(
            res => {
                const {data, active} = res.data;
                this.setState({
                    employers: data,
                    employerActive: active
                });
                toast.success('Success Deactivate_user Employer', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getEmployerJobs = async (employer_id) => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/get_employers`,
            headers: this.authHeader(),
            data: {employer_id},
        }).then(
            res => {
                const {data, jobs} = res.data;
                const employerInfo = data;
                this.setState({
                    singleEmployer: {
                        employerInfo,
                        jobs
                    }
                })
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }


    getEmployees = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/get_employees`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const employees = data;
                this.setState({employees})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    getProposalsJob = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/proposals`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const proposals = data;
                this.setState({proposals})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    getEmployeeProfile = async (id) => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/get_employees`,
            headers: this.authHeader(),
            data: {"employee_id": id}
        }).then(
            res => {
                const {data, prposals} = res.data;
                this.setState({
                    EmployeeProfile: {
                        info: data,
                        proposals: prposals
                    }
                })
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    getEmployerProfile = async (id) => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/get_employers`,
            headers: this.authHeader(),
            data: {"employer_id": id}
        }).then(
            res => {
                const {data, jobs} = res.data;
                this.setState({
                    EmployerProfile: {
                        info: data,
                        jobs
                    }
                })
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    // categories

    getCategories = async () => {
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/categories`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const categories = data;
                this.setState({categories});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    addCategory = async ({name, parent, image}) => {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("parent", parent);
        fd.append("image", image);
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/add_category`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                const {data} = res.data;
                const categories = data;
                this.setState({categories});
                toast.success('Success Add Category', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    updateCategory = async ({id, name, parent, image}) => {
        const fd = new FormData();
        fd.append("category_id", id);
        fd.append("name", name);
        fd.append("parent", parent);
        fd.append("image", image);
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/update_category`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                const {data} = res.data;
                const categories = data;
                this.setState({categories});
                toast.success('Success Add Category', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteCategory = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/delete_category`,
            headers: this.authHeader(),
            data: {"category_id": id},
        }).then(
            res => {
                const {data} = res.data;
                const categories = data;
                this.setState({categories});
                toast.success('Success Delete Category', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getSubCategories = async (id) => {
        if(this.state.categories.length===0){
            await this.getCategories();
        };
        const subCategories = this.state.categories.find(cntry => cntry.id == id).sub_category;
        this.setState({subCategories})
    }

    setSuccessStory = async (id, successStory, storyImage) => {
        const fd = new FormData();
        fd.append("user_id", id);
        fd.append("success_story", successStory);
        fd.append("story_image", storyImage);
        await axios({
            method: 'post',
            url: `${this.state.url}/admin/update_story`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                toast.success('Success Save Story', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }
     
    render() {
        return (
            <AdminContext.Provider value={{
                ...this.state,
                userLogout: this.userLogout,

                getJobs: this.getJobs,
                getSingleJob: this.getSingleJob,
                getProposalsJob: this.getProposalsJob,
                getEmployers: this.getEmployers,

                getEmployerJobs: this.getEmployerJobs,
                activateEmployer: this.activateEmployer,
                deactivateEmployer: this.deactivateEmployer,
                getEmployerProfile: this.getEmployerProfile,

                getEmployees: this.getEmployees,
                getEmployeeProfile: this.getEmployeeProfile,

                completeJob: this.completeJob,

                getCategories: this.getCategories,
                getSubCategories: this.getSubCategories,
                addCategory: this.addCategory,
                updateCategory: this.updateCategory,
                deleteCategory: this.deleteCategory,

                setSuccessStory: this.setSuccessStory,
            }}>
                {this.props.children}
            </AdminContext.Provider>
        )
    }
}

// consumer
const AdminConsumer = AdminContext.Consumer;

export {AdminConsumer, AdminContext};
export default AdminProvider;
