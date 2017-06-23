import React, { Component } from 'react';
// import axios from 'axios';

const $ = require('jquery')

class ApplicationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      applications: []
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
  render(props){
    var appList = this.props.applications.map((application) => {
      console.log('applications', application)
      return (
        <tr className="application" key={application.Id} >
          <td>{application.ApplicationName}</td>
          <td>{application.ApplicationDesc}</td>
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
            </tr>
          </thead>
          <tbody>
            {appList}
          </tbody>
        </table>

      </div>
    )
  }
}

export default ApplicationContainer;
