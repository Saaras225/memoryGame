import React from 'react';
import './Congrats.css'
import Party from './Party.js';

function Congrats(props) {
  const {name} = props;
  return (
    <>
      <Party width={300} height={200} tweenDuration={1500} />
      <div className='congrats'>
        <div className='madeIt'>
          <p>LO LOGRASTE {name.toUpperCase()}</p>
        </div>
        <div className='newGame'>
          <button  className='init' onClick={()=>window.location.reload()}>Reiniciar</button>
        </div>
      </div>
    </>
  );
}

export default Congrats;
