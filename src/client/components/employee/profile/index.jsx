import React, { useContext, useState, useEffect } from 'react';
import DashboardSidebar from '../sidebar/sidebar.jsx';
import IMG01 from '../../../assets/images/patient.jpg';
import StickyBox from "react-sticky-box";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// context
import { EmployeeContext } from "../../../context/employee";
import { UserContext } from "../../../context/user";
import DateView from "react-datepicker";
import moment from "moment";

function Profile () {

  // context values
  const {getProfile, profile, setProfile, loading} = useContext(EmployeeContext);
  const {getCountries, countries} = useContext(UserContext);
  const {categories, employeeInfo} = profile;
  const {category: {...category}, country_id, email, mobile, photo, name, birthDate, address, city, state, zipCode, pref} = employeeInfo;
  const imageUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;

  const [preview, setPreview] = useState("");
  
  useEffect( () => {
    getProfile();
    getCountries();
  }, [])
  
  const initialValues = () => {
    const date = (!birthDate || birthDate === "0000-00-00 00:00:00")? new Date() : new Date(birthDate);
    return {
      pref: pref || '',
      photo: photo || null,
      name: name || '',
      birthDate: date,
      email: email || '',
      mobile: mobile || '',
      category: category.id || '',
      country: country_id || '',
      address: address || "",
      city: city || "",
      state: state || "",
      zipCode: zipCode || "",
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
  });

  const handleSubmit = async values => {
    let {birthDate} = values;
    birthDate = moment(birthDate).format("YYYY-MM-DD");
    await setProfile({...values, birthDate});
  } 

  return(
    <div>

      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/home">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profile Settings</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                  < DashboardSidebar />
              </StickyBox>
            </div>

            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <Formik
                      initialValues={initialValues()}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                      validateOnChange={false}
                      enableReinitialize={true}
                    >
                      {(formik)=>{
                      const {setFieldValue} = formik;
                        return (
                          <Form>
                            <div className="row form-row">
                              <div className="col-12 col-md-12">
                                <div className="form-group">
                                  <div className="change-avatar">
                                    <div className="profile-img">
                                      <img src={preview || imageUrl} alt="User" />
                                    </div>
                                    <div className="upload-img">
                                      <div className="change-photo-btn">
                                        <span><i className="fa fa-upload"></i> Upload Photo</span>
                                        <Field type="file" name="file" className="upload" onChange={(e) =>{
                                            setPreview(URL.createObjectURL(e.target.files[0]));
                                            setFieldValue("photo", e.currentTarget.files[0]);
                                          }}
                                        />
                                      </div>
                                      <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-12">
                                <div className="form-group">
                                  <label>Pref</label>
                                  <Field as="textarea" name="pref" className="form-control" rows="5"></Field>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Name</label>
                                  <Field type="text" name="name" className="form-control" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Date of Birth</label>
                                  <div className="cal-icon">
                                    <Field name="birthDate">
                                      {
                                        ({form, field})=>{
                                          const {setFieldValue} = form;
                                          const {value} = field;
                                          return <DateView
                                            {...field}
                                            className="form-control datetimepicker"
                                            placeholderText="Click to select a birth date"
                                            maxDate={new Date()}
                                            selected={value}
                                            dateFormat="yyyy-MM-dd"
                                            showYearDropdown
                                            onChange={(val)=>setFieldValue("birthDate", val)}
                                          />  
                                        }
                                      }
                                    </Field>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Email ID</label>
                                  <Field type="email" name="email" className="form-control" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Mobile</label>
                                  <Field type="number" name="mobile" className="form-control" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Category</label>
                                  <Field as="select" name="category" className="form-control">
                                    {
                                      categories.map((category) => {
                                        return (
                                          <option key={category.id} value={category.id}>
                                            {category.name}
                                          </option>
                                        );
                                      })
                                    }
                                  </Field>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Country</label>
                                  <Field as="select" name="country" className="form-control">
                                    {
                                      countries.map((country, index) => {
                                        return (
                                          <option key={index} value={country}>
                                            {country}
                                          </option>
                                        );
                                      })
                                    }
                                  </Field>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Address</label>
                                  <Field type="text" name="address" className="form-control" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>City</label>
                                  <Field type="text" name="city" className="form-control" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>State</label>
                                  <Field type="text" name="state" className="form-control" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>Zip Code</label>
                                  <Field type="text" name="zipCode" className="form-control" />
                                </div>
                              </div>
                              
                            </div>
                            <div className="submit-section">
                              <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                            </div>
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

export default Profile;