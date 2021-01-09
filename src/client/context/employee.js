import React, {Component, createContext} from 'react';
import axios from "axios";
import {UserContext} from "./user";
// importing toastify module 
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// context
const EmployeeContext = createContext();

// provider
class EmployeeProvider extends Component {
    state = {
        url: "https://joodya.com/crs/api/v1",
        profile: {
            categories: [],
            countries: [],
            employeeInfo: {},
        },
        proposals: [],
        education: [],
        works: [],
        languages: [],
        skills: [],
        loading: true,
    }
    
    componentDidMount = () => {
        
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

    setProfile = async ({pref, photo, name, birthDate, email, mobile, category, country, address, city, state, zipCode}) => {
        const fd = new FormData();
        fd.append("pref", pref);
        fd.append("photo", photo);
        fd.append("name", name);
        fd.append("birthDate", birthDate);
        fd.append("email", email);
        fd.append("mobile", mobile);
        fd.append("category_id", category);
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

    getProposals = async () => {
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

    getEducation = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/educations`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const education = data;
                this.setState({education})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    AddEducation = async ({title, specialization, organization, percentage, from_date, to_date, attachments}) => {
        let fd = new FormData();
        fd.append("title", title);
        fd.append("specialization", specialization);
        fd.append("organization", organization);
        fd.append("percentage", percentage);
        fd.append("from_date", from_date);
        fd.append("to_date", to_date);
        fd.append("attachments", attachments);

        // for (var pair of fd.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        // console.log("attachments", attachments);

        await axios({
            method: 'post',
            url: `${this.state.url}/employee/add_education`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                toast.success('Success Add Education', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getEducation();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    updateEducation  = async ({id, title, specialization, organization, percentage, from_date, to_date, attachments}) => {
        let fd = new FormData();
        fd.append("education_id", id);
        fd.append("title", title);
        fd.append("specialization", specialization);
        fd.append("organization", organization);
        fd.append("percentage", percentage);
        fd.append("from_date", from_date);
        fd.append("to_date", to_date);
        fd.append("attachments", attachments);
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/update_education`,
            headers: this.authHeader(),
            data: fd
        }).then(
            res => {
                toast.success('Success Update Education', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getEducation();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteEducation  = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/delete_education`,
            headers: this.authHeader(),
            data: {"education_id": id},
        }).then(
            res => {
                toast.success('Success Delete Education', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getEducation();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getWorks = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/works`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const works = data;
                this.setState({works})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    AddWork = async ({title, description, from_date, to_date, attachments}) => {
        let fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("from_date", from_date);
        fd.append("to_date", to_date);
        fd.append("attachments", attachments);
        // for (var pair of fd.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/add_work`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                toast.success('Success Add Work', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getWorks();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    updateWork = async ({id, title, description, from_date, to_date, attachments}) => {
        let fd = new FormData();
        fd.append("work_id", id);
        fd.append("title", title);
        fd.append("description", description);
        fd.append("from_date", from_date);
        fd.append("to_date", to_date);
        fd.append("attachments", attachments);
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/update_work`,
            headers: this.authHeader(),
            data: fd,
        }).then(
            res => {
                toast.success('Success Update Work', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getWorks();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteWork  = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/delete_work`,
            headers: this.authHeader(),
            data: {"work_id": id},
        }).then(
            res => {
                toast.success('Success Delete Work', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getWorks();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getLanguages = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/languages`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const languages = data;
                this.setState({languages})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    AddLanguage = async (values) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/add_language`,
            headers: this.authHeader(),
            data: values,
        }).then(
            res => {
                toast.success('Success Add Language', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getLanguages();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    updateLanguage = async ({id, name, level}) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/update_language`,
            headers: this.authHeader(),
            data: {"language_id": id, name, level},
        }).then(
            res => {
                toast.success('Success Update Language', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getLanguages();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteLanguage  = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/delete_language`,
            headers: this.authHeader(),
            data: {"language_id": id},
        }).then(
            res => {
                toast.success('Success Delete Language', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getLanguages();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getSkills = async () => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/skills`,
            headers: this.authHeader(),
        }).then(
            res => {
                const {data} = res.data;
                const skills = data;
                this.setState({skills})
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    AddSkill = async (name) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/add_skill`,
            headers: this.authHeader(),
            data: {name},
        }).then(
            res => {
                toast.success('Success Add Skill', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getSkills();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    updateSkill = async ({id, name}) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/update_skill`,
            headers: this.authHeader(),
            data: {"skill_id": id, name},
        }).then(
            res => {
                toast.success('Success Update Skill', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getSkills();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    deleteSkill  = async (id) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/employee/delete_skill`,
            headers: this.authHeader(),
            data: {"skill_id": id},
        }).then(
            res => {
                toast.success('Success Delete Skill', {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                this.getSkills();
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }
    
    render() {
        return (
            <EmployeeContext.Provider value={{
                ...this.state,

                getProfile: this.getProfile,
                setProfile: this.setProfile,

                setProposalJob: this.setProposalJob,
                getProposals: this.getProposals,
                
                getEducation: this.getEducation,
                AddEducation: this.AddEducation,
                updateEducation: this.updateEducation,
                deleteEducation: this.deleteEducation,

                getWorks: this.getWorks,
                AddWork: this.AddWork,
                updateWork: this.updateWork,
                deleteWork: this.deleteWork,

                getLanguages: this.getLanguages,
                AddLanguage: this.AddLanguage,
                updateLanguage: this.updateLanguage,
                deleteLanguage: this.deleteLanguage,

                getSkills: this.getSkills,
                AddSkill: this.AddSkill,
                updateSkill:this.updateSkill,
                deleteSkill: this.deleteSkill,
            }}>
                {this.props.children}
            </EmployeeContext.Provider>
        )
    }
}

// consumer
const EmployeeConsumer = EmployeeContext.Consumer;

export {EmployeeConsumer, EmployeeContext};
EmployeeProvider.contextType = UserContext;
export default EmployeeProvider;