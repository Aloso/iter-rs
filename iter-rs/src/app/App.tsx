import React, { ReactNode } from 'react'
import Code from '../code/Code'
import Table from '../table/Table'
import * as s from './App.module.scss'

export default function App() {
  return (
    <>
      <h1>Iterator</h1>
      <p>
        <a
          href="https://doc.rust-lang.org/std/iter/trait.Iterator.html"
          target="_blank"
          rel="noreferrer"
        >
          Documentation
        </a>
      </p>

      <Table
        data={data}
        schema={[
          { name: 'Category', transform: enhanceCategory },
          { name: 'Name', transform: enhanceFunctionName },
          { name: 'Description' },
          { name: 'Shape' },
        ]}
        groups={['Category']}
        keyColumn="Name"
      />
    </>
  )
}

const data = [
  {
    Category: 'Filtering',
    Name: 'filter',
    Description: (
      <>
        Accepts a closure that selects which items to keep, e.g.{' '}
        <Code>(1..10).filter(is_prime)</Code>.
      </>
    ),
    Shape: (
      <>
        <Code>{'(self, &Item) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Filtering',
    Name: 'take',
    Description: (
      <>
        Only yields the first n items, e.g. <Code>(3..).take(4)</Code> is equivalent to{' '}
        <Code>3..7</Code>.
      </>
    ),
    Shape: (
      <>
        <Code>{'(self, usize) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Filtering',
    Name: 'take_while',
    Description: <>Only yields items while they satisfy a predicate.</>,
    Shape: (
      <>
        <Code>{'(self, &Item -> bool) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Filtering',
    Name: 'skip',
    Description: (
      <>
        Skips the next <i>n</i> items.
      </>
    ),
    Shape: (
      <>
        <Code>{'(self, usize) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Filtering',
    Name: 'skip_while',
    Description: <>Skips items while they satisfy a predicate.</>,
    Shape: (
      <>
        <Code>{'(self, &Item -> bool) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Filtering',
    Name: 'step_by',
    Description: (
      <>
        Steps by the given amount in each iteration (for example, <Code>.step_by(3)</Code> means
        that ony every 3rd item is yielded).
      </>
    ),
    Shape: (
      <>
        <Code>{'(self, usize) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'map',
    Description: (
      <>
        Applies a function to each item. For example, <Code>(3..7).map(|n| n * 2)</Code> yields 6,
        8, 10, 12.
      </>
    ),
    Shape: (
      <>
        <Code>{'<B>(self, Item -> B) -> B'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'copied',
    Description: <>Dereferences each item.</>,
    Shape: (
      <>
        <Code>{'(self) -> *Item'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>*Item: Copy</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'cloned',
    Description: (
      <>
        Clones each item. Requires that the item type is <Code>Clone</Code>.
      </>
    ),
    Shape: (
      <>
        <Code>{'(self) -> *Item'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>*Item: Clone</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'enumerate',
    Description: <>Wraps each item in a tuple with its index, starting with 0.</>,
    Shape: (
      <>
        <Code>{'(self) -> (usize, Item)'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'inspect',
    Description: <>Allows you to do inspect each item, but not modify it.</>,
    Shape: (
      <>
        <Code>{'(self, &Item -> ()) -> Item'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'peekable',
    Description: (
      <>Returns an identical iterator that allows peeking at the next item without advancing it.</>
    ),
    Shape: (
      <>
        <Code>{'(self) -> Item'}</Code> <i>peekable iterator</i>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'zip',
    Description: <>Combines two iterators into an iterator of pairs.</>,
    Shape: (
      <>
        <Code>{'<I>(self, I) -> (Item, <I as IntoIterator>::Item)'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>I: IntoIterator</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Mapping',
    Name: 'scan',
    Description: (
      <>
        Similar to <Code>fold</Code>, but returns an iterator and uses internal state.
      </>
    ),
    Shape: (
      <>
        <Code pre>
          {'<B, St>(\n  self,\n  inital_state: St,\n  (&mut St, Item) -> Option<B>\n) -> B'}
        </Code>{' '}
        <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'filter_map',
    Description: <>Filters and maps at the same time.</>,
    Shape: (
      <>
        <Code>{'<B>(self, Item -> Option<B>) -> B'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'flatten',
    Description: <>Flattens nested structures (e.g. collections, options, results).</>,
    Shape: (
      <>
        <Code>{'(self) -> <Item as IntoIterator>::Item'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>Item: IntoIterator</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'flat_map',
    Description: (
      <>
        Same as <Code>.map(…).flatten()</Code>.
      </>
    ),
    Shape: (
      <>
        <Code>{'<U>(self, Item -> U) -> <U as IntoIterator>::Item'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>U: IntoIterator</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'by_ref',
    Description: <>Borrows the iterator.</>,
    Shape: <Code>{'(&mut self) -> &mut Self'}</Code>,
  },
  {
    Category: 'Other',
    Name: 'chain',
    Description: <>Adds another iterator to the end of this one.</>,
    Shape: (
      <>
        <Code>{'<U>(self, U) -> Item'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'U: IntoIterator<Item = Self::Item>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'cycle',
    Description: <>Repeat the iterator endlessly.</>,
    Shape: (
      <>
        <Code>{'(self) -> Item'}</Code> <i>iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>Self: Clone</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'fuse',
    Description: (
      <>
        Ensures there are no more items after the iterator returned <Code>None</Code> for the first
        time.
      </>
    ),
    Shape: (
      <>
        <Code>{'(self) -> Item'}</Code> <i>fused iterator</i>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'map_while',
    Description: <>Both yields elements based on a predicate and maps.</>,
    Shape: (
      <>
        <Code>{'<B>(self, Item -> Option<B>) -> B'}</Code> <i>iterator</i>
      </>
    ),
  },
  {
    Category: 'Other',
    Name: 'rev',
    Description: <>Reverses the direction of the iterator.</>,
    Shape: (
      <>
        <Code>{'<B>(self) -> Item'}</Code> <i>reversed iterator</i>
        <br />
        <div className={s.requiredTraits}>
          <Code>Self: DoubleEndedIterator</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'collect',
    Description: <>Iterates over the items and puts them into a new collection of your choice.</>,
    Shape: (
      <>
        <Code>{'<B>(self) -> B'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'B: FromIterator<Item>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'fold',
    Description: (
      <>Accepts an accumulator and a function that combines each item with the accumulator.</>
    ),
    Shape: <Code>{'<B>(self, init: B, (B, Item) -> B) -> B'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'try_fold',
    Description: (
      <>
        Same as <Code>fold</Code>, but stops when the function returns an error.
      </>
    ),
    Shape: (
      <>
        <Code>{'<B, R>(&mut self, init: B, (B, Item) -> R) -> R'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'R: Try<Output = B>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'reduce',
    Description: (
      <>
        Same as <Code>fold</Code>, but uses the first item as the accumulator. The new iterator must
        have the same item type.
      </>
    ),
    Shape: <Code>{'(self, (Item, Item) -> Item) -> Option<Item>'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'all',
    Description: <>Checks if all items meet some condition.</>,
    Shape: <Code>{'(self, Item -> bool) -> bool'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'any',
    Description: <>Checks if at least one item meets some condition.</>,
    Shape: <Code>{'(self, Item -> bool) -> bool'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'count',
    Description: <>Returns the number of items in the iterator.</>,
    Shape: <Code>{'(self) -> usize'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'max',
    Description: <>Returns the maximum item.</>,
    Shape: (
      <>
        <Code>{'(self) -> Option<Item>'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>Item: Ord</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'max_by',
    Description: <>Returns the maximum item, using a comparison function.</>,
    Shape: <Code>{'(self, (&Item, &Item) -> Ordering) -> Option<Item>'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'max_by_key',
    Description: <>Returns the item where the specified function returns the maximum value.</>,
    Shape: (
      <>
        <Code>{'<B>(self, &Item -> B) -> Option<Item>'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>B: Ord</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'min',
    Description: <>Returns the minimum item.</>,
    Shape: (
      <>
        <Code>{'(self) -> Option<Item>'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>Item: Ord</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'min_by',
    Description: <>Returns the minimum item, using a comparison function.</>,
    Shape: <Code>{'(self, (&Item, &Item) -> Ordering) -> Option<Item>'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'min_by_key',
    Description: <>Returns the item where the specified function returns the minimum value.</>,
    Shape: (
      <>
        <Code>{'<B>(self, &Item -> B) -> Option<Item>'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>B: Ord</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'sum',
    Description: <>Returns result of adding all items.</>,
    Shape: (
      <>
        <Code>{'<S>(self) -> S'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'S: Sum<Item>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'product',
    Description: <>Returns result of multiplying all items.</>,
    Shape: (
      <>
        <Code>{'<S>(self) -> S'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'S: Product<Item>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'find',
    Description: <>Returns the first item satisfying a predicate.</>,
    Shape: <Code>{'(&mut self, &Item -> bool) -> Option<Item>'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'position',
    Description: <>Returns the index of the first item satisfying a predicate.</>,
    Shape: <Code>{'(self, Item -> bool) -> Option<usize>'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'rposition',
    Description: (
      <>Returns the index of the first item satisfying a predicate, starting at the end.</>
    ),
    Shape: (
      <>
        <Code>{'(self, Item -> bool) -> Option<usize>'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>Self: ExactSizeIterator + DoubleEndedIterator</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'for_each',
    Description: <>Applies a function to each item and consumes the iterator.</>,
    Shape: <Code>{'(self, Item -> ()) -> ()'}</Code>,
  },
  {
    Category: 'Reducing',
    Name: 'try_for_each',
    Description: (
      <>
        Same as <Code>for_each</Code>, but stops when the function returns an error.
      </>
    ),
    Shape: (
      <>
        <Code>{'<R>(self, Item -> R) -> R'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'R: Try<Output = ()>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'partition',
    Description: (
      <>
        Returns two collections. Each item is added to one of the collection based on a predicate.
      </>
    ),
    Shape: (
      <>
        <Code>{'<B>(self, &Item -> bool) -> (B, B)'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code>{'B: Default + Extend<Item>'}</Code>
        </div>
      </>
    ),
  },
  {
    Category: 'Reducing',
    Name: 'unzip',
    Description: <>Converts an iterator of pairs into a pair of containers.</>,
    Shape: (
      <>
        <Code>{'<A, B, FromA, FromB>(self) -> (FromA, FromB)'}</Code>
        <br />
        <div className={s.requiredTraits}>
          <Code pre block>
            {
              'FromA: Default + Extend<A>\nFromB: Default + Extend<B>\n Self: Iterator<Item = (A, B)>'
            }
          </Code>
        </div>
      </>
    ),
  },
]

function enhanceCategory(s: ReactNode) {
  if (s === 'Filtering' || s === 'Mapping' || s === 'Other') {
    return (
      <div className="sticky-table-cell">
        <b>{s}</b>
        <br />
        (lazy)
      </div>
    )
  } else {
    return (
      <div className="sticky-table-cell">
        <b>{s}</b>
        <br />
        (consuming)
      </div>
    )
  }
}

function enhanceFunctionName(s: ReactNode) {
  return (
    <a
      href={`https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.${s}`}
      target="_blank"
      rel="noreferrer"
    >
      <code>{s}</code>
    </a>
  )
}
