import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './LogMood.css';

function LogMood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mood: '',
    journalText: '',
    saved: false
  });
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    const fetchQuote = async () => {
      if (formData.mood) {
        try {
            const res = await API.get(`/mood/suggestions?mood=${formData.mood}`);
            setQuote(res.data.quote);
        } catch {
          setQuote('No quote found for this mood.');
        }
      } else {
        setQuote('');
      }
    };
    fetchQuote();
  }, [formData.mood]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/mood', formData);
      setMessage('Mood logged successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch {
      setMessage('Error logging mood.');
    }
  };

  return (
    <div className="logmood-container">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <select name="mood" value={formData.mood} onChange={handleChange} required>
          <option value="">Select Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="angry">😠 Angry</option>
          <option value="neutral">😐 Neutral</option>
          <option value="anxious">😰 Anxious</option>
        </select>

        {quote && (
          <div className="quote-box">
            <h4>Mood Quote</h4>
            <p>“{quote}”</p>
          </div>
        )}

        <textarea
          name="journalText"
          placeholder="Write about your mood..."
          value={formData.journalText}
          onChange={handleChange}
          rows="5"
        ></textarea>

        <label className="checkbox">
          <input
            type="checkbox"
            name="saved"
            checked={formData.saved}
            onChange={handleChange}
          />
          Mark this mood as important
        </label>

        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LogMood;
