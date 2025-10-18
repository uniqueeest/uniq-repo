import { useQueryState } from 'nuqs';
import { Link, useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();
  const [name] = useQueryState('name');

  console.log('about1', name);

  return (
    <div>
      About {name}
      <Link to="/about?name=Sam">About</Link>
      <button onClick={() => navigate('/about2?name=Sam')}>About2</button>
    </div>
  );
}
