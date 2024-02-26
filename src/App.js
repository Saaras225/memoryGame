import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Card from './components/Card';
import Party from './components/Party';

function App() {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [target, setTarget] = useState(0);
  const [count, setCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const triggerAutoFlip =useCallback((id1,id2)=>{
    setTimeout( ()=>{
    setCards(cards.map((card)=> {
      if (card.fields.image.uuid ===  id1 || card.fields.image.uuid ===  id2) 
      { 
        return ({...card, isTurn:false})
      } else { 
        return card
      }
      
    }));
    setCardOne(null);
    setCardTwo(null); 
  },700)
  },[cards])

  const handleClick=(id, index)=>{
      if(!cardOne || !cardTwo){
        setCards(cards.map((card)=> {
        if (card.fields.image.uuid === id && card.index===index) 
        { 
          return ({...card, isTurn:true})
        } else { 
          return card
        }
        
      }));
      if(cardOne === null){
        setCardOne({id, index})
      } else if(cardTwo === null){
        setCardTwo({id, index})
        
      }  
    }
  }

  useEffect(()=>{
    if(cardOne && cardTwo){
      if(cardOne.id !== cardTwo.id){
        triggerAutoFlip(cardOne.id, cardTwo.id);
        setMistakes(mistakes + 1)
      }else{
        setCardOne(null)
        setCardTwo(null)
        setCount(count+1)
      }
    }
    
  },[cardOne,cardTwo, triggerAutoFlip]);
  
  useEffect(()=> {
    const url = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';
    const fetchData = async () => {
      try{
      const toFetch = await fetch(url);
      const response = await toFetch.json();
      setTarget(response.entries.length);
      const duplicate = [...response.entries, ...response.entries]
      setCards(duplicate.sort(()=> Math.random() - 0.5).map((item, index)=> ({...item, index, isTurn:false})))
      // not shuffled
      // setCards(duplicate.map((item, index)=> ({...item, index, isTurn:false})))
      } catch(error) {
        console.log(error)
      }
    }  
    fetchData()
  }, [])

  return (
    <div className="App">
      <Party width={300} height={200} tweenDuration={1500} />
      <div className='cardContainer'>
            <p>{count}</p>
            <p>{mistakes}</p>


      {
        cards.map((card) => {
          const animalId = card.fields.image.uuid;
          const animalImg = card.fields.image.url;
          return (
            <Card 
            key={card.index}
            className={animalId}
            image={animalImg}
            id={animalId}
            index={card.index}
            isTurn={card.isTurn}
            handleClick={handleClick}
            
            />
          );
        })
      }
      </div>
    </div>
  );
}

export default App;
