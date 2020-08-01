import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import ClarifaiAPI from './API/Clarifai';
import './App.css';
import clarifai from 'clarifai';


const particleParams = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",

      userInput: "",
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    let clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    let image = document.getElementById("inputImage");
    let imageWidth = Number(image.width);
    let imageHeight = Number(image.height);

    return {
      topRow: clarifaiFace.top_row * imageHeight,
      leftCol: clarifaiFace.left_col * imageWidth,
      rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  }

  handleInputChange = (evt) => {
    this.setState({ userInput: evt.target.value });
  }

  submitImage = () => {
    this.setState({ imageUrl: this.state.userInput });

    ClarifaiAPI.models.predict(
      clarifai.FACE_DETECT_MODEL,
      this.state.userInput
    )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log("Error!", err));
  }

  handleUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false })
    }
    // } else if (route === "home") {
    //   this.setState({ isSignedIn: true })
    // }

    if (route === "home"
      && this.state.username.toLowerCase() === "cdca"
      && this.state.password === "123") {
      this.setState({ isSignedIn: true, route });
      return;
    }

    if (route === "register" || route === "signin" || route === "signout") {
      this.setState({ route });
    }

  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    return (
      <div className="App">
        <Particles className="particles"
          params={particleParams} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === "home"
            ? <div>
              <Logo />

              <Rank />
              <ImageLinkForm
                handleInputChange={this.handleInputChange}
                submitImage={this.submitImage} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (
              route === "signin"
                ? <SignIn
                  handleUsernameChange={this.handleUsernameChange}
                  handlePasswordChange={this.handlePasswordChange}
                  onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )


        }
      </div>
    );
  }
}

export default App;

