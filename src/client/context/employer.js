import React, {Component, createContext} from 'react';
import axios from "axios";
import history from "../../history";
import {UserContext} from "./user";
// Importing toastify module 
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// context
const EmployerContext = createContext();

// provider
class EmployerProvider extends Component {

    state = {
        url: "https://joodya.com/crs/api/v1",
        profile: {
            countries: [],
            employeeInfo: {},
        },
        categoriesListToken: [],
        employerJobs: [],
        job: {},
        proposals: {},
        jobStatus: "",
        lastProposals: [],
        total: {
            totalJobs: 0,
            totalProposals: 0,
            totalCompletedJobs: 0,
        },
        myEmployees: [],
        myEmployeeProfile: {},
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

    getProfile = async () => {
        this.setState({loading: true});
        await axios({
            method: 'get',
            url: `${this.state.url}/employee/get_profile`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {categories, countries, data} = res.data;
                this.setState({profile: {
                    categories,
                    countries,
                    employeeInfo: data,
                }})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    setProfile = async ({photo, name, birthDate, email, mobile, country, address, city, state, zipCode}) => {
        const fd = new FormData();
        fd.append("photo", photo);
        fd.append("name", name);
        fd.append("birthDate", birthDate);
        fd.append("email", email);
        fd.append("mobile", mobile);
        fd.append("country_id", country);
        fd.append("address", address);
        fd.append("city", city);
        fd.append("state", state);
        fd.append("zipCode", zipCode);

        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/set_profile`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            async res => {
                await this.getProfile();
                const {userRefresh} = this.context;
                userRefresh(this.state.profile.employeeInfo);
                toast.success('Success saved chenged', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }
    
    getCategoriesListToken = async () => {
        await axios({
            method: 'get',
            url: `${this.state.url}/employer/add_job`,
            headers: this.authHeader(),
        }).then(
            res => {
                const { data } = res.data;
                const categoriesListToken = data;
                this.setState({categoriesListToken});
                 console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    addJob = async ({title, category, subCategory, details, requirements, responsibilities, finishAt, image}) => {
        console.log({title, category, details, requirements, responsibilities, finishAt, image});
        const fd = new FormData();
        fd.append("title", title);
        fd.append("category_id", category);
        fd.append("sub_category", subCategory);
        fd.append("details", details);
        fd.append("requirements", requirements);
        fd.append("responsibility", responsibilities);
        fd.append("finish_at", finishAt);
        fd.append("image", image);
        // for (var pair of fd.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/add_job`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                toast.success('Success Add Job', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    getEmployerJobs = async () => {
        this.setState({loading: true, jobStatus: ""});
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/jobs`,
            headers: this.authHeader(),
        }).then(
            res => {
                const { data } = res.data;
                const employerJobs = data;
                this.setState({employerJobs});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    getJobWithProposals = async (id) => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/jobs`,
            headers: this.authHeader(),
            data: {"job_id": id},
        }).then(
            res => {
                console.log(res);
                const {job , proposals} = res.data;
                this.setState({
                    job,
                    proposals
                });
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    closeJob = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/close_job`,
            headers: this.authHeader(),
            data: {"job_id": id},
        }).then(
            res => {
                const {data, job_status} = res.data;
                this.setState({employerJobs: data, jobStatus: job_status});
                toast.success('Success Closed Job', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    openJob = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/open_job`,
            headers: this.authHeader(),
            data: {"job_id": id},
        }).then(
            res => {
                const {data, job_status} = res.data;
                this.setState({employerJobs: data, jobStatus: job_status});
                toast.success('Success Opened Job', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    processJob = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/proccess_job`,
            headers: this.authHeader(),
            data: {"job_id": id},
        }).then(
            res => {
                const {data, job_status} = res.data;
                this.setState({employerJobs: data, jobStatus: job_status});
                toast.success('Success Processed Job', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getLastProposals = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employer`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data, total_jobs, total_proposals, total_complete_jobs} = res.data;
                const lastProposals = data;
                this.setState({
                    lastProposals,
                    total: {
                        totalJobs: total_jobs,
                        totalProposals: total_proposals,
                        totalCompletedJobs: total_complete_jobs,
                    }
                });
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    viewProposal = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/view_proposal`,
            headers: this.authHeader(),
            data: {"proposal_id": id},
        }).then(
            res => {
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    acceptProposal = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/accept_proposal`,
            headers: this.authHeader(),
            data: {"proposal_id": id},
        }).then(
            res => {
                const {data} = res.data;
                const proposals = data;
                this.setState({proposals});
                toast.success('Success Accepted Proposal', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    selectProposal = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/select_proposal`,
            headers: this.authHeader(),
            data: {"proposal_id": id},
        }).then(
            res => {
                const {data} = res.data;
                const proposals = data;
                this.setState({proposals});
                toast.success('Success Selected Proposal', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    rejectProposal = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/reject_proposal`,
            headers: this.authHeader(),
            data: {"proposal_id": id},
        }).then(
            res => {
                const {data} = res.data;
                const proposals = data;
                this.setState({proposals});
                toast.success('Success Rejected Proposal', {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getMyEmployees = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employer/my_employees`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const myEmployees = data;
                this.setState({myEmployees});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});

    }

    getMyEmployeeProfile = async (id) => {
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
                    myEmployeeProfile: data
                })
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    render() {
        return (
            <EmployerContext.Provider value={{
                ...this.state,

                getProfile: this.getProfile,
                setProfile: this.setProfile,

                getCategoriesListToken: this.getCategoriesListToken,
                addJob: this.addJob,
                getEmployerJobs: this.getEmployerJobs,
                getJobWithProposals: this.getJobWithProposals,

                closeJob: this.closeJob,
                openJob: this.openJob,
                processJob: this.processJob,

                getLastProposals: this.getLastProposals,

                viewProposal: this.viewProposal,
                acceptProposal: this.acceptProposal,
                selectProposal: this.selectProposal,
                rejectProposal: this.rejectProposal,

                getMyEmployees: this.getMyEmployees,
                getMyEmployeeProfile: this.getMyEmployeeProfile,
            }}>
                {this.props.children}
            </EmployerContext.Provider>
        )
    }
}

// consumer
const EmployerConsumer = EmployerContext.Consumer;

export {EmployerConsumer, EmployerContext};
EmployerProvider.contextType = UserContext;
export default EmployerProvider;