import React, { useContext, lazy, Suspense } from "react";
import { Router, Route, Switch } from 'react-router-dom';

import Header from  './client/components/header.jsx';
import Footer from  './client/components/footer.jsx';
// import LoginContainer from './client/components/login/login.jsx';
// import Register from './client/components/register/register.jsx';
import ForgotPassword from './client/components/forgot-password';
import Home from './client/components/home';
// const Header = lazy(() => import('./client/components/header.jsx'));
// const Footer = lazy(() => import('./client/components/footer.jsx'));

// const ForgotPassword = lazy(() => import('./client/components/forgot-password'));
// const Home = lazy(() => import('./client/components/home'));

//pages
import AboutUs from './client/components/pages/aboutus';
import Services from './client/components/pages/services';
import ContactUs from './client/components/pages/contactus';
import Terms from './client/components/pages/terms';
import Policy from './client/components/pages/policy';
import Error from './client/components/error404';

import AdminProvider from "./admin/context/admin";
import EmployerProvider from "./client/context/employer";
import EmployeeProvider from "./client/context/employee";

import history from "./history";
import ScrollToTop from "./Scrolltotop";
import SystemLoading from "./client/components/loading/systemloading";
import { UserContext } from "./client/context/user";


// import SuccessStories from './client/components/pages/success-stories';
const SuccessStories = lazy(() => import('./client/components/pages/success-stories'));

//jobs
// import JobsList from './client/components/jobs';
// import SingleJob from './client/components/jobs/singlejob';
const JobsList = lazy(() => import('./client/components/jobs'));
const SingleJob = lazy(() => import('./client/components/jobs/singlejob'));

//employer
// import EmployerDashboard from './client/components/employer/dashboard';
// import jobs from './client/components/employer/jobs';
// import AddJob from './client/components/employer/jobs/addjob';
// import EmployerJob from './client/components/employer/jobs/singlejob';
// import CoverLetters from './client/components/employer/jobs/coverletters';
// import EmployeeProfile from './client/components/employer/employeeprofile';
// import MyEmployees from './client/components/employer/myemployees';
// import EmployerChat from './client/components/employer/chat';
// import ProfileSetting from './client/components/employer/profilesetting';
// import EmployerPassword from './client/components/employer/password';

const EmployerDashboard  = lazy(() => import('./client/components/employer/dashboard'));
const jobs  = lazy(() => import('./client/components/employer/jobs'));
const AddJob  = lazy(() => import('./client/components/employer/jobs/addjob'));
const EmployerJob  = lazy(() => import('./client/components/employer/jobs/singlejob'));
const CoverLetters  = lazy(() => import('./client/components/employer/jobs/coverletters'));
const EmployeeProfile  = lazy(() => import('./client/components/employer/employeeprofile'));
const MyEmployees  = lazy(() => import('./client/components/employer/myemployees'));
const EmployerChat  = lazy(() => import('./client/components/employer/chat'));
const ProfileSetting = lazy(() => import('./client/components/employer/profilesetting'));
const EmployerPassword  = lazy(() => import('./client/components/employer/password'));

//employee
// import EmployeeDashboard from './client/components/employee/dashboard';
// import Proposals from './client/components/employee/proposals';
// import Education from './client/components/employee/education';
// import Works from './client/components/employee/works';
// import Skills from './client/components/employee/skills';
// import Languages from './client/components/employee/languages';
// import EmployerProfile from './client/components/employee/employerprofile';
// import EmployeeChat from './client/components/employee/chat';
// import Profile from './client/components/employee/profile';
// import Password from './client/components/employee/password';

const EmployeeDashboard = lazy(() => import('./client/components/employee/dashboard'));
const Proposals = lazy(() => import('./client/components/employee/proposals'));
const Education = lazy(() => import('./client/components/employee/education'));
const Works = lazy(() => import('./client/components/employee/works'));
const Skills = lazy(() => import('./client/components/employee/skills'));
const Languages = lazy(() => import('./client/components/employee/languages'));
const EmployerProfile = lazy(() => import('./client/components/employee/employerprofile'));
const EmployeeChat = lazy(() => import('./client/components/employee/chat'));
const Profile = lazy(() => import('./client/components/employee/profile'));
const Password = lazy(() => import('./client/components/employee/password'));

