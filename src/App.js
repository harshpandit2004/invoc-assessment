import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, fetchUserDetails } from './actions';

function App() {
  const inputValue = useSelector((state) => state.inputValue);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const prevInputValueRef = useRef('');

  useEffect(() => {
    if (inputValue.trim() !== '' && inputValue !== prevInputValueRef.current) {
      prevInputValueRef.current = inputValue;
      dispatch(fetchUserDetails(inputValue));
    }
  }, [dispatch, inputValue]);

  const handleInputChange = (event) => {
    dispatch(setInputValue(event.target.value));
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {userDetails[inputValue] && userDetails[inputValue].error && (
        <p>Error: {userDetails[inputValue].error.message}</p>
      )}
      {userDetails[inputValue] && !userDetails[inputValue].error && (
        <div>
          <p>Username: {userDetails[inputValue].login}</p>
          <p>Name: {userDetails[inputValue].name}</p>
          <p>Location: {userDetails[inputValue].location}</p>
        </div>
      )}
    </div>
  );
}

export default App;
