import { connect } from "react-redux";
import {
    Route,
    Redirect
  } from "react-router-dom";


function PrivateRoute({ children, user, ...rest}) {
    let auth = user;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)
