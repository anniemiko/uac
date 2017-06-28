import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import axios from 'axios';

var $ = require('jquery');

class ApplicationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      applications: [],
      showModal: false
    }
  }
  componentDidMount(){
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'http://universalaccesscontrol20170610103304.azurewebsites.net/api/Applications',
    }).then(response => {
      console.log('response', response);
      this.setState({applications: response})
    });
    // axios.get('http://universalaccesscontrol20170610103304.azurewebsites.net/api/Applications').then(response => this.setState(response.applications))
  }
  close(){
    this.setState({showModal: false });
  }
  open(){
    this.setState({showModal: true });
  }
  render() {
    console.log('state', this.state.applications);
    return (
      <Application applications={this.state.applications} showModal={this.state.showModal}/>
    )
  }
}

class Application extends Component {
  render(props){
    var appList = this.props.applications.map((application) => {
      console.log('applications', application)
      return (
        <tr className="application" key={application.Id} >
          <td>{application.ApplicationName}</td>
          <td>{application.ApplicationDesc}</td>
          <td><Button bsStyle="primary" bsSize="small" onClick={this.open}>Edit</Button></td>
        </tr>
      )
    });
    return(
      <div className="main-content">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Application Name</th>
              <th>Description</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {appList}
          </tbody>
        </table>
        <Modal show={this.props.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Manage applications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4>pull content from endpoints</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ApplicationContainer;
