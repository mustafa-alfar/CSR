import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SystemLoading from "../client/components/loading/systemloading";


const Header  = lazy(() => import('./components/header/index'));
const Dashboard = lazy(() => import('./components/dashboard'));
const Jobs = lazy(() => import('./components/jobs'));
const SingleJob = lazy(() => import('./components/jobs/singlejob'));
const EmployerJobs = lazy(() => import('./components/jobs/employerjobs'));
const Categories = lazy(() => import('./components/categories'));
const SubCategories = lazy(() => import('./components/categories/subcategories'));
const Employers = lazy(() => import('./components/employers'));
const Employees = lazy(() => import('./components/employees'));
const EmployeeProfile = lazy(() => import('./components/profile/employee'));
const EmployerProfile = lazy(() => import('./components/profile/employer'));
const Reviews = lazy(() => import('./components/reviews'));
const Error = lazy(() => import('./components/error404'));
const ErrorPage = lazy(() => import('./components/error500'));
// import Header from  './components/header/index';
// import Dashboard from './components/dashboard';
// import Jobs from './components/jobs';
// import SingleJob from './components/jobs/singlejob';
// import EmployerJobs from './components/jobs/employerjobs';
// import Categories from './components/categories';
// import SubCategories from './components/categories/subcategories';
// import Employers from './components/employers';
// import Employees from './components/employees';
// import EmployerProfile from './components/profile/employer';
// import EmployeeProfile from './components/profile/employee';
// import Reviews from './components/reviews';
// import Error from './components/error404';
// import ErrorPage from './components/error500';


const AppUniversal = function (props) {
  return (
    <Router>
      <div className="main-wrapper">
        <Route render={(props)=> <Header {...props}/>} />
          <Suspense fallback={<SystemLoading />}>
            <Switch>
              <Route path="/admin" exact component={Dashboard} />
              <Route path="/admin/jobs/:status" exact component={Jobs} />
              <Route path="/admin/single-job/:id" exact component={SingleJob} />
              <Route path="/admin/employer-jobs" exact component={EmployerJobs} />
              <Route path="/admin/categories" exact component={Categories} />
              <Route path="/admin/categories/:id" exact component={SubCategories} />
              <Route path="/admin/employers" exact component={Employers} />
              <Route path="/admin/employees" exact component={Employees} />
              <Route path="/admin/profile/employer" exact component={EmployerProfile} />
              <Route path="/admin/profile/employee" exact component={EmployeeProfile} />
              <Route path="/admin/reviews" exact component={Reviews} />
              <Route path="/admin/500" exact component={ErrorPage} />
              <Route component={Error} />
            </Switch>
          </Suspense>
      </div>
    </Router>
  );
}

export default AppUniversal;