import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { differenceInYears, format } from 'date-fns';

const query = ({auth}) => {
  return [
      {
          collection: 'users',
          doc: auth.uid,
          subcollections: [{collection: 'photos'}],
          storeAs: 'photos'
      }
  ]
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
})


class UserDetailedPage extends Component {

    render() {
        const { auth, profile, photos } = this.props
        let age;
        let profileCreated;
       
        if ( profile.dateOfBirth) {
          age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
        } else {
          age = 'unknown age'
        }
        if (profile.createdAt) {
          profileCreated = format(profile.createdAt.toDate(), 'MMM DD, YYYY')
        } else {
          profileCreated = "Unknown"
        }
       
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={auth.photoURL || '/assets/user.png'}/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{auth.displayName}</Header>
                                    <br/>
                                    <Header as='h3'>{profile.occupation || "unknown"}</Header>
                                    <br/>
                                    <Header as='h3'>{age}, Lives in {profile.city || "Unknown"}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>{profile.occupation || "Unknown"}</strong></p>
                                <p>Originally from <strong>{profile.city || "Unknown"}</strong></p>
                                <p>Member Since: <strong>{profileCreated}</strong></p>
                                <p>{profile.about || "There is no user biography yet"}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                {profile.interests ? profile.interests.map((interest, iterator) => (
                                  <Item key={iterator}>
                                    <Icon name='heart'/>
                                    <Item.Content>{interest}</Item.Content>
                                  </Item>
                                ))
                                :
                                <p>The user has no selected interests</p>
                                }         
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                        
                        <Image.Group size='small'>
                            {photos && 
                              photos.length > 0 ? photos.map(photo => (
                                  <Image src={photo.url} alt={photo.name} key={photo.id}/>
                                ))
                                :
                                <p>You currently have no photos! Add one <a as={Link} to='/settings/photos'>here</a></p>
                              
                            }
                        </Image.Group>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
                            <Menu.Item name='Future Events'/>
                            <Menu.Item name='Events Hosted'/>
                        </Menu>

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default compose(
  connect(mapState, null),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);