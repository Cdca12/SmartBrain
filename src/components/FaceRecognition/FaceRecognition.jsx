import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = (props) => {

    const { imageUrl, box } = props;

    return (
        <div className="center ma">
            <div className="absolute mt3">
                <img id="inputImage" src={imageUrl} alt="" width="500px" height="auto"/>
                <div className="bounding-box" style={{
                    top: box.topRow,
                    left: box.leftCol,
                    bottom: box.bottomRow,
                    right: box.rightCol
                }} />
            </div>
        </div>
    );
}

export default FaceRecognition;