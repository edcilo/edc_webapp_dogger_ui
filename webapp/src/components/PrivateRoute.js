import { connect } from "react-redux";
import {
    Route,
    Redirect
  } from "react-router-dom";


function PrivateRoute({ children, component, user, ...rest}) {
    let auth = user;

    if (auth.token) {
      return component ? (
        <Route {...rest} component={component}/>
      ) : (
        <Route {...rest} render={() => children} />
      )
    } else {
      return (
        <Route
          {...rest}
          render={
            ({ location }) => (<Redirect to={{ pathname: "/login", state: { from: location }}}/>)
          }
        />
      );
    }
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)
