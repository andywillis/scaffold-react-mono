export default function reducer(state, action) {

  const { type, payload } = action;

  switch (type) {

    case 'default': {
      return { ...state, answers: payload };
    }

    default: return state;

  }

}
