import React from 'react';

const FaceRecognition = (props) => {

    const { imageUrl } = props;

    return (
        <div className="center">
            <img src={imageUrl} alt="" />
        </div>
    );
}

export default FaceRecognition;