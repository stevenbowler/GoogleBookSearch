//@ts-check
/**@module 
 * @requires react
 * @requires react-router-dom
 * @requires module:/src/pages/Books
 * @requires module:/src/pages/Search
 * @requires module:/src/pages/Saved
 * @requires module:/src/pages/Detail
 * @requires module:/src/pages/NoMatch
 * @requires bootstrap
 * @requires axios
 * @requires module:/src/components/AppNavbar
 * @requires module:/src/components/LoginRegisterModals
 * @requires module:/src/components/ExtraModal
*/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import GoogleDetail from "./pages/GoogleDetail";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";  // was in original Week 20 Activity 11

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
//import { Container } from 'reactstrap';   // was used in origial MERNshell
import AppNavbar from './components/AppNavbar';
import LoginRegisterModals from './components/LoginRegisterModals';
import Modal from './components/ExtraModal';
import io from 'socket.io-client';

const socket = io();    // {transports: ['websocket']}  didn't work, github solution for socket timeouts

// set background color below navbar
//@ts-ignore
document.body.style = 'background: black;';




class App extends React.Component {
  constructor(props) {
    super(props);

    this.loggedIn = false;
    this.name = "";
    this.timerOn = false;
    this.state = {
      isOpenNavBar: false,
      isOpenLoginModal: false,
      isOpenRegisterModal: false,
      isOpenLeaderBoardModal: false,
      name: "Guest...Login",
      loggedIn: false,
      userCount: sessionStorage.getItem("userCount"),
      navBarMessage: sessionStorage.getItem("navBarMessage")
    };
    // sessionStorage.setItem("name", this.state.name);
    // sessionStorage.setItem("token", this.state.token);
    // sessionStorage.setItem("email", this.state.email);
  }


  // LIFECYCLE METHODS and related support functions
  previousUserCount = "1";
  componentDidMount() {
    this.setState({ userCount: sessionStorage.getItem("userCount") });
    if (sessionStorage["name"]) {
      console.log("app.js componentDidMount: ", this.state.name);
      this.setState({ name: sessionStorage.getItem("name") });
      this.setState({ token: sessionStorage.getItem("token") });
      this.setState({ email: sessionStorage.getItem("email") });
      this.setState({ loggedIn: (sessionStorage.getItem("loggedIn") === "true") ? true : false });
    } else console.log("sessionStorage.name doesn't exist");

    // Listening for messages from server socket handler
    socket.on("new message", data => {
      console.log("received socket message", data.msg);
      sessionStorage.setItem("navBarMessage", data.msg);
      this.setState({ navBarMessage: sessionStorage.getItem("navBarMessage") });
    });

    socket.on("user left", data => {
      console.log("user left: ", data.msg);
      sessionStorage.setItem("userCount", data.msg);
      this.setState({ userCount: sessionStorage.getItem("userCount") });
    });

    socket.on("user arrived", data => {
      console.log("user arrived: ", data.msg);
      sessionStorage.setItem("userCount", data.msg);
      this.setState({ userCount: sessionStorage.getItem("userCount") });
    });
  }

  componentDidUpdate() {
    if (this.previousUserCount !== sessionStorage.getItem("userCount")) {
      this.previousUserCount = sessionStorage.getItem("userCount");
      this.setState({ userCount: sessionStorage.getItem("userCount") });
    }
    this.userCount = sessionStorage.getItem("userCount");
    // this.setState({ userCount: sessionStorage.getItem("userCount") });
    // this.setState({ name: sessionStorage.getItem("name") });
    // this.setState({ token: sessionStorage.getItem("token") });
    // this.setState({ email: sessionStorage.getItem("email") });
  }