const LoginContainer = lazy(() => import('./client/components/login/login.jsx'));
const Register = lazy(() => import('./client/components/register/register.jsx'));


// import AppUniversal from "./admin/app-universal";
const AppUniversal = lazy(() => import('./admin/app-universal'));


const AppContainer = function (props) {
  const {user} = useContext(UserContext);
  const {token, type} = user;

  if (props) {
    const url = props.location.pathname.split("/")[1];
    // console.log('url', url);

    return (
      <Router history={history}>
        <ScrollToTop />
        { url === 'admin' ?
          (
            <AdminProvider>
              <Suspense fallback={<SystemLoading />}>
                <Switch>
                  {(token && type==="0") &&
                    <Route path="/admin" component={AppUniversal} />
                  }
                </Switch>
              </Suspense>
            </AdminProvider>
          ) : (
            <div>
            {/* <Route path="/sider-menu" exact component={SideMenu} /> */}
            <Route render={(props)=> <Header {...props}/>} />

              <EmployerProvider>
                <EmployeeProvider>
                    <Suspense fallback={<SystemLoading />}>
                  <Switch>

                    <Route path="/login" exact component={LoginContainer} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/forgot-password" exact component={ForgotPassword} />
                    <Route path="(/|/home)" exact component={Home} />

                    {/* pages */}
                    <Route path="/about-us" exact component={AboutUs} />
                    <Route path="/services" exact component={Services} />
                    <Route path="/contact-us" exact component={ContactUs} />
                    <Route path="/success-stories/:id" exact component={SuccessStories}  />
                    <Route path="/terms" exact component={Terms} />
                    <Route path="/privacy-policy" exact component={Policy}  />



                      {/* jobs */}
                      <Route path="/jobs" exact component={JobsList} />
                      <Route path="/jobs/single-job/:id" exact component={SingleJob} />

                      {(token && type==="1") &&
                        <>
                          <Route path="/employer/dashboard" exact component={EmployerDashboard} />
                          <Route path="/employer/jobs" exact component={jobs} />
                          <Route path="/employer/jobs/add-job" exact component={AddJob} />
                          <Route path="/employer/jobs/single-job" exact component={EmployerJob} />
                          <Route path="/employer/jobs/cover-letters" exact component={CoverLetters} />
                          <Route path="/employer/employee-profile" exact component={EmployeeProfile} />
                          <Route path="/employer/my-employees" exact component={MyEmployees} />
                          <Route path="/employer/chat-employer" exact component={EmployerChat} />
                          <Route path="/employer/profile-setting" exact component={ProfileSetting} />
                          <Route path="/employer/change-password" exact component={EmployerPassword} />
                        </>
                      }

                      {(token && type==="2") &&
                        <>
                          <Route path="/employee/dashboard" exact component={EmployeeDashboard} />
                          <Route path="/employee/proposals" exact component={Proposals} />
                          <Route path="/employee/education" exact component={Education} />
                          <Route path="/employee/works" exact component={Works} />
                          <Route path="/employee/skills" exact component={Skills} />
                          <Route path="/employee/languages" exact component={Languages} />
                          <Route path="/employee/employer-profile" exact component={EmployerProfile} />
                          <Route path="/employee/employee-chat" exact component={EmployeeChat} />
                          <Route path="/employee/profile" exact component={Profile} />
                          <Route path="/employee/change-password" exact component={Password} />
                        </>
                      }

                      <Route path="*" component={Error} />

                  </Switch>
                    </Suspense>
                </EmployeeProvider>
              </EmployerProvider>
            <Route render={(props) => <Footer {...props}/>}/>
            </div>
          )}
      </Router>
    )
  }
  return null;
}

export default AppContainer;