const initialState = {
    inputValue: '',
    userDetails: {},
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_INPUT_VALUE':
        return {
          ...state,
          inputValue: action.payload,
        };
      case 'FETCH_USER_DETAILS_SUCCESS':
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            [action.payload.username]: action.payload.user,
          },
        };
      case 'FETCH_USER_DETAILS_FAILURE':
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            [action.payload.username]: { error: action.payload.error },
          },
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  