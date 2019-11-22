import React, {useState} from "react";

import {defaultUser} from "../lib/defaultData";
import {User} from "../lib/interfaces";

interface userContextProps {
  currentUser: User;
}

const UserContext = React.createContext({} as userContextProps);
const UserProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{currentUser}}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
