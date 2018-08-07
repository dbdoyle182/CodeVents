import React, { Component } from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const eventButtonStyle = {
  width: '30%',
}

const joinButtonStyle = {
  width: '36%'
}

export class EventDetailedHeader extends Component {
  render() {
    return (
         <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
              <Image src="/assets/categoryImages/drinks.jpg" style={eventImageStyle} fluid />
      
              <Segment basic style={eventImageTextStyle}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Header
                        size="huge"
                        content="Event Title"
                        style={{ color: 'white' }}
                      />
                      <p>Event Date</p>
                      <p>
                        Hosted by <strong>Hosted by</strong>
                      </p>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment>
      
            <Segment attached="bottom">
              <Button style={eventButtonStyle}>Cancel My Place</Button>
              <Button style={joinButtonStyle} color="teal">JOIN THIS EVENT</Button>
      
              <Button style={eventButtonStyle} color="orange" floated="right">
                Manage Event
              </Button>
            </Segment>
          </Segment.Group>
    )
  }
}

export default EventDetailedHeader
