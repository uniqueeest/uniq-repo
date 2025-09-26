import { useQueryState } from 'nuqs';

export function About() {
  const [name] = useQueryState('name');

  return <div>About {name}</div>;
}
