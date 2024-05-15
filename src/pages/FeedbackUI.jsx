import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/layouts/Spinner";
import FeedbackItem from "../components/FeedbackItem";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

function FeedbackUI() {
  const [feedbacks, setFeedbacks] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  var user = auth.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchfeedback = async () => {
      try {
        // get refence
        const feedbackRef = collection(db, "feedback");
        const q = query(feedbackRef, orderBy("name", "desc"), limit(10));
        // Execute query
        const querySnap = await getDocs(q);

        const feedback = [];
        querySnap.forEach((doc) => {
          return feedback.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setFeedbacks(feedback);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchfeedback();
    // eslint-disable-next-line
  }, []);
  const onDelete = async (feedbackItemId) => {
    await deleteDoc(doc(db, "feedback", feedbackItemId));
    const updatedfeedback = feedbacks.filter(
      (feedbackItem) => feedbackItem.id !== feedbackItemId
    );
    setFeedbacks(updatedfeedback);
    toast.success("Your feedback was deleted successfully");
  };

  const onEdit = (feedbackItemId) => {
    navigate(`/EditFeedback/${feedbackItemId}`);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className="flex flex-col items-center mt-6 border-t border-dotted border-mediumOrange">
          <h1 className="text-2xl mt-5">Fresh from the customers</h1>
          <p className="text-xl">
            Check out what our customers have to say about their Riverside Farm
            experience!
          </p>
        </div>
        <main>
          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4 mx-4 my-10">
            {feedbacks.map((feedbackItem) => (
              <FeedbackItem
                feedbackItem={feedbackItem.data}
                id={feedbackItem.id}
                key={feedbackItem.id}
                onDelete={() => {
                  onDelete(feedbackItem.id);
                }}
                onEdit={() => {
                  onEdit(feedbackItem.id);
                }}
              />
            ))}
          </div>
        </main>
        {user ? (
          <div className="flex items-center justify-center">
            <Link
              to="/Feedback"
              className="border-2 border-darkGreen rounded-lg py-2 px-4 hover:bg-darkGreen hover:text-white"
            >
              Add Feedback
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Link
              to="/SignUp"
              className="border-2 border-darkGreen rounded-lg py-2 px-4 hover:bg-darkGreen hover:text-white"
            >
              Register & Add Feedback
            </Link>
          </div>
        )}
      </>
    );
  }
}

export default FeedbackUI;
