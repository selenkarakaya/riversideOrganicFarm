import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { getAuth } from "firebase/auth";

function FeedbackItem({ feedbackItem, id, onEdit, onDelete }) {
  const auth = getAuth();

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col  bg-indigo-300 p-2">
      <div className="flex space-x-4">
        {auth.currentUser && auth.currentUser.uid === feedbackItem.userRef ? (
          <MdOutlineDeleteSweep
            style={{ fontSize: "1.5rem" }}
            onClick={() => onDelete(feedbackItem.id, feedbackItem.recipeName)}
          />
        ) : (
          <></>
        )}
        {auth.currentUser && auth.currentUser.uid === feedbackItem.userRef ? (
          <CiEdit style={{ fontSize: "1.5rem" }} onClick={() => onEdit(id)} />
        ) : (
          <></>
        )}
      </div>
      <div>
        <h3 className="font-bold text-xl italic text-darkGreen text-center uppercase my-4">
          {feedbackItem.name}
        </h3>
        <p className="text-2xl ml-4">{feedbackItem.feedback}</p>
      </div>
    </div>
  );
}

export default FeedbackItem;
