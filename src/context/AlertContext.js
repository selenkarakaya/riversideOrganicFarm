import { createContext, useState } from "react";

const AlertContext = createContext();
export const AlertProvider = ({ children }) => {
  const [alertMsg, setAlertMsg] = useState();
  const [alertType, setAlertType] = useState();
  const setAlert = (msg, type) => {
    setAlertMsg(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlertMsg("");
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ alertMsg, alertType, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
