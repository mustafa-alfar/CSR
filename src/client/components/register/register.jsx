import React, { Component } from 'react';
import loginBanner from '../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import ActionLoading from "../loading/actionloading";
import { UserContext } from "../../context/user";

class Register extends Component {
	state = {
    subCategories: [],
    isEmployee: true,
  }

   componentDidMount = async () => {
    document.getElementsByTagName('body')[0].className = 'account-page';

     await this.context.getCategories();
     await this.context.getCountries();
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].className = '';
  }

  checkUserType = (event) => {
    const {value} = event.target;
    if(value==="2"){
      this.setState({isEmployee: true});
    } else if(value==="1"){
      this.setState({isEmployee: false});
    }
  }

  changeCtegory = (event) => {
    console.log(event.target.value)
		this.setState({
      subCategories : this.context.categories.find(cntry => cntry.id == event.target.value).sub_category
    });
  }

  initialValues = () => {
    return (
      {
        name: "",
        type: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        category: "",
        subCategory: "",
        country: "",
      }
    )
  }

  schema = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema =  yup.object().shape({
      name: yup.string().required("Required"),
      type: yup.number().required("Required"),
      email: yup.string().email("Invalid email format").required("Required"),
      mobile: yup.string().matches(phoneRegExp, 'Mobile number is not valid').required("Required"),
      password: yup.string().required("Required"),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Required"),
      country: yup.string().required("Required"),
    });
    return schema;
  }

  handleSubmit = async (values) => {
    console.log(values);
    const {category, subCategory, country} = values;
    const {userRegister} = this.context;
    console.log(values);
    await userRegister({...values, country_id: country, category_id: category, sub_category: subCategory});
  };

	form = (props) => {
     const {handleChange, isSubmitting} = props;
     // setFieldValue("type", e.target.value)
    return (
      <Form>
        <div className="form-row">
          <div className="form-group form-focus col-md-6">
              <Field name="name" type="text" className="form-control floating" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="text-danger text-xs" />
          </div>
          <div className="form-group form-focus col-md-6">
            <Field name="type" as="select" className="form-control floating placeholder"
              onChange={(e)=>{this.checkUserType(e); handleChange(e)}}
            >
              <option value=""  disabled>Employer/Employee</option>
              <option value="1">Employer</option>
              <option value="2">Employee</option>
            </Field>
            <ErrorMessage name="type" component="div" className="text-danger text-xs" />
          </div>
        </div>

			<div className="form-row">
				<div className="form-group form-focus col-md-6">
					<Field name="email" type="email" className="form-control floating" placeholder="Email" />
					<ErrorMessage name="email" component="div" className="text-danger text-xs" />
				</div>
				<div className="form-group form-focus col-md-6">
					<Field name="mobile" type="tel" className="form-control floating" placeholder="Mobile" />
					<ErrorMessage name="mobile" component="div" className="text-danger text-xs" />
				</div>
			</div>
      <div className="form-row">
        <div className="form-group form-focus col-md-6">
          <Field name="password" type="password" className="form-control floating" placeholder="Create Password" />
          <ErrorMessage name="password" component="div" className="text-danger text-xs" />
        </div>
        <div className="form-group form-focus col-md-6">
          <Field name="confirmPassword" type="password" className="form-control floating" placeholder="Confirm Password" />
          <ErrorMessage name="confirmPassword" component="div" className="text-danger text-xs" />
        </div>
      </div>
      {this.state.isEmployee
        ? <>
            <div className="form-row">
              <div className="form-group form-focus col-md-6">
                <Field as="select" name="category" className="form-control floating placeholder"
                  onChange={(e)=>{this.changeCtegory(e); handleChange(e)}}
                >
                  <option value="" disabled>Select Category</option>
                  {
                    this.context.categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })
                  }
                </Field>
                <ErrorMessage name="category" component="div" className="text-danger text-xs" />
              </div>
              <div className="form-group form-focus col-md-6">
                <Field as="select" name="subCategory" className="form-control floating placeholder">
                  <option value="" disabled>Select Sub Category</option>
                  {
                    this.state.subCategories.map(subCategory => {
                      return (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      );
                    })
                  }
                </Field>
              </div>
            </div>
            <div className="form-group form-focus">
            <Field as="select" name="country" className="form-control floating placeholder">
              <option value="" disabled>Select Country</option>
              {
                this.context.countries.map((country, index) => {
                  return (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  );
                })
              }
            </Field>
            <ErrorMessage name="country" component="div" className="text-danger text-xs" />
          </div>
          </>
        : <div className="form-group form-focus">
            <Field as="select" name="country" className="form-control floating placeholder">
              <option value="" disabled>Select Country</option>
              <option value="Germany">Germany</option>
              {/* {
                this.context.countries.map((country, index) => {
                  return (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  );
                })
              } */}
            </Field>
            <ErrorMessage name="country" component="div" className="text-danger text-xs" />
          </div>
      }
      <div className="text-right">
        <Link to="/login" className="forgot-link">Already have an account?</Link>
      </div>
      <button className="btn btn-primary btn-block btn-lg login-btn" type="submit" disabled={isSubmitting}>
        <span>Signup</span>
        <ActionLoading loading={this.context.loading} />
      </button>
      </Form>
    );
  }

  render(){
    return(
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">

                  <div className="col-md-7 col-lg-5 login-left">
                    <img src={loginBanner} className="img-fluid" alt="Login Banner" />
                  </div>

                  <div className="col-md-12 col-lg-7 login-right">
                    <div className="login-header">
                      <h3>Signup</h3>
                    </div>

                    <Formik
                      initialValues={this.initialValues()}
                      validationSchema={this.schema}
                      onSubmit={this.handleSubmit}
                      validateOnChange={false}
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

Register.contextType = UserContext;
export default Register;