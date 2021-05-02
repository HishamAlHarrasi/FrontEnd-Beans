import "./App.css";
import SignupPage from "./components/NewUserPage/SignupPage";
import { Switch, Redirect, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage/HomePage.jsx/HomePage";
import NotFound from "./components/NotFoundPage/NotFound";
import AdminPage from "./components/AdminPage/AdminPage";
import FarmsPage from "./components/FarmsPage/FarmsPage";
import ManageUsersPage from "./components/ManageUsersPage/ManageUsersPage";
import EditUserPage from "./components/EditUserPage/EditUserPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ManageFarmPage from "./components/ManageFarmPage/ManageFarmPage";
import ManageSensorPage from "./components/ManageSensorPage/ManageSensorPage";
import checkJWT from "./components/shared/checkJWT";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

const App = () => {
  let access_token = window.localStorage.getItem("access_token");
  // let decoded = jwtDecode(access_token);

  return (
    <div>
      <>
        <ToastContainer
          draggable={false}
          transition={Zoom}
          autoClose={5000}
          preventDuplicates
        />
      </>
      {window.localStorage.getItem("access_token") !== null ? (
        jwtDecode(window.localStorage.getItem("access_token")).admin ? (
          <div>
            <Navbar />
            <div className="content">
              <Switch>
                <Route
                  path="/farms/:farmid/:nodeid/:sensorid"
                  component={ManageSensorPage}
                />
                <Route path="/farms/:id" component={ManageFarmPage} />
                <Route
                  path="/admin/manageUsers/:id"
                  exact
                  component={(props) => <EditUserPage {...props} />}
                />
                <Route path="/admin/manageUsers" component={ManageUsersPage} />
                <Route path="/admin/addUser" component={SignupPage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/farms" component={FarmsPage} />
                <Route path="/notFound" component={NotFound} />
                <Route
                  path="/login"
                  component={(props) => <LoginPage {...props} />}
                />
                <Route path="/home" exact component={HomePage} />
                {window.location.pathname === "/" ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/notFound" />
                )}
              </Switch>
            </div>
          </div>
        ) : (
          <div>
            <Navbar />
            <div className="content">
              <Switch>
                <Route
                  path="/farms/:farmid/:nodeid/:sensorid"
                  component={ManageSensorPage}
                />
                <Route path="/farms/:farmid" component={ManageFarmPage} />
                <Route path="/farms" component={FarmsPage} />
                <Route path="/notFound" component={NotFound} />
                <Route
                  path="/login"
                  component={(props) => <LoginPage {...props} />}
                />
                <Route path="/home" exact component={HomePage} />
                {window.location.pathname === "/" ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/notFound" />
                )}
              </Switch>
            </div>
          </div>
        )
      ) : (
        <div className="content">
          <Switch>
            <Route
              path="/login"
              component={(props) => <LoginPage {...props} />}
            />
            <Redirect to="/login" />
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
