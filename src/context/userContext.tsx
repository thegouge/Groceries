import React, {useState} from "react";

import {userList} from "../lib/defaultData";
import {User} from "../lib/interfaces";

interface userContextProps {
  usersList: User[];
  setUsersList: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = React.createContext({} as userContextProps);
const UserProvider = (props: any) => {
  const [usersList, setUsersList] = useState(userList);

  return (
    <UserContext.Provider value={{usersList, setUsersList}}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
