import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, fetchUserDetails } from "./actions";

function App() {
  const inputValue = useSelector((state) => state.inputValue);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const prevInputValueRef = useRef("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim() !== "" && inputValue !== prevInputValueRef.current) {
      prevInputValueRef.current = inputValue;

      // Clear previous timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to make API call after 1 second of inactivity
      timeoutRef.current = setTimeout(() => {
        dispatch(fetchUserDetails(inputValue));
      }, 1000);
    }

    // Clean up timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
