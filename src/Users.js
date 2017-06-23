import React, { Component } from 'react';
const $ = require('jquery')

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
  render(props){
    var userList;
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

      </div>
    )
  }
}

export default UserContainer;
