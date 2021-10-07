import React, { useRef } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

const UserList = (props) => {
  const inputEl = useRef("");
  const openEmailHandler = (id) => {
    props.getUserId(id);
  };

  const renderUserList = props.users.map((user) => {
    return (
      <UserCard
        user={user}
        clickHander={openEmailHandler}
        key={user.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
  return (
    <div className="main">
      <h2>
        User List
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Users"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderUserList.length > 0
          ? renderUserList
          : "No Users available"}
      </div>
    </div>
  );
};

export default UserList;
