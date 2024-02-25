import React, {useEffect, useState} from 'react';
import './Card.css';
import ReactCardFlip from 'react-card-flip';
import cover from './img/memory.jpg';

export const Card= (props) => {
  const {id, image, flipCard, unflippedCard, disableCards} = props;
  const [isTurn, setIsTurn] = useState(false);

  useEffect(() => {
    if(unflippedCard.includes(image)){
     setTimeout(() => setIsTurn(false), 700)
    }
   }, [unflippedCard])
  
  const handleClickTurned = e => {
    const value = flipCard(image, id);
    if(value !== 0){
      setIsTurn(!isTurn)
    };
  }

  console.log(unflippedCard)
 

  
  return (
    <div className="cardUnit">
      <ReactCardFlip isFlipped={isTurn} flipDirection='horizontal'>
        <div className='card'>
          <img 
          className='openCard' 
          src={cover} 
          alt='frontFace' 
          onClick={handleClickTurned}
          />
        </div>

        <div className='card'>
        <img 
        key={id}
        className='imgCard' 
        src={image} 
        alt='animalFace'
        onClick={handleClickTurned}
        />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
