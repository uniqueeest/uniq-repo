import { Link, useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <h1>Home</h1>
      <section style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate('/about?name=John')}>About</button>
        <a href="/about?name=John">A tag About</a>
        <Link to="/about?name=John">Link About</Link>
      </section>
      <section style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate('/about2?name=John')}>About2</button>
        <a href="/about2?name=John">A tag About2</a>
        <Link to="/about2?name=John">Link About2</Link>
      </section>
    </section>
  );
}
