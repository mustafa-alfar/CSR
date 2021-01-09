import React, {Component, createContext} from 'react';
import history from "../../history";
import axios from "axios";
// importing toastify module
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// context
const UserContext = createContext();

// provider
class UserProvider extends Component {
    state = {
        url: "https://joodya.com/crs/api/v1",
        categories: [],
        countries: [],
        user: {},
        loading: false,
        forgetStatus: 0
    }
    
    componentDidMount = () => {
        localStorage.getItem("user")
        ? this.setState({user: JSON.parse(localStorage.getItem("user"))})
        : this.setState({user: {}}) ;
    }

    getCategories = async () => {
        await axios({
            method: 'get',
            url: `${this.state.url}/user/register`,
        }).then(
            res => {
                const {data} = res.data;
                const {categories} = data;
                this.setState({categories});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    getCountries  = async () => {
        await axios({
            method: 'get',
            url: "https://restcountries.eu/rest/v2/all",
        }).then(
            res => {
                const countries = res.data.map(item=>{
                    return item.name
                })
                this.setState({countries});
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }


    userRegister = async (values) => {
        this.setState({loading: true});
        console.log("userRegister", values);
        await axios({
        method: 'post',
        url: `${this.state.url}/user/register`,
        data: {...values},
        }).then(
            res => {
                const {code, status, message} = res.data;
                if(code == 200 && status === true){
                    toast.success(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                    history.push("/login");
                }else{
                    toast.error(message, {position: toast.POSITION.TOP_CENTER});
                }
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    userLogin = async (values) => {
        this.setState({loading: true});
        await axios({
            method: 'post',
            url: `${this.state.url}/user/login`,
            data: {...values},
        }).then(
            res => {
                const {code, status, message, accessToken: token, user} = res.data;
                if(code === "200" && status === true){
                    const {type, photo, name, birthDate, country_id} = user;
                    this.setState({
                        user: {token, ...user}
                    });
                    const dashboardUrl = (type === "2"? "/employee/dashboard" : "/employer/dashboard");
                    type==="0"? window.open('/admin', '_blank') : history.push(dashboardUrl);
                    localStorage.setItem("user", JSON.stringify({token, type, photo, name, birthDate, country_id}));
                    toast.success(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                }else{
                    toast.error(message, {position: toast.POSITION.TOP_CENTER});
                }
                console.log(res);
                
            },
            error => {
                toast.error("There was an error. Please try again...", {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                console.log(error);
            }
        )
        this.setState({loading: false});
    }

    userRefresh = async (user) => {
        const {type, photo, name, birthDate, country_id} = user;
        const {token} = this.state.user;
        await this.setState({user: {token, ...user}});
        localStorage.setItem("user", JSON.stringify({token, type, photo, name, birthDate, country_id}));
    }

    userLogout = () => {
        this.setState({user: {}});
        localStorage.removeItem("user");
        history.push("/login");
    };

    changePassword  = async ({oldPassword, newPassword}) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/change_password`,
            headers: {Authorization: `Bearer ${this.state.user.token}`},
            data: {"old_password": oldPassword, "new_password": newPassword},
        }).then(
            res => {
                const {code, status, message} = res.data;
                if(code === 200 && status === true){
                    toast.success(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                }else{
                    toast.error(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                }
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    forgotPassword  = async (values) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/user/forgot_password`,
            data: values,
        }).then(
            res => {
                const {code, status, message} = res.data;
                if(code === 200 && status === true){
                    this.setState({forgetStatus: 1})
                    toast.success(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                }else{
                    toast.error(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                }
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    sendCode  = async (values) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/user/send_code`,
            data: values,
        }).then(
            res => {
                const {code, status, message} = res.data;
                if(code === 200 && status === true){
                    this.setState({forgetStatus: 2})
                    toast.success(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                }else{
                    toast.error(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                }
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    resetPassword  = async (values) => {
        await axios({
            method: 'post',
            url: `${this.state.url}/user/reset_password`,
            data: values,
        }).then(
            res => {
                const {code, status, message} = res.data;
                if(code === 200 && status === true){
                    this.setState({forgetStatus: 0})
                    history.push("/login");
                    toast.success(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER});
                }else{
                    toast.error(message, {autoClose:2000, position: toast.POSITION.TOP_CENTER})
                }
                console.log(res);
            },
            error => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                getCategories: this.getCategories,
                getCountries: this.getCountries,
                userRegister: this.userRegister,
                userLogin: this.userLogin,
                userRefresh : this.userRefresh,
                userLogout: this.userLogout,
                changePassword: this.changePassword,

                forgotPassword: this.forgotPassword,
                sendCode: this.sendCode,
                resetPassword: this.resetPassword
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

// consumer
const UserConsumer = UserContext.Consumer;

export {UserConsumer, UserContext};
export default UserProvider;