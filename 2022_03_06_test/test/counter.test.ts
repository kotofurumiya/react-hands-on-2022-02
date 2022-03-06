import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCounter } from '../src/pages/Home/Counter';

const CounterSuite = suite('Counter');

CounterSuite.after.each(() => {
  setTimeout(() => {
    process.exit(0);
  }, 50);
});

CounterSuite('useCounter can increment', () => {
  const { result } = renderHook(() => useCounter());

  const [count, addCount] = result.current;
  assert.equal(count, 0);

  act(() => {
    addCount();
  });

  const [count2] = result.current;
  assert.equal(count2, 1);
});

CounterSuite.run();
