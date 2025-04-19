import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Home() {
  const [stats, setStats] = useState(null);
  const [reminder, setReminder] = useState({ time: "", enabled: false });
  const navigate = useNavigate();

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/mood/stats/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchStats();
  }, []);

  // Fetch reminder settings
  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const res = await API.get("/user/reminder");
        setReminder(res.data);
      } catch (err) {
        console.error("Error fetching reminder:", err);
      }
    };

    fetchReminder();
  }, []);

  const handleReminderUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("user/reminder", reminder);
      alert("Reminder updated!");
    } catch (err) {
      alert("Failed to update reminder.");
    }
  };

  if (!stats)
    return <p className="dashboard-loading">Loading your dashboard...</p>;

  return (
    <div className="dashboard">
      <h2 className="greeting">
        Hi <span>{stats.name}</span>, welcome back! 👋
      </h2>

      <div className="dashboard-grid">
        {/* LEFT - Stats Card */}
        <div className="stats-card">
          <h3>Your Mood Stats</h3>
          <ul>
            <li>
              <strong>Current Streak:</strong> {stats.currentStreak} days
            </li>
            <li>
              <strong>Max Streak:</strong> {stats.maxStreak} days
            </li>
            <li>
              <strong>Frequent Mood:</strong>{" "}
              {stats.mostFrequentMood || "N/A"}
            </li>
          </ul>
        </div>

        {/* Below Stats - Reminder Card */}
        <div className="reminder-card">
          <h3>Reminder Settings</h3>
          <form onSubmit={handleReminderUpdate}>
            <label>
              Time:
              <input
                type="time"
                value={reminder.time}
                onChange={(e) =>
                  setReminder((prev) => ({ ...prev, time: e.target.value }))
                }
                required
              />
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={reminder.enabled}
                onChange={(e) =>
                  setReminder((prev) => ({
                    ...prev,
                    enabled: e.target.checked,
                  }))
                }
              />
              Enable Reminder
            </label>
            <button type="submit">Save</button>
          </form>
        </div>

        {/* RIGHT - Mood logging + quote */}
        <div className="right-block">
          <div className="quote-section">
            <h3>🧘 Mood Insight</h3>
            <p className="quote">
              “Your feelings are valid. You’re allowed to take up space.”
            </p>
          </div>

          <div className="log-mood-card" onClick={() => navigate("/log-mood")}>
            <span className="log-icon">+</span>
            <p>Log New Mood</p>
          </div>
          <div
            className="view-history-card"
            onClick={() => navigate("/moods")}
          >
            <span className="log-icon">📂</span>
            <p>View Past Entries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
