import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>SoulSync</h1>
      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/" style={styles.link}>Dashboard</Link>
            <Link to="/logout" style={styles.link}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: '#f4f4f4',
    borderBottom: '1px solid #ddd'
  },
  logo: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: 500
  }
};

export default Navbar;
