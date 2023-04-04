import reducer from './reducer';

const initialState = {};

function createStore(reducer, initialState) {

  let state = { ...initialState };

  function dispatch(action) {
    state = reducer(state, action);
  }

  function getState() {
    return state;
  }

  return { dispatch, getState };

}

export default createStore(reducer, initialState);
