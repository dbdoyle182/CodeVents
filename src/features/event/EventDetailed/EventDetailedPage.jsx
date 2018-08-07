import React, { Component } from 'react'
import { EventDetailedHeader } from './EventDetailedHeader';
import { EventDetailedChat } from './EventDetailedChat';
import { EventDetailedInfo } from './EventDetailedInfo';
import { EventDetailedSidebar } from './EventDetailedSidebar';
import { Grid } from 'semantic-ui-react';
export default class EventDetailedPage extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader/>
          <EventDetailedInfo/>
          <EventDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar/>
        </Grid.Column>
      </Grid>
    )
  }
}
