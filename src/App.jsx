import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import ClarifaiAPI from './API/Clarifai';
import './App.css';
import { COLOR_MODEL } from 'clarifai';


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
      imageUrl: ""
    }
  }

  handleInputChange = (evt) => {
    this.setState({ userInput: evt.target.value });
  }

  submitImage = () => {
    this.setState({ imageUrl: this.state.userInput });

    ClarifaiAPI.models.predict(
      // "a403429f2ddf4b49b307e318f00e528b", FACE DETECTION MODEL
      COLOR_MODEL,
      this.state.userInput
      ).then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.log("Error!", err);
      }
    );
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

