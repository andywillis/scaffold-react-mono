# Examples

## Testing examples

### Small example

```
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Fetch from './fetch';

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Fetch url="/greeting" />);

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'));
  await screen.findByRole('heading');

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toBeDisabled();
});
```

### Bigger example

```
import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Fetch from '../fetch';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(<Fetch url="/greeting" />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toBeDisabled();
});

test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Fetch url="/greeting" />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('alert'));

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toBeDisabled();
});
```

### Mocking hook state

```
// App.test.tsximport App from './';
import { render } from '@testing-library/react';

let mockIsLoggedIn = false;

jest.mock('../hooks/use-auth', () => {
  return jest.fn(() => ({
     isLoggedIn: mockIsLoggedIn;
  }));
});

test('can show logged in message', () => {
  mockIsLoggedIn = true;
  const { getByText } = render(<App/>);
  expect(getByText('Welcome')).toBeTruthy();
});
```

### Mocking hook was called

```
// SignOut.test.tsximport SignOut './';
import { render } from '@testing-library/react';

const mockSignOutFn = jest.fn();

jest.mock('../hooks/use-auth', () => {
  return jest.fn(() => ({
    signOut: mockSignOutFn;
  }));
});

test('can sign out', () => {
  const { getByTestId } = render(<SignOut/>);
  fireEvent.click(getByTestId('sign-out'));
  expect(mockSignOutFn).toBeCalled();
});
```

## Store examples

### React context

```
// Context
import React from 'react';

const AppContext = React.createContext();
export default AppContext;

// Provider
import { useMemo, useReducer } from 'react';
import AppContext from './context';
import { initialState, reducer } from './reducer';

export default function AppProvider({ children }) {

  const [ state, dispatch ] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );

}

// Reducer
export const initialState = {
  radio: 'javascript',
  answers: [],
  tags: [],
  updating: false
};

export function reducer(state, action) {

  const { type, payload } = action;

  switch (type) {

    case 'updatePath': {
      return { ...state, path: payload };
    }

    default: {
      return state;
    }

  }

}

// index.jsx
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import Spinner from './components/Spinner';

const App = lazy(() => import('./App'));

import AppProvider from './store/provider';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// App.jsx
  const {
    state: { data, search },
    dispatch
  } = useContext(AppContext);
```

## Minimal (non-React) store

```
// store.js
import usersReducer from './reducer';

function createStore(reducer, initialState) {

  let state = [ ...initialState ];

  function dispatch(action) {
    state = reducer(state, action);
  }

  function getState() {
    return state;
  }

  return { dispatch, getState };

}

export default createStore(usersReducer, []);

// reducer.js
export default function usersReducer(state, action) {

  const { type, payload } = action;

  switch (type) {

    case 'create': {
      return [ ...state, payload ];
    }

    case 'read': {
      return state.find(user => user.id === payload);
    }

    case 'update': {
      const filtered = state.filter(user => user.id !== payload.id);
      return [ ...filtered, payload.updated ];
    }

    case 'delete': {
      return state.filter(user => user.id !== payload);
    }

  }

};
```

## Media queries

```
@media only screen and ( max-width: 600px ) { 
  .row { flex-direction: column; }
}
```