  // STATE HANDLERS and related support functions FROM COMPONENTS

  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleNavbar
   */
  handleToggleNavbar = () => {
    this.setState({ isOpenNavBar: !this.state.isOpenNavBar });
    if (this.state.isOpenNavBar) this.setState({ gameOn: false });
  }


  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleLeaderBoardModal
   */
  handleToggleLeaderBoardModal = () => {
    this.setState({ isOpenRegisterModal: false });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: !this.state.isOpenLeaderBoardModal });
  }



  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar
   * @function handleToggleLoginRegisterModal
   */
  handleToggleLoginRegisterModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: false });
  }


  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function
   */
  handleToggleLoginModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLeaderBoardModal: false });
    this.setState({ isOpenLoginModal: !this.state.isOpenLoginModal });
  }

  /**
   * this is object with registration data
   * @typedef {object} data
   * @property {string} name - 8+ digit user name regex alpha-numeric
   * @property {string} email - email format string
   * @property {string} password - minimum 8 digit password regex alpha-numeric
   * 
   */

  /**
   * called from LoginRegisterModals component to handle registration and login if successful register
   * @function handleRegister
   * @param {data} data 
   * */
  handleRegister = (data) => {
    // console.log("App.js handleRegister input name: " + data.name + "email: " + data.email + "password: " + data.password);

    axios
      .post(
        '/api/users/register',
        {
          name: data.name,
          email: data.email,
          password: data.password
        })
      .then(response => {
        console.log(`register user: ${response.data.name} ${response.data.date}`);
        axios
          .post(
            '/api/users/login',
            {
              email: data.email,
              password: data.password
            })
          .then(response => {
            console.log(`login user: ${response.data.user.name}`);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("name", response.data.user.name);
            sessionStorage.setItem("loggedIn", "true");

            this.setState({ token: response.data.token });
            this.setState({ email: data.email });
            this.setState({ name: response.data.user.name }); // will display name on Navbar
            this.setState({ loggedIn: true });

            socket.emit("send message", `${response.data.user.name} just registered and logged-in`);
          })
          .catch(function (error) {
            console.log("Error App.js handleLogin: ", error);
            this.setState({ name: "wrong email or pswd" }); // will display error message on Navbar
          });
        this.handleToggleLoginRegisterModal();
      })
      .catch(error => {
        console.log(" Could not register from App.js: " + error.message);
        this.handleToggleLoginRegisterModal();
      });
  }


  /**
   * @function handleLogin
   * @param {data} data
   */
  handleLogin = (data) => {
    // console.log("APp.js handleLogin data:", data);

    axios
      .post(
        '/api/users/login',
        {
          email: data.email,
          password: data.password
        })
      .then(response => {
        console.log(`login user: ${response.data.user.name}`);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("name", response.data.user.name);
        sessionStorage.setItem("loggedIn", "true");

        this.setState({ token: response.data.token });
        this.setState({ email: data.email });
        this.setState({ name: response.data.user.name }); // will display name on Navbar
        this.setState({ loggedIn: true });

        this.handleToggleLoginModal();
        socket.emit("send message", `${response.data.user.name} just logged-in`);
      })
      .catch(function (error) {
        console.log("Error App.js handleLogin: ", error);
        this.setState({ name: "wrong email or pswd" }); // will display error message on Navbar
        this.handleToggleLoginModal();
      });
  }

  /**
   * handle the logout event
   * @function handleLogout
 */
  handleLogout = () => {
    console.log(`logout: ${this.state.name}`);
    socket.emit("send message", `${this.state.name} just logged-out`);
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("email", "");
    this.setState({ name: "Guest...Login" }, () => sessionStorage.setItem("name", this.state.name));
    this.setState({ loggedIn: false });
    sessionStorage.setItem("loggedIn", "false");   // TODO this may be needed:
  }


  /**
   * handle the Changecolor event from Navbar
   * @function handleChangeColor
   */
  handleChangeColor = () => {
    console.log("changeColor");
    var randomRed = Math.floor(Math.random() * 255);
    var randomGreen = Math.floor(Math.random() * 255);
    var randomBlue = Math.floor(Math.random() * 255);
    console.log(randomGreen);
    //@ts-ignore
    document.body.style = `background-color: rgb(${randomRed}, ${randomGreen}, ${randomBlue});`;
    this.setState({ backgroundColor: `rgb(${randomRed}, ${randomGreen}, ${randomBlue})` });
  }

  /**
   * handle the Tutorial button event, play the tutorial for this app
   * @function handleTutorial
   */
  handleTutorial = () => {
    console.log("handleTutorial");
    window.location.href = "https://drive.google.com/file/d/19hRCxb8lc9-FNAyar4q8ZkUyqtEJ1loe/view";
  }


  render() {
    return (
      <Router>
        <div>
          <AppNavbar
            name={this.state.name}
            loggedIn={this.state.loggedIn}
            isOpen={this.state.isOpenNavBar}
            onRegister={this.handleToggleLoginRegisterModal}
            onLogin={this.handleToggleLoginModal}
            onLogout={this.handleLogout}
            onLeaderBoard={this.handleToggleLeaderBoardModal}
            onToggle={this.handleToggleNavbar}
            onTutorial={this.handleTutorial}
            onChangeColor={this.handleChangeColor}
            userCount={this.state.userCount}
            navBarMessage={this.state.navBarMessage}
          />
          <LoginRegisterModals
            isOpenLoginModal={this.state.isOpenLoginModal}
            isOpenRegisterModal={this.state.isOpenRegisterModal}
            onCancel={this.handleToggleLoginRegisterModal}
            onRegister={this.handleRegister}
            onLogin={this.handleLogin}
            name={this.state.name}
            email={this.state.email}
          />
          <Modal
            loggedIn={this.state.loggedIn}
            onLogout={this.handleLogout}
            isOpenLeaderBoardModal={this.state.isOpenLeaderBoardModal}
            onCancel={this.handleToggleLeaderBoardModal}
            token={this.state.token}
            email={this.state.email}
            userName={this.state.name}
          // score={this.state.finalScore}
          // level={this.state.finalLevel}
          />
          <Switch>
            <Route exact path="/" render={(props) => <Books {...props} saved={false} username={this.state.name} token={this.state.token} email={this.state.email} />} />
            <Route exact path="/books" render={(props) => <Books {...props} saved={false} username={this.state.name} token={this.state.token} email={this.state.email} />} />
            <Route exact path="/books/:id" component={Detail} />
            <Route exact path="/search" render={(props) => <Search {...props} username={this.state.name} token={this.state.token} email={this.state.email} />} />
            <Route exact path="/search/:id" render={(props) => <GoogleDetail {...props} books={this.state.books} authors={this.state.authors} description={this.state.description} />} />
            <Route exact path="/saved" render={(props) => <Books {...props} saved={true} username={this.state.name} token={this.state.token} email={this.state.email} />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
