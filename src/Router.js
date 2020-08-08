import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { history } from "./history";
import { ContextLayout } from "./utility/context/Layout";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const Member = lazy(() => import("./views/pages/Member"));

const Login = lazy(() => import("./views/pages/Login"));

const Calendar = lazy(() => import("./views/pages/Calendar"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.auth?.role || "-"}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    const isAuthenticated = this.props.auth.token;

    let routes;
    if (isAuthenticated) {
      routes = (
        <Router history={history}>
          <Switch>
            <AppRoute exact path="/" component={Home} />
            <AppRoute path="/members" component={Member} />
            <AppRoute path="/calendar" component={Calendar} />
            <Redirect to="/" />
          </Switch>
        </Router>
      );
    } else {
      routes = (
        <Router history={history}>
          <Switch>
            <AppRoute path="/login" component={Login} fullLayout />
            <Redirect to="/login" />
          </Switch>
        </Router>
      );
    }

    return routes;
  }
}

export default connect(mapStateToProps)(AppRouter);
