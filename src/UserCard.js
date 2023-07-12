import React from "react";

export default function UserCard(props) {
  const userDetails = props.userDetails[props.inputValue];

  return (
    <div>
      <div className="maincard">
        <img src={userDetails.avatar_url} className="cardImg" />
        <p className="userName">{userDetails.name}</p>
        <p className="userTag">@{userDetails.login}</p>
        {userDetails.company && (
          <div className="extras">
            <p className="company">company: {userDetails.company}</p>
          </div>
        )}
        {userDetails.email && (
          <div className="extras">
            <p className="email">email: {userDetails.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
