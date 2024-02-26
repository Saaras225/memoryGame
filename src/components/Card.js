import React from 'react';
import './Card.css';
import ReactCardFlip from 'react-card-flip';
import cover from './img/memory.jpg';

export const Card= (props) => {
  const {id, image, index,handleClick, isTurn} = props;
  return (
    <div className="cardUnit">
      <ReactCardFlip isFlipped={isTurn} flipDirection='horizontal'>
        <div className='card'>
          <img 
          className='openCard' 
          src={cover} 
          alt='frontFace' 
          onClick={()=> {handleClick(id, index)}}
          />
        </div>

        <div className='card'>
        <img 
        key={id}
        className='imgCard' 
        src={image} 
        alt='animalFace'
        />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
