import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';




const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if(eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  render() {
    
    return (
            <Grid>
              <Grid.Column width={10}>
                <Segment>
                  <Header sub color='teal' content='Event Details'/>
                  <Form>
                    <Field 
                      name='title' 
                      type='text' 
                      component={TextInput} 
                      placeholder='Give your event a name'
                    />
                    <Field 
                      name='category' 
                      type='text' 
                      component={SelectInput} 
                      options={category}
                      placeholder='What is your event about'
                    />
                    <Field 
                      name='description' 
                      type='text' 
                      row={3} 
                      component={TextArea} 
                      placeholder='Tell us about your event'
                    />
                    <Header sub color='teal' content='Event Location Details'/>
                    <Field name='city' type='text' component={TextInput} placeholder='Event City'/>
                    <Field name='venue' type='text' component={TextInput} placeholder='Event Venue'/>
                    <Field name='date' type='text' component={TextInput} placeholder='Event Date'/>
                    
                    <Button positive onClick={this.handleFormSubmit} type="submit">
                      Submit
                    </Button>
                    <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid>
            
    )
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm'})(EventForm));
