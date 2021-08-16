import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from './redux/actions';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import Walkers from './pages/Walkers';

  
function App({ user, userLogout }) {
  return (
    <Router>
      <div className="flex h-screen bg-gray-800 ">
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          <Header user={user} logoutHandler={userLogout}/>

          <Switch>
            <GuestRoute path="/login">
              <Login />
            </GuestRoute>
            <PrivateRoute path="/walker/:id" component={Reservations} />
            <PrivateRoute path="/">
              <Walkers />
            </PrivateRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { userLogout })(App)
