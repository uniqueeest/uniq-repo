import { useQueryState } from 'nuqs';

export function About2() {
  const [name] = useQueryState('name');
  return <div>About2 {name}</div>;
}
