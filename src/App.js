import React, {useState, useEffect} from 'react';
import './App.css';
import Card from './components/Card'

function App() {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState({});
  const [cardTwo, setCardTwo] = useState({});

  const [unflipped, setUnflipped] = useState([]);
  const [disableCards, setDisableCards] = useState([]);

  useEffect(()=> {
    const url = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';
    const fetchData = async () => {
      try{
      const toFetch = await fetch(url);
      const response = await toFetch.json();
      const duplicate = [...response.entries, ...response.entries]
      setCards(duplicate.sort(()=> Math.random() - 0.5))
      } catch(error) {
        console.log(error)
      }
    }  
    fetchData()
  }, [])

  useEffect(()=> {
   checkMatches();
  }, [cardTwo])

  const flipCard = (id) => {
    if (cardOne.id === id){
      return 0;
    }
    if (!cardOne.id){
      setCardOne({id})
    } else if (!cardTwo.id){
      setCardTwo({id})
    }
    return 1;
  }

  const checkMatches = () => {
    if(cardOne.id && cardTwo.id){
     const match = cardOne.id === cardTwo.id;
     match? disablingCards() : unflipCards();
    }
  }

  const disablingCards = () => {
    setDisableCards([cardOne.id, cardTwo.id]);
    resetCards()
  }

  const unflipCards = () => {
    setUnflipped([cardOne.id, cardTwo.id]);
    resetCards();

  }

  const resetCards = () => {
    setCardOne({});
    setCardTwo({});
  }

  return (
    <div className="App">
      <div className='cardContainer'>
      {
        cards.map((card) => {
          const animalId = card.fields.image.uuid;
          const animalImg = card.fields.image.url;
          return (
            <Card 
            id={animalId}
            image={animalImg}
            flipCard={flipCard}
            unflippedCard={unflipped}
            disableCards={disableCards}
            />
          );
        })
      }
      </div>
    </div>
  );
}

export default App;
