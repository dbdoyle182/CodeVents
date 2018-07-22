import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashBoard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/navBar/NavBar';
class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container className="main">
          <EventDashBoard/>
        </Container>
      </div>
    );
  }
}

export default App;