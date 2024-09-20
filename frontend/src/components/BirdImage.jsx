import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import blueBird from '../assets/images/blueBird.png';  
import pinkBird from '../assets/images/pinkBird.png';
import greenBird from '../assets/images/greenBird.png';
import yellowBird from '../assets/images/yellowBird.png';

const BirdImage = () => {
  const { authState } = useContext(AuthContext);
  
  // Destructure the birdColor from the user object in authState
  const { birdColor } = authState.user || {};

  // Conditionally select the bird image based on birdColor
  const getBirdImage = (color) => {
    switch (color) {
      case 'blue':
        return blueBird;
      case 'pink':
        return pinkBird;
      case 'green':
        return greenBird;
      case 'yellow':
        return yellowBird;
      default:
        return null;  // Return null if no birdColor is set
    }
  };

  return (
    <div className="bird-container">
      {birdColor ? (
        <img 
          src={getBirdImage(birdColor)} 
          alt={`${birdColor} bird`} 
          className="responsive-bird" 
        />
      ) : (
        <p>No bird color selected</p>  // Display message if no bird color is set
      )}
    </div>
  );
};

export default BirdImage;
