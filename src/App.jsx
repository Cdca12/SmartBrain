import React, { Component } from 'react';
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
      userInput: "",
      imageUrl: "",
      box: {
        topRow: "",
        leftCol: "",
        bottomRow: "",
        rightCol: ""
      }
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

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particleParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          handleInputChange={this.handleInputChange}
          submitImage={this.submitImage} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

