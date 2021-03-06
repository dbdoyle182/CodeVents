import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layouts/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity'

const mapState = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
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
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList 
            deleteEvents={this.handleDeleteEvent}
            events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity/>
        </Grid.Column>
      </Grid>
    )
  }
};

export default connect(mapState, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashBoard)
);