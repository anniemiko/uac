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
  render() {
    console.log('state', this.state.applications);
    return (
      <Application applications={this.state.applications} />
    )
  }
}

class Application extends Component {
  constructor(props){
    super(props)
    this.state = { showModal: false };
  }

  render(props){
    var self = this;
    var appList = this.props.applications.map((application) => {
      console.log('applications', application)
        console.log('showModal', this.state.showModal)
      return (
        <tr className="application" key={application.Id} >
          <td>{application.ApplicationName}</td>
          <td>{application.ApplicationDesc}</td>
          <td><Button bsStyle="primary" bsSize="small"
            onClick={()=>{self.setState({showModal: true })}}
>Edit</Button></td>
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
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Manage applications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4>pull content from endpoint</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{self.setState({showModal: false })}}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ApplicationContainer;
