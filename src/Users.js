import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
const $ = require('jquery');

class UserContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'http://universalaccesscontrol20170610103304.azurewebsites.net/api/accounts/',
    }).then(response => {
      console.log('user response', response);
      this.setState({users: response})
    });
    // axios.get('http://universalaccesscontrol20170610103304.azurewebsites.net/api/Applications').then(response => this.setState(response.applications))
  }
  render() {
    console.log('user state', this.state.users);
    return (
      <Users users={this.state.users} />
    )
  }
}

class Users extends Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false,

    };
  }
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleRoleChange(e) {
    this.setState({role: e.target.value})
  }
  render(props){
    var self = this;
    var name = <FormControl onChange={this.handleNameChange} type='text' className="form-control" value={this.state.name}/>
    var role = <FormControl onChange={this.handleRoleChange} type='text' className="form-control" value={this.state.role}/>

    console.log('props', this.props.users);
    if(this.props.users) {
    var userList = this.props.users.map((user) => {
      return (
        <tr className="user" key={user.Id} >
          <td>{user.Id}</td>
          <td>{user.FirstName}</td>
          <td>{user.LastName}</td>
          <td>{user.UserName}</td>
          <td>{user.IsActive}</td>
          <td><Button bsStyle="primary" bsSize="small"
              onClick={()=>{self.setState({showModal: true })}}
  >Edit</Button></td>
        </tr>
      )
    });
  }
    return(
      <div className="main-content">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {userList}
          </tbody>
        </table>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Manage Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>
                <FormGroup controlId="formBasicText" >
                  <ControlLabel>User Name</ControlLabel>
                  {name}
                  <ControlLabel>User Roles</ControlLabel>
                  {role}
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

export default UserContainer;
