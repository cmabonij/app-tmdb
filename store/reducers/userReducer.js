const initialState = {
  count: 0,
};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SESSION': {
      return {...state, idSession: action.payload};
    }
    default:
      return state;
  }
};
