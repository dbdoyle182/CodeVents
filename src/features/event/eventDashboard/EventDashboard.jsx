import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

const mapState = state => ({
  events: state.events
});

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
};

class EventDashBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedEvent: null
    }

    
  }

  // Toggles the event form on click
  handleFormToggle = () => {
    this.setState({
      selectedEvent: null,
      isOpen: !this.state.isOpen
    })
  }

  // Creates a new event
  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.props.createEvent(newEvent)
    this.setState({
      isOpen: false
    })
  }

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent)
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  }

  handleOpenEvent = (eventToOpen) => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    })
  }

  handleDeleteEvent = (eventId) => () => {
    console.log(eventId)
    this.props.deleteEvent(eventId)
  }

  render() {
    const {selectedEvent} = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList 
            deleteEvents={this.handleDeleteEvent} 
            onEventOpen={this.handleOpenEvent} 
            events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive content='Create Event' onClick={this.handleFormToggle} />
          {this.state.isOpen &&
            <EventForm 
              selectedEvent={selectedEvent}
              handleCancel={this.handleFormToggle} 
              createEvents={this.handleCreateEvent}
              updateEvent={this.handleUpdateEvent}
            />
          }
        </Grid.Column>
      </Grid>
    )
  }
};

export default connect(mapState, actions)(EventDashBoard);