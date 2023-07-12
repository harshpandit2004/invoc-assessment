import { token } from "./token";

export const setInputValue = (value) => {
  console.log("New input value:", value);

  return {
    type: "SET_INPUT_VALUE",
    payload: value,
  };
};

export const fetchUserDetails = (username) => {
  return async (dispatch, getState) => {
    console.log("Making API request for:", username);
    const { userDetails } = getState();

    // Check if the user details are already in the store
    if (userDetails[username]) {
      return; // Don't make an API request if already in store
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer` + token, // Replace with your personal access token
        },
      });
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const user = await response.json();
      dispatch({
        type: "FETCH_USER_DETAILS_SUCCESS",
        payload: { username, user },
      });
      console.log("API response received:", user);
    } catch (error) {
      dispatch({
        type: "FETCH_USER_DETAILS_FAILURE",
        payload: { username, error },
      });
    }
  };
};
