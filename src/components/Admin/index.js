import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import './Admin.css'
import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import ToolBar from './ToolBar/ToolBar';
import Sidebar from './Sidebar/Sidebar';
import ListUsers from './UserList/ListUsers'
const AdminPage = () => (
  <div>

     <div className="gradient__bg">
      <Navigation />
      </div>
      <ToolBar/>
      <div className="myContainer">
        <Sidebar/>
         <ListUsers/>
      </div>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
    </Switch>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
