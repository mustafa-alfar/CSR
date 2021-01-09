import React, { useContext, lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from  './components/header.jsx';
import Footer from  './components/footer.jsx';
// import LoginContainer from './components/login/login.jsx';
// import Register from './components/register/register.jsx';
import ForgotPassword from './components/forgot-password';
import Home from './components/home';

const LoginContainer  = lazy(() => import('./components/login/login.jsx'));
const Register  = lazy(() => import('./components/register/register.jsx'));

//pages
import AboutUs from './components/pages/aboutus';
import Services from './components/pages/services';
import ContactUs from './components/pages/contactus';
import SuccessStories from './components/pages/success-stories';
import Terms from './components/pages/terms';
import Policy from './components/pages/policy';
import Error from './components/error404';

//jobs
// import JobsList from './components/jobs';
// import SingleJob from './components/jobs/singlejob';
const JobsList = lazy(() => import('./components/jobs'));
const SingleJob = lazy(() => import('./components/jobs/singlejob'));

//employer
// import EmployerDashboard from './components/employer/dashboard';
// import jobs from './components/employer/jobs';
// import AddJob from './components/employer/jobs/addjob';
// import EmployerJob from './components/employer/jobs/singlejob';
// import CoverLetters from './components/employer/jobs/coverletters';
// import EmployeeProfile from './components/employer/employeeprofile';
// import MyEmployees from './components/employer/myemployees';
// import EmployerChat from './components/employer/chat';
// import ProfileSetting from './components/employer/profilesetting';
// import EmployerPassword from './components/employer/password';

const EmployerDashboard  = lazy(() => import('./components/employer/dashboard'));
const jobs  = lazy(() => import('./components/employer/jobs'));
const AddJob  = lazy(() => import('./components/employer/jobs/addjob'));
const EmployerJob  = lazy(() => import('./components/employer/jobs/singlejob'));
const CoverLetters  = lazy(() => import('./components/employer/jobs/coverletters'));
const EmployeeProfile  = lazy(() => import('./components/employer/employeeprofile'));
const MyEmployees  = lazy(() => import('./components/employer/myemployees'));
const EmployerChat  = lazy(() => import('./components/employer/chat'));
const ProfileSetting = lazy(() => import('./components/employer/profilesetting'));
const EmployerPassword  = lazy(() => import('./components/employer/password'));

//employee
// import EmployeeDashboard from './components/employee/dashboard';
// import Proposals from './components/employee/proposals';
// import Education from './components/employee/education';
// import Works from './components/employee/works';
// import Skills from './components/employee/skills';
// import Languages from './components/employee/languages';
// import EmployerProfile from './components/employee/employerprofile';
// import EmployeeChat from './components/employee/chat';
// import Profile from './components/employee/profile';
// import Password from './components/employee/password';

const EmployeeDashboard = lazy(() => import('./components/employee/dashboard'));
const Proposals = lazy(() => import('./components/employee/proposals'));
const Education = lazy(() => import('./components/employee/education'));
const Works = lazy(() => import('./components/employee/works'));
const Skills = lazy(() => import('./components/employee/skills'));
const Languages = lazy(() => import('./components/employee/languages'));
const EmployerProfile = lazy(() => import('./components/employee/employerprofile'));
const EmployeeChat = lazy(() => import('./components/employee/chat'));
const Profile = lazy(() => import('./components/employee/profile'));
const Password = lazy(() => import('./components/employee/password'));


// admin
import SideMenu from './components/admin/menu/menu';

import {UserContext} from "./context/user";

const ClientAppUniversal = function (props) {
  const {user} = useContext(UserContext);
  const {token, type} = user;

  return (

    <Router>
      <div>
        <Route path="/sider-menu" exact component={SideMenu} />
        <Route render={(props)=> <Header {...props}/>} />
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

            <Route component={Error} />

          
        </Switch>
          </Suspense>
        <Route render={(props) => <Footer {...props}/>}/>
      </div>
    </Router>
  );
}

export default ClientAppUniversal;