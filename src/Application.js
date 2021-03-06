import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
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
    this.state = {
      showModal: false,
      appName: this.props.applications.ApplicationName,
      description: this.props.applications.ApplicationDesc
    };
    console.log("appname", this.props.applications.ApplicationDesc);
  }
  handleNameChange(e) {
    this.setState({appName: e.target.value})
  }
  handleDescChange(e) {
    this.setState({description: e.target.value})
  }
  render(props){
    var self = this;
    var name = <FormControl onChange={this.handleNameChange} type='text' className="form-control" value={this.state.appName}/>
    console.log("appName", this.state.appName);
    var desc = <FormControl onChange={this.handleDescChange} type='text' className="form-control" value={this.state.description}/>
    var appList = this.props.applications.map((application) => {
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
              <form>
                <FormGroup controlId="formBasicText" >
                  <ControlLabel>Application Name</ControlLabel>
                  {name}
                  <ControlLabel>Application Description</ControlLabel>
                  {desc}
                </FormGroup>
              </form>
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
