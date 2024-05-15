import { useContext } from "react";
import AlertContext from "../../context/AlertContext";

function Alert() {
  const { alertMsg, alertType } = useContext(AlertContext);
  if ({ alertMsg } !== null) {
    return (
      <div className="flex items-start mb-4 space-x-2">
        {alertType === "error" && (
          <div>
            <p>{alertMsg}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Alert;
