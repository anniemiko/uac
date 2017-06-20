import React, { Component } from 'react';
// import ApplicationList from

class Application extends Component {
  render() {
    // let applications = ApplicationList.map((application) => {
    //   return (
    //     <li className="application" key={application.id} >
    //       <h4>{application.ApplicationName}</h4>
    //       <h4>{application.ApplicationDesc}</h4>
    //     </li>
    //   )
    // });
    return (
      <div className="main-content">
      <h2>Applications</h2>
      <ul className="group">
        App1
        App2
        App3
      </ul>
    </div>
    )
  }
}

export default Application;
