import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import LogMood from './pages/LogMood';
import MoodHistory from './pages/MoodHistory';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route
  path="/moods"
  element={
    <PrivateRoute>
      <MoodHistory />
    </PrivateRoute>
  }
/>
      <Route
  path="/log-mood"
  element={
    <PrivateRoute>
      <LogMood />
    </PrivateRoute>
  }
/>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
