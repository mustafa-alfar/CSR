import React, { useContext, useState, useEffect } from 'react';
import DoctorSidebar from '../sidebar/index';
import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// context
import { EmployerContext } from "../../../context/employer";
import { UserContext } from "../../../context/user";
import DateView from "react-datepicker";
import moment from "moment";
import ActionLoading from "../../loading/actionloading";

function ProfileSetting () {

  // context values
  const {getProfile, profile, setProfile, loading} = useContext(EmployerContext);
  const {getCountries, countries} = useContext(UserContext);
  const {employeeInfo} = profile;
  const {country_id, email, mobile, photo, name, birthDate, address, city, state, zipCode, pref} = employeeInfo;
  const imageUrl = photo? `http://joodya.com/crs/public/images/${photo}` : IMG01;

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState("");

	useEffect( () => {
    getProfile();
    getCountries();
  }, [])
  
  const handleChange = (files) => {
    setFiles(files);
  }

  const initialValues = () => {
    const date = (!birthDate || birthDate === "0000-00-00 00:00:00")? new Date() : new Date(birthDate);
    return {
      photo: photo || null,
      name: name || '',
      birthDate: date,
      email: email || '',
      mobile: mobile || '',
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
    <>
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
              <DoctorSidebar />
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">

              <Formik
                initialValues={initialValues()}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}
                enableReinitialize={true}
              >
                {(formik)=>{
                const {setFieldValue, isSubmitting} = formik;
                  return (
                    <Form>
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Basic Information</h4>
                          <div className="row form-row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <div className="change-avatar">
                                  <div className="profile-img">
                                    <img src={preview || imageUrl} alt="User"/>
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
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Name <span className="text-danger">*</span></label>
                                <Field type="text" name="name" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Email <span className="text-danger">*</span></label>
                                <Field type="email" name="email" className="form-control"/>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Phone Number</label>
                                <Field type="text" name="mobile" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group mb-0">
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
                          </div>
                        </div>
                      </div>
                    
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">About Me</h4>
                          <div className="form-group mb-0">
                            <textarea className="form-control" rows="5"></textarea>
                          </div>
                        </div>
                      </div>
            
                      <div className="card contact-card">
                        <div className="card-body">
                          <h4 className="card-title">Contact Details</h4>
                          <div className="row form-row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Address</label>
                                <Field type="text" name="address" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">City</label>
                                <Field type="text" name="city" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">State</label>
                                <Field type="text" name="state" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">Country</label>
                                <Field as="select" name="country" className="form-control">
                                  <option value="" disabled>Select Country</option>
                                  <option value="Germany">Germany</option>
                                    {/* {
                                      countries.map((country, index) => {
                                        return (
                                          <option key={index} value={country}>
                                            {country}
                                          </option>
                                        );
                                      })
                                    } */}
                                </Field>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">Postal Code</label>
                                <Field type="text" name="zipCode" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                
                      <div className="submit-section submit-btn-bottom">
                        <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                          <span>Save Changes</span>
                          <ActionLoading loading={loading} />
                        </button>
                      </div>

                    </Form>
                  )
                }}
              </Formik>

            </div>
          </div>
				</div>
			</div>
    </>
  );
}

export default ProfileSetting;