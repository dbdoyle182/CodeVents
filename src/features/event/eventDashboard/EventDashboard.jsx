import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { connect } from 'react-redux';
import { deleteEvent } from '../eventActions';

const mapState = state => ({
  events: state.events
});

const actions = { 
  deleteEvent  
};

class EventDashBoard extends Component {

  handleDeleteEvent = (eventId) => () => {
    console.log(eventId)
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList 
            deleteEvents={this.handleDeleteEvent}
            events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>Sidebar</h1>
        </Grid.Column>
      </Grid>
    )
  }
};

export default connect(mapState, actions)(EventDashBoard);