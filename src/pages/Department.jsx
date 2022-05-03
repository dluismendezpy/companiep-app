import React from "react";
import { API_ENDPOINT } from "../constValues";
import { Button, Modal, Alert } from "react-bootstrap";

export default class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      show: false,
      modalTitle: "",
      departmentName: "",
      departmentId: 1,
    };
  }

  getEndpoint = () => {
    return `${API_ENDPOINT}/department`;
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getDepartments();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getDepartments = () => {
    fetch(this.getEndpoint(), {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length === 0) {
          console.log("NO DATA FOUND!");
        } else {
          this.setState({
            departments: responseJson,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  createDepartment = () => {
    fetch(this.getEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Name: this.state.departmentName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.handleClose();
      })
      .catch((err) => Alert(err.message));
  };

  addClick = () => {
    this.setState({
      show: true,
      modalTitle: "Add department",
      departmentId: 0,
      departmentName: "",
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  changeDepartmentName = (name) => {
    {
      console.log("HOLA: " + name.target.value);
    }
    this.setState({ departmentName: name.target.value });
  };

  editClick = (dep) => {
    this.setState({
      show: true,
      modalTitle:
        dep.Name.length > 0 ? `Edit ${dep.Name} department` : "Edit department",
      departmentId: dep.Id,
      departmentName: dep.Name,
    });
  };

  render() {
    return (
      <div className="App">
        <Button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#departmentModal"
          onClick={() => this.addClick()}
        >
          Add department
        </Button>
        <h3 className="d-flex justify-content-center m-3">Department page</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.departments.map((dep) => (
              <tr key={dep.Id}>
                <td>{dep.Id}</td>
                <td>{dep.Name}</td>
                <td>
                  <Button
                    type="button"
                    className="btn btn-lightmr-1"
                    onClick={() => this.editClick(dep)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </Button>
                  <Button type="button" className="btn btn-lightmr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*Modal*/}
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.modalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="input-group mb-3">
              <span className="input-group-text">Name</span>
              <input
                type="text"
                className="form-control"
                value={this.state.departmentName}
                onChange={this.changeDepartmentName}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            {this.state.departmentId === 0 ? (
              <Button onClick={this.createDepartment}>Add</Button>
            ) : (
              <Button onClick={this.handleClose}>Edit</Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
