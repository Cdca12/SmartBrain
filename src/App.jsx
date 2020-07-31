import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import ClarifaiAPI from './API/Clarifai';
import './App.css';


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
      userInput: ""
    }
  }

  handleInputChange = (evt) => {
    this.setState({ userInput: evt.target.value });
  }

  submitImage = () => {
    console.log("Click!");
    ClarifaiAPI.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function (response) {
        // do something with response
        console.log(response);
      },
      function (err) {
        // there was an error
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
        {/*<FaceRecognition /> } */}
      </div>
    );
  }
}

export default App;

