import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/users";
import UserList from "./UserList";
import "./App.css";




function App() {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //RetrieveUsers
  const retrieveUsers = async () => {
    const response = await api.get("");
    return response.data;
  };

  const openEmailHandler = async (id) => {

  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newUserList = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newUserList);
    } else {
      setSearchResults(users);
    }
  };

  useEffect(() => {

    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllUsers();
  }, []);
  return (
    <div className="ui container">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <UserList
                {...props}
                users={searchTerm.length < 1 ? users : searchResults}
                getUserId={openEmailHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
