import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import BasicPage from './BasicPage';
import AccountPage from './AccountPage';
import { updatePassword } from '../../auth/authActions';

const actions = {
  updatePassword
}

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
})

class SettingsDashboard extends Component {
  render() {
    const { updatePassword, providerId, user } = this.props
    return (
      <Grid>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from='/settings' to='/settings/basic' />
            <Route path='/settings/basics' render={() => <BasicPage initialValues={user}/>}/>
            <Route path='/settings/about' component={AboutPage}/>
            <Route path='/settings/photos' component={PhotosPage}/>
            <Route path='/settings/account' render={() => <AccountPage updatePassword={updatePassword} providerId={providerId}/>}/>
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
          <SettingsNav/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(SettingsDashboard);
