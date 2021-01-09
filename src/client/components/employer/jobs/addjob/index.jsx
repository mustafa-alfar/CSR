import React,{ useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import DoctorSidebar from '../../sidebar';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import DateView from "react-datepicker";
// react CKEditor text editor
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from "moment";
// context
import { EmployerContext } from "../../../../context/employer";
import ActionLoading from "../../../loading/actionloading";

function AddJob () {

  const history = useHistory();
  // context values
  const { getCategoriesListToken, categoriesListToken, addJob, loading } = useContext(EmployerContext);
  const [subCategories, setSubCategories] = useState([]);
  // const [details, setDetails] = useState("");

  useEffect(() => {
    getCategoriesListToken();
  }, [])

  const changeCtegory = (event) => {
    const subCategories = categoriesListToken.find(cntry => cntry.id == event.target.value).sub_category;
		setSubCategories(subCategories);
	}

  const initialValues = () => {
    return {
      title: '',
      category: '',
      subCategory: "",
      details: '',
      requirements: [''],
      responsibilities: [''],
      finishAt: new Date(),
      image: null,
    }
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    details: Yup.string().required("Required"),
  });

  const handleSubmit = async values => {
    let {requirements, responsibilities, finishAt} = values;
    requirements = JSON.stringify(requirements);
    responsibilities = JSON.stringify(responsibilities);
    finishAt = moment(finishAt).format("YYYY-MM-DD");
    await addJob({...values, requirements, responsibilities, finishAt});
    history.push("/employer/jobs");
  }

  return(
    <div>

      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/doctor/appointments">Jobs</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Job</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Add Job</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="appointments">
                <StickyBox offsetTop={50} offsetBottom={20}>
                  <DoctorSidebar />
                </StickyBox>
              </div>
            </div>

            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="appointments">

                <Formik
                  initialValues={initialValues()}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  validateOnChange={false}
                >
                  {(formik)=>{
                  const {setFieldValue, handleChange, isSubmitting} = formik;
                    return (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="title">Job Title <span className="text-danger">*</span></label>
                          <Field type="text" id="title" name="title" className="form-control" />
                          <ErrorMessage name="title" />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="category">Category <span className="text-danger">*</span></label>
                            <Field as="select" name="category" id="category" className="form-control"
                              onChange={(e)=>{changeCtegory(e); handleChange(e)}}
                            >
                              <option value="" disabled>Select Category</option>
                              {
                                categoriesListToken.map((category) => {
                                  return (
                                    <option key={category.id} value={category.id}>
                                      {category.name}
                                    </option>
                                  );
                                })
                              }
                            </Field>
                            <ErrorMessage name="category" />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="subCategory">Sub Category</label>
                            <Field as="select" name="subCategory" id="subCategory" className="form-control">
                              <option value="" disabled>Select Sub Category</option>
                              {
                                subCategories.map(subCategory => {
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
                        <div className="form-group">
                          <label htmlFor="details">Details <span className="text-danger">*</span></label>
                          <Field as="textarea" id="details" name="details" className="form-control" rows="7" />
                          <ErrorMessage name="details" />
                        </div>
                        <div className="form-group">
                          <label>Requirements</label>
                          <FieldArray name="requirements">
                            {
                              (fieldArrayProps)=>{
                                const {push, remove, form: {values}} = fieldArrayProps;
                                const {requirements} = values;
                                return <div>
                                  {
                                    requirements.map((item, index)=>(
                                      <div key={index}>
                                        <div className="input-group mb-1">
                                          <Field type="text" name={`requirements[${index}]`} className="form-control" />
                                          <div className="input-group-append">
                                            {index>0 &&
                                              <button  type="button" className="btn bg-danger-light" onClick={()=>remove(index)}> - </button>
                                            }
                                            <button  type="button" className="btn bg-info-light" onClick={()=>push('')}> + </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              }
                            }
                          </FieldArray>
                        </div>
                        <div className="form-group">
                          <label>Responsibilities</label>
                          <FieldArray name="responsibilities">
                            {
                              (fieldArrayProps)=>{
                                const {push, remove, form: {values}} = fieldArrayProps;
                                const {responsibilities} = values;
                                return <div>
                                  {
                                    responsibilities.map((item, index)=>(
                                      <div key={index}>
                                        <div className="input-group mb-1">
                                          <Field type="text" name={`responsibilities[${index}]`} className="form-control" />
                                          <div className="input-group-append">
                                            {index>0 &&
                                              <button  type="button" className="btn bg-danger-light" onClick={()=>remove(index)}> - </button>
                                            }
                                            <button  type="button" className="btn bg-info-light" onClick={()=>push('')}> + </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              }
                            }
                          </FieldArray>
                        </div>
                        <div className="form-group">
                          <label>Finish At</label>
                          <Field name="finishAt">
                            {
                              ({form, field})=>{
                                const {setFieldValue} = form;
                                const {value} = field;
                                return <DateView
                                  {...field}
                                  className="form-control datetimepicker"
                                  minDate={new Date()}
                                  selected={value}
                                  dateFormat="yyyy-MM-dd"
                                  showYearDropdown
                                  onChange={(val)=>setFieldValue("finishAt", val)}
                                />
                              }
                            }
                          </Field>
                        </div>
                        <div className="form-group">
                          <label htmlFor="image">Image File</label>
                          <Field type="file" name="file" id="image" className="form-control" onChange={(event) =>{
                              setFieldValue("image", event.currentTarget.files[0]);
                            }}
                          />
                        </div>
                        <div className="submit-section mb-5">
                          <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                            <span>Add</span>
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
  );
}

export default AddJob;
