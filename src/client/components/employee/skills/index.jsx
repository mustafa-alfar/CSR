import React,{ useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import { Modal } from 'react-bootstrap';
// context
import {EmployeeContext} from "../../../context/employee";

function Skills () {

  const {getSkills, skills, AddSkill, updateSkill, deleteSkill, loading} = useContext(EmployeeContext);
  // state values
  const [activeModal, setActiveModal] = useState(null);
  // state language values
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getSkills();
  }, [])

  const openModal = (id) => {
	  setActiveModal(id);
  }

	const closeModal = () => {
		setActiveModal(false);
  };

  const handleAddButton = () => {
    setName("");
    openModal("add");
  }

  const handleSubmitAdd = async (e)=>{
    e.preventDefault();
    await AddSkill(name);
    closeModal();
  }

  const handleEditButton = (item) => {
    setId(item.id);
    setName(item.name);
    openModal("edit");
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateSkill({id, name});
    closeModal();
  }

  const handleDeleteButton = (id) => {
    setId(id);
    openModal("delete");
  }

  return (
    <>

    <div className="breadcrumb-bar">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12 col-12">
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/home">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Education</li>
              </ol>
            </nav>
            <h2 className="breadcrumb-title">Education</h2>
          </div>
        </div>
      </div>
    </div>

    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
            <StickyBox offsetTop={20} offsetBottom={20}>
              <DashboardSidebar />
            </StickyBox>
          </div>
          <div className="col-md-7 col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body">
                <Link to="#" className="btn btn-primary" onClick={handleAddButton}>Add Skill</Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Skills</h4>
                {
                  loading? <h3 className="text-center">Skills Loading...</h3> :
                  skills.length<1? <p className="mb-0">Click add skill to insert your first skill</p> :
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Skill</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              skills.map(item=>{
                                return (
                                  <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <button className="btn btn-sm bg-success-light" onClick={()=>handleEditButton(item)}><i className="fe fe-pencil"></i></button>
                                        <button className="btn btn-sm bg-danger-light" onClick={()=>handleDeleteButton(item.id)}><i className="fe fe-trash"></i></button>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                }

                {/*add modal*/}
                <Modal size="lg" show={activeModal === 'add'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Add Skill</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmitAdd}>
                      <div className="form-group">
                        <label htmlFor="title">Skill</label>
                        <input type="text" className="form-control" id="name" onChange={(e)=>setName(e.target.value)} />
                      </div>
                      <button className="btn btn-primary mr-2" type="submit">Add</button>
                      <button className="btn btn-primary" onClick={closeModal} type="button">Cancel</button>
                    </form>
                  </Modal.Body>
                </Modal>

                 {/*edit modal*/}
                <Modal size="lg" show={activeModal === 'edit'} onHide={closeModal} centered>
                  <Modal.Header closeButton>
                    <h5 className="modal-title">Edit Skill</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmitEdit}>
                      <div className="form-group">
                        <label htmlFor="title">Skill</label>
                        <input type="text" className="form-control" id="title" defaultValue={name} onChange={(e)=>setName(e.target.value)} />
                      </div>
                      <button className="btn btn-primary mr-2" type="submit">Edit</button>
                      <button className="btn btn-primary" onClick={closeModal} type="button">Cancel</button>
                    </form>
                  </Modal.Body>
                </Modal>

                {/* delete modal */}
                <Modal show={activeModal === 'delete'} onHide={closeModal} centered>
                  <Modal.Body className="text-center">
                    <div className="form-content p-2">
                      <h4 className="modal-title">Delete</h4>
                      <p className="mb-4">Are you sure want to delete?</p>
                      <button type="button" className="btn bg-success-light mr-2" onClick={()=>{deleteSkill(id); closeModal()}}> OK </button>
                      <button type="button" className="btn bg-danger-light" data-dismiss="modal" onClick={closeModal}>Cancel</button>
                    </div>
                  </Modal.Body>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );

}
export default Skills;
