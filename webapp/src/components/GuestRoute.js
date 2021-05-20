import { connect } from "react-redux";
import {
    Route,
    Redirect
  } from "react-router-dom";


function GuestRoute({ children, user, ...rest}) {
    let auth = user;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.token === null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
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

export default connect(mapStateToProps)(GuestRoute)
