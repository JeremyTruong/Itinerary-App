import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import Login from './react-components/Login';
import Signup from './react-components/Signup';
import Search from './react-components/Search';
import PlaceSearch from './react-components/PlaceSearch';
import About from './react-components/About';
import UserRoutes from "./react-components/UserRoutes";
import Admin from './react-components/Admin';
import User from './react-components/User';
import OtherUser from './react-components/OtherUser';

import { checkSession } from "./actions/user";
import ItinerariesRoute from "./react-components/ItinerariesRoute";
import CreateItinerary from "./react-components/CreateItinerary";
import UserSettings from "./react-components/UserSettings";


class App extends React.Component {
 
  constructor(props) {
      super(props);
  }

  componentDidMount(){
    checkSession(this)
  }

  state = {
    initialState: "Itinerary", //probably going to change this later
    currentUser: null,
    adminStatus: false
  }


  render(){
    const { currentUser, adminStatus } = this.state;
    return(
      <div>
        {<BrowserRouter>
          <Switch>
            <Route exact path='/' render={props =>
              (
                <div >
                  { /* If logged in, continue to user page, else stay on login page */}
                  {!currentUser ? <Home {...props} app={this} /> :
                      <Route path='/user' render={props =>
                      (
                          <div >
                            { /* If logged in, continue to user page, else stay on login page */}
                            {<UserRoutes {...props} app={this} />}
                          </div>
                      )}/>}
                </div>        
              )}/>
            <Route exact path={["/login", "/user"]} render={props =>
              (
                <div >
                  { /* If logged in, continue to user page, else stay on login page */}
                  {!currentUser ? <Login {...props} app={this} /> : <User {...props} app={this} />}
                </div>        
              )}/>
            <Route exact path='/signup' render={props => 
              (
                <div >
                  { /* If logged in, continue to user page, else stay on login page */}
                  {!currentUser ? <Signup {...props} app={this} /> : <User {...props} app={this} />}
                </div>        
              )}/>
            <Route exact path='/about' render={props =>
                (<About {...props} app={this}/>)}/>
            <Route exact path='/search' render={props =>
              (<Search {...props} app={this}/>)}/>
            <Route exact path='/search-places' render={props =>
              (<PlaceSearch {...props} app={this}/>)}/>
            <Route exact path='/admin' render={props => 
              (
                <div >
                  { /* If admin, continue to admin page, else bring them to login page */}
                  {!adminStatus ? <Login {...props} app={this} /> : <Admin {...props} app={this} />}
                </div>        
              )}/>
            <Route exact path='/user2' render={props =>
              (
                <div >
                  <OtherUser {...props} app={this} /> 
                </div>        
              )}/>

            <Route exact path ="/user/itinerary/:id" render = {(props) =>
                <ItinerariesRoute {...props}/>
            }/>

            <Route exact path="/user/create-itinerary" render={(props) => <CreateItinerary {...props}/>}/>

            <Route exact path="/user/settings" render={(props) => <UserSettings {...props} app={this}/>}/>

          </Switch>
        </BrowserRouter>}
      </div>
    );
  }
}

export default App;
