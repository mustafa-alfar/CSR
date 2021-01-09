import React, { Component } from 'react';
import loginBanner from '../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {UserContext} from "../../context/user";

class ForgotPassword  extends Component {

	componentDidMount(){
		document.body.classList.add('account-page');
	}
	componentWillUnmount(){
		document.body.classList.remove('account-page');
  }

  initialValues = () => {
    return {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    }
  }

  validationSchema = () => {
    const {forgetStatus} = this.context;
    let schema;
    switch (forgetStatus) {
      case 0:
        schema = Yup.object().shape({
          email: Yup.string().email("Invalid email format").required("Required"),
        })
        break;
      case 1:
        schema = Yup.object().shape({
          otp: Yup.string().required("Required"),
        })
        break;
      case 2:
        schema = Yup.object().shape({
          password: Yup.string().required("Required"),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Required"),
        })
        break
    }
    return schema;
  }

  handleSubmit = async (values) => {
    const {forgetStatus, forgotPassword, sendCode, resetPassword} = this.context;
    forgetStatus===0? await forgotPassword(values) : forgetStatus===1? await sendCode(values) : await resetPassword(values);
  } 

  render(){
    const {forgetStatus} = this.context;
    const inputText = forgetStatus===0? "Enter your email to get a code through it." : forgetStatus===1? "Enter your code to get a password reset." : "Enter New Password";
    
    return(
      <div className="content">
        <div className="container-fluid">
          
          <div className="row">
            <div className="col-md-8 offset-md-2">
            
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img src={loginBanner} className="img-fluid" alt="Login Banner" />	
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Forgot Password?</h3>
                      <p className="small text-muted">{inputText}</p>
                    </div>

                    <Formik
                      initialValues={this.initialValues()}
                      validationSchema={this.validationSchema}
                      onSubmit={this.handleSubmit}
                      validateOnChange={false}
                    >
                      {(formik)=>{
                        return (
                          <Form>
                            {
                              (forgetStatus===0) &&
                              <div className="form-group form-focus">
                                <Field type="email" name="email" className="form-control floating" />
                                <ErrorMessage name="email" component="div" className="text-danger text-xs" />
                                <label className="focus-label">Email</label>
                              </div>
                            }
                            {
                              (forgetStatus===1) && 
                              <div className="form-group form-focus">
                                <Field type="text" name="otp" className="form-control floating" />
                                <ErrorMessage name="otp" component="div" className="text-danger text-xs" />
                                <label className="focus-label">Code</label>
                              </div>
                            }
                            {
                              (forgetStatus===2) && 
                              <>
                                <div className="form-group form-focus">
                                  <Field name="password" type="password" className="form-control floating" />
                                  <ErrorMessage name="password" component="div" className="text-danger text-xs" />
                                  <label className="focus-label">New Password</label>
                                </div>
                                <div>
                                  <Field name="confirmPassword" type="password" className="form-control floating" />
                                  <ErrorMessage name="confirmPassword" component="div" className="text-danger text-xs" />
                                  <label className="focus-label">Confirm Password</label>
                                </div>
                              </>
                            }
                            <div className="text-right">
                              <Link to="/login" className="forgot-link">Remember your password? </Link>
                            </div>
                            <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Send</button>
                          </Form>
                        )
                      }}
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

ForgotPassword.contextType = UserContext;
export default ForgotPassword;