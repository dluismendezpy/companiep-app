import React from "react";
import { API_ENDPOINT, MEDIA_URL } from "../constValues";
import { Button, Modal, Alert, Table } from "react-bootstrap";

export default class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      employees: [],
      show: false,
      modalTitle: "",
      employeeId: 0,
      employeeName: "",
      employeeDepartment: "",
      employeeDateOfJoining: "",
      employeePhotoFileName: "",
      employeePhotoFilePath: MEDIA_URL,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getEmployees();
      this.getDepartments();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getEmployees = () => {
    fetch(`${API_ENDPOINT}/employee`, {
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
            employees: responseJson,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  getDepartments = () => {
    fetch(`${API_ENDPOINT}/department`, {
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

  createEmployee = () => {
    fetch(`${API_ENDPOINT}/employee`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Name: this.state.employeeName,
        Department: this.state.employeeDepartment,
        DateOfJoining: this.state.employeeDateOfJoining,
        PhotoFileName: this.state.employeePhotoFileName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.handleClose();
      })
      .catch((err) => Alert(err.message));
  };

  updateEmployee = () => {
    fetch(`${API_ENDPOINT}/employee`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Id: this.state.employeeId,
        Name: this.state.employeeName,
        Department: this.state.employeeDepartment,
        DateOfJoining: this.state.employeeDateOfJoining,
        PhotoFileName: this.state.employeePhotoFileName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.handleClose();
      })
      .catch((err) => Alert(err.message));
  };

  deleteEmployee = (Id) => {
    fetch(`${API_ENDPOINT}/employee/${Id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
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
      modalTitle: "Add employee",
      employeeId: 0,
      employeeName: "",
      employeeDepartment: "",
      employeeDateOfJoining: "",
      employeePhotoFileName: "anonymous.png",
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  changeEmployeeName = (name) => {
    this.setState({ employeeName: name.target.value });
  };

  changeEmployeeDepartment = (department) => {
    this.setState({ employeeDepartment: department.target.value });
  };

  changeEmployeeDateOfJoining = (dateOfJoining) => {
    this.setState({ employeeDateOfJoining: dateOfJoining.target.value });
  };

  updateEmployeeWindow = (emp) => {
    this.setState({
      show: true,
      modalTitle: "Add employee",
      employeeId: emp.Id,
      employeeName: emp.Name,
      employeeDepartment: emp.Department,
      employeeDateOfJoining: emp.DateOfJoining,
      employeePhotoFileName: emp.PhotoFileName,
    });
  };

  changeImageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(`${API_ENDPOINT}/employee/SaveFile`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((photo) => {
        this.setState({
          employeePhotoFileName: photo,
        });
      });
  };

  render() {
    return (
      <div style={{ marginLeft: "7%", marginRight: "7%" }} className="App">
        <Button
          type="button"
          variant="link"
          className="m-2 float-end"
          data-bs-toggle="modal"
          onClick={() => this.addClick()}
        >
          Add employee
        </Button>
        <h3 className="d-flex justify-content-center m-3">Employee page</h3>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>DOJ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((emp) => (
              <tr key={emp.Id}>
                <td>{emp.Id}</td>
                <td>{emp.Name}</td>
                <td>{emp.Department}</td>
                <td>{emp.DateOfJoining}</td>
                <td>
                  <Button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.updateEmployeeWindow(emp)}
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
                  <Button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteEmployee(emp.Id)}
                  >
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
        </Table>

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
                value={this.state.employeeName}
                onChange={this.changeEmployeeName}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Department</span>
              <select
                className="form-select"
                onChange={this.changeEmployeeDepartment}
                value={this.state.employeeDepartment}
              >
                {this.state.departments.map((dep) => (
                  <option key={dep.Id}>{dep.Name}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Date Of Joining</span>
              <input
                type="date"
                className="form-control"
                value={this.state.employeeDateOfJoining}
                onChange={this.changeEmployeeDateOfJoining}
              />
            </div>
            <div className="p-2 w-50">
              <img
                width="280px"
                height="250px"
                src={`${this.state.employeePhotoFilePath}/${this.state.employeePhotoFileName}`}
              />
              <input
                className="m-2"
                type="file"
                onChange={this.changeImageUpload}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            {this.state.employeeId === 0 ? (
              <Button onClick={this.createEmployee}>Add</Button>
            ) : (
              <Button onClick={this.updateEmployee}>Edit</Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
