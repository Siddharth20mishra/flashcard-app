// Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ flashcards, onAddFlashcard, onEditFlashcard, onDeleteFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    axios.post('http://localhost:5000/flashcards', { question, answer })
      .then(response => {
        onAddFlashcard(response.data);
        setQuestion('');
        setAnswer('');
      });
  };

  const handleEdit = () => {
    if (editId) {
      axios.put(`http://localhost:5000/flashcards/${editId}`, { question, answer })
        .then(() => {
          onEditFlashcard(editId, { question, answer });
          setEditId(null);
          setQuestion('');
          setAnswer('');
        });
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      />
      {editId ? (
        <button onClick={handleEdit}>Edit Flashcard</button>
      ) : (
        <button onClick={handleAdd}>Add Flashcard</button>
      )}
      <ul>
        {flashcards.map(flashcard => (
          <li key={flashcard.id}>
            {flashcard.question} - {flashcard.answer}
            <button onClick={() => {
              setEditId(flashcard.id);
              setQuestion(flashcard.question);
              setAnswer(flashcard.answer);
            }}>Edit</button>
            <button onClick={() => onDeleteFlashcard(flashcard.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
