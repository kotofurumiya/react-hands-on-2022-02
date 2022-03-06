import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { reverse } from '../src/lib/str_util';

test('reverse', () => {
  assert.is(reverse('Hello'), 'olleH');
});

test.run();
