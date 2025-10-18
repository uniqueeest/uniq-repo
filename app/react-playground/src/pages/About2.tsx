import { useQueryState } from 'nuqs';

export function About2() {
  const [name] = useQueryState('name');
  console.log('about2', name);

  return <div>About2 {name}</div>;
}
