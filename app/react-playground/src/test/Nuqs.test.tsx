import { render, screen } from '@testing-library/react';
import { useQueryStates } from 'nuqs';
import {
  withNuqsTestingAdapter,
  type OnUrlUpdateFunction,
} from 'nuqs/adapters/testing';
import { parseAsInteger } from 'nuqs';
import userEvent from '@testing-library/user-event';

it('should increment the count when clicked', async () => {
  const user = userEvent.setup();
  const onUrlUpdate = vi.fn<OnUrlUpdateFunction>();

  const CounterButton = () => {
    const [searchParam, setSearchParam] = useQueryStates({
      count: parseAsInteger.withDefault(42),
    });
    return (
      <button onClick={() => setSearchParam({ count: searchParam.count + 1 })}>
        count is {searchParam.count}
      </button>
    );
  };

  render(<CounterButton />, {
    wrapper: withNuqsTestingAdapter({
      searchParams: '?count=42',
      onUrlUpdate,
    }) as React.ComponentType<{ children: React.ReactNode }>,
  });

  const button = screen.getByRole('button');
  await user.click(button);

  expect(button).toHaveTextContent('count is 43');
  expect(onUrlUpdate).toHaveBeenCalledOnce(); // This fails
});
