import React, { Component } from 'react';
import loginBanner from '../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import ActionLoading from "../loading/actionloading";
import { UserContext } from "../../context/user";

class LoginContainer extends Component {
  state = {
    url: "https://joodya.com/crs/api/v1/user/login",
    error: false,
  }

	componentDidMount(){
		document.body.classList.add('account-page');
  }
  
	componentWillUnmount(){
		document.body.classList.remove('account-page');
  }

  initialValues = () => {
    return (
      {
        email: "",
        password: "",
      }
    )
  }

  schema = () => {
    const schema =  yup.object().shape({
      email: yup.string().email("Invalid email format").required("Required"),
      password:  yup.string().required("Required"),
    });
    return schema;
  }
  
  handleSubmit = async (values) => {
    const {userLogin} = this.context;
    await userLogin(values);
  }

  form = (props) => {
    const {isSubmitting} = props;
    return (
      <Form>
        <div className="form-group form-focus">
          <Field name="email" type="email" className="form-control floating" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="text-danger text-xs" />
        </div>
        <div className="form-group form-focus">
          <Field name="password" type="password" className="form-control floating" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="text-danger text-xs" />
        </div>
        <div className="text-right">
          {this.state.error && <div className="dont-have mt-0 mb-2">You is not member. please <Link to= "/register">Register</Link> or confirm your data</div>}
          <Link to="/forgot-password" className="forgot-link">Forgot Password ?</Link>
        </div>
        <button className="btn btn-primary btn-block btn-lg login-btn" type="submit" disabled={isSubmitting}>
          <span>Login</span>
          <ActionLoading loading={this.context.loading} />
        </button>
        <div className="text-center dont-have">Don’t have an account ? <Link to= "/register">Register</Link></div>
      </Form>
    );
  }

  render(){
    return (
      <div className="content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 offset-md-1">

              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left text-center">
                    <img src={loginBanner} className="img-fluid" alt="Doccure Login" />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Login</h3>
                    </div>
                    <Formik
                      initialValues={this.initialValues()}
                      validationSchema={this.schema}
                      onSubmit={this.handleSubmit}
                    >
                      {this.form}
                    </Formik>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

LoginContainer.contextType = UserContext;
export default LoginContainer;