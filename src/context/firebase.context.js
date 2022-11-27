import { createContext } from "react";

import {
  getCodes,
  addCode,
  putCode,
  deleteCode,
  putUser,
  putUserPassword,
  putAdditional,
} from "../utils/firebase/firebase.utils.js";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        getCodes,
        addCode,
        putCode,
        deleteCode,
        putUser,
        putUserPassword,
        putAdditional,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
