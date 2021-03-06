import React, { Component } from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

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
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    const { event } = this.props
    return (
         <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
              <Image src={`/assets/categoryImages/${event.category}.jpg`} style={eventImageStyle} fluid />
      
              <Segment basic style={eventImageTextStyle}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Header
                        size="huge"
                        content={event.title}
                        style={{ color: 'white' }}
                      />
                      <p>{format(event.date, 'dddd Do MMMM')}</p>
                      <p>
                        Hosted by <strong>{event.hostedBy}</strong>
                      </p>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment>
      
            <Segment attached="bottom">
              <Button style={eventButtonStyle}>Cancel My Place</Button>
              <Button style={joinButtonStyle} color="teal">JOIN THIS EVENT</Button>
      
              <Button as={Link} to={`/manage/${event.id}`}style={eventButtonStyle} color="orange" floated="right">
                Manage Event
              </Button>
            </Segment>
          </Segment.Group>
    )
  }
}

export default EventDetailedHeader
