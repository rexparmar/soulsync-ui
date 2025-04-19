import { useEffect, useState } from 'react';
import API from '../services/api';
import './MoodHistory.css';

function MoodHistory() {
  const [entries, setEntries] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [importantOnly, setImportantOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await API.get(`/mood`);
                setEntries(res.data);
      } catch (err) {
        console.error('Error fetching mood history:', err);
      }
    };

    fetchEntries();
  }, []);

  const filtered = entries.filter((entry) => {
    if (importantOnly && !entry.saved) return false;
    if (dateFilter && !entry.createdAt.startsWith(dateFilter)) return false;
    return true;
  });

  return (
    <div className="mood-history-container">
      <h2>Mood History 📖</h2>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={importantOnly}
            onChange={() => setImportantOnly((prev) => !prev)}
          />
          Important Only
        </label>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="mood-card-grid">
        {filtered.map((entry, index) => (
          <div
            className={`mood-card ${expanded === index ? 'expanded' : ''}`}
            key={index}
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <h4>{entry.mood}</h4>
            <p><strong>Date:</strong> {entry.createdAt?.slice(0, 10)}</p>
            {expanded === index && (
              <div className="expanded-content">
                <p><strong>Journal:</strong> {entry.journalText}</p>
                {entry.quote && <p className="quote">“{entry.quote}”</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodHistory;
