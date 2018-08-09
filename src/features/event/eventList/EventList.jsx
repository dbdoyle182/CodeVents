import React, { Component } from 'react'
import EventListItem from './EventListItem';

export default class EventList extends Component {
  render() {
    const {events, deleteEvents} = this.props;
    return (
      <div>
        {events && events.map((event) => (
          <EventListItem 
          key={event.id} 
          event={event} 
          deleteEvents={deleteEvents} 
          />
        ))}  
      </div>
    )
  }
}
