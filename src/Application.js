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
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     applications: []
  //   }
  // }
  componentWillReceiveProps(){
    console.log('props', this.props.applications);
  }
  render(props){
    var appList = this.props.applications.map((application) => {
      console.log('applications', application)
      return (
        <li className="application" key={application.Id} >
          <h4>{application.ApplicationName}</h4>
          <h4>{application.ApplicationDesc}</h4>
        </li>
      )
    });
    return(
      <div className="main-content">
        <h2>Applications</h2>
        <ul className="group">
          {appList}
        </ul>
      </div>
    )
  }
}

export default ApplicationContainer;
