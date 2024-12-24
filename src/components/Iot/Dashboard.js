import IotNav from './iotNav/IotNav'
import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import Messages from '../Messages';
import * as ROUTES from '../../constants/routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import SignInPage from '../SignIn';

import GaugeScreen from './Gauges/GaugeScreen';
import IotButtonScreen from './IotButtons/IotButtonScreen';
import IotGraphScreen from './IotGraph/IotGraphScreen';
import DownloadData from './DataDownload/DownloadData'
import IotTabBar from './IotTabBar/IotTabBar';
function Dashboard() {
    let { path, url } = useRouteMatch();
  return (
    <div>
        <AuthUserContext.Consumer>
     
     {authUser => 
      authUser ? (
         
       <div className=" ">
            <IotNav/>
      
        <div className="container">
        <div className="row">
           <div className="col">

           </div>
         </div>
        </div>
 
         <Switch>
      
      <Route path={`${path}/gauges`}>
      <GaugeScreen authUser={authUser} />
      </Route>
      <Route path={`${path}/buttons`}>
      <IotButtonScreen authUser={authUser}/>
      </Route>
      <Route path={`${path}/graphes`}>
      <IotGraphScreen authUser={authUser}/>
      </Route>
      <Route path={`${path}/download-data`}>
      <DownloadData authUser={authUser}/>
      </Route>
    </Switch>
       </div>
       
      
     ):(
        <SignInPage/>
     )}
     
   </AuthUserContext.Consumer>
         
    </div>
  )
}

export default Dashboard