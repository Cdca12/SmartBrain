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
      user: {
        id: "",
        name: "",
        username: "",
        entries: 0,
        joined: ""
      },

      userInput: "",
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  // TEST
  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        entries: user.entries,
        joined: user.joined
      },
    });
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

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false })
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route });
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

              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                handleInputChange={this.handleInputChange}
                submitImage={this.submitImage} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (
              route === "signin"
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )


        }
      </div>
    );
  }
}

export default App;

