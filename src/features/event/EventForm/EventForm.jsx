import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}
export default class EventForm extends Component {
  state = {
    event: emptyEvent
  }

  componentDidMount() {
    if (this.props.selectedEvent != null) {
      this.setState({
        event: this.props.selectedEvent,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('current', this.props.selectedEvent);
    console.log('next:', nextProps.selectedEvent);

    if(nextProps.selectedEvent !== this.props.selectedEvent){
      this.setState({
        event: nextProps.selectedEvent || emptyEvent,
      })
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event)
    } else {
      this.props.createEvents(this.state.event)
    }
  }

  onInputChange = (event) => {
    const newEvent = this.state.event
    newEvent[event.target.name] = event.target.value;
    
    this.setState({
      event: newEvent
    })
   
  }
  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
            <Segment>
              <Form>
                <Form.Field>
                  <label>Event Title</label>
                  <input name="title" value={event.title} onChange={this.onInputChange} placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                  <label>Event Date</label>
                  <input name="date" value={event.date} onChange={this.onInputChange} type="date" placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input name="city" value={event.city} onChange={this.onInputChange} placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                  <label>Venue</label>
                  <input name="venue" value={event.venue} onChange={this.onInputChange} placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                  <label>Hosted By</label>
                  <input name="hostedBy" value={event.hostedBy} onChange={this.onInputChange} placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive onClick={this.handleFormSubmit} type="submit">
                  Submit
                </Button>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
              </Form>
            </Segment>
    )
  }
}
