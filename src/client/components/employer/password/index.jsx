import React, { useContext } from 'react';
import EmployerSidebar from "../sidebar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// context
import { UserContext } from "../../../context/user";
import ActionLoading from "../../loading/actionloading";

function Password (){

  const {changePassword, loading} = useContext(UserContext);

  const initialValues = () => {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    await changePassword(values);
    actions.resetForm({
      values: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
    });
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

      <div class="content">
        <div class="container-fluid">
          <div class="row">

            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <EmployerSidebar />
            </div>

            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <Formik
                    initialValues={initialValues()}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                  >
                    {(formik)=>{
                      const {isSubmitting} = formik;
                      return (
                        <Form>
                          <div class="form-group">
                            <label>Old Password</label>
                            <Field type="password" name="oldPassword" class="form-control" />
                            <ErrorMessage name="oldPassword" />
                          </div>
                          <div class="form-group">
                            <label>New Password</label>
                            <Field type="password" name="newPassword" class="form-control" />
                            <ErrorMessage name="newPassword" />
                          </div>
                          <div class="form-group">
                            <label>Confirm Password</label>
                            <Field type="password" name="confirmPassword" class="form-control" />
                            <ErrorMessage name="confirmPassword" />
                          </div>
                          <div class="submit-section">
                            <button type="submit" class="btn btn-primary submit-btn" disabled={isSubmitting}>
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
        </div>
      </div>   
    </>
  );
} 
export default Password;   
        

