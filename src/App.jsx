// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './components/Flashcard';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(response => {
        setFlashcards(response.data.map(flashcard => ({ ...flashcard, isFlipped: false })));
      });
  }, []);

  const handleFlip = () => {
    setFlashcards(flashcards.map((flashcard, index) =>
      index === currentIndex ? { ...flashcard, isFlipped: !flashcard.isFlipped } : flashcard
    ));
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleAddFlashcard = newFlashcard => {
    setFlashcards([...flashcards, { ...newFlashcard, isFlipped: false }]);
  };

  const handleEditFlashcard = (id, updatedContent) => {
    setFlashcards(flashcards.map(flashcard =>
      flashcard.id === id ? { ...flashcard, ...updatedContent } : flashcard
    ));
  };

  const handleDeleteFlashcard = id => {
    axios.delete(`http://localhost:5000/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
      });
  };

  return (
    <div className="App">
      <h1>Flashcard Learning Tool</h1>
      {flashcards.length > 0 ? (
        <div>
          <Flashcard
            flashcard={flashcards[currentIndex]}
            onFlip={handleFlip}
          />
          <div className="navigation">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      ) : (
        <p>No flashcards available. Please add some!</p>
      )}
      <Dashboard
        flashcards={flashcards}
        onAddFlashcard={handleAddFlashcard}
        onEditFlashcard={handleEditFlashcard}
        onDeleteFlashcard={handleDeleteFlashcard}
      />
    </div>
  );
}

export default App;
