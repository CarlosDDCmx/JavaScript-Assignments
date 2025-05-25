import { memo, useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Card = memo(({ id, image, isFlipped, isMatched, playSound }) => {
  const { dispatch } = useContext(GameContext);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      playSound('flip');
      dispatch({ type: 'FLIP_CARD', payload: id });
    }
  };

  return (
    <div className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={image} alt={`Card ${id}`} />
        </div>
        <div className="card-back" />
      </div>
    </div>
  );
});

export default Card;