import { useCallback } from 'react';
import { shuffleArray } from './shuffle';

const useCards = () => {
  const generateCards = useCallback((numberOfPairs) => {
    const cards = [];
    for (let i = 1; i <= numberOfPairs; i++) {
      try {
        const imagePath = require(`../assets/images/card-${i}.jpg`);
        cards.push(
          { id: `card-${i}-a`, pairId: i, image: imagePath },
          { id: `card-${i}-b`, pairId: i, image: imagePath }
        );
      } catch (error) {
        console.error(`Error loading image for card ${i}:`, error);
        throw new Error(`Missing image for card ${i}`);
      }
    }
    return shuffleArray(cards);
  }, []);

  return { generateCards };
};

export default useCards;