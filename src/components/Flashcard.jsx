import React from 'react';

const Flashcard = ({ flashcard, onFlip }) => {
  return (
    <div className="flashcard" onClick={onFlip}>
      <div className="flashcard-content">
        {flashcard.isFlipped ? flashcard.answer : flashcard.question}
      </div>
    </div>
  );
};

export default Flashcard;
