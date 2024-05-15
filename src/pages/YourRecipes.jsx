import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/layouts/Spinner";
import ListingItem from "../components/ListingItem";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Title from "../components/Title";

function YourRecipes() {
  Title("Your Own Recipes");
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  var user = auth.currentUser;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get refence
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("recipeName", "desc"), limit(6));
        // Execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          if (doc.data().userRef === auth.currentUser.uid) {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.warn(" Sign In & Create own recipes 🙌🏻", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    fetchListings();
    // eslint-disable-next-line
  }, []);

  // load more recipe
  const onFetchMoreListings = async () => {
    try {
      // get refence
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        orderBy("recipeName", "desc"),
        limit(3),
        startAfter(lastFetchedListing)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch recipes");
    }
  };

  const onDelete = async (listingId) => {
    await deleteDoc(doc(db, "listings", listingId));
    const updatedListings = listings.filter(
      (listing) => listing.id !== listingId
    );
    setListings(updatedListings);
    toast.success("Successfully deleted");
  };

  const onEdit = (listingId) => {
    navigate(`/EditListings/${listingId}`);
  };

  if (user) {
    return (
      <div>
        <header>
          <p className="text-3xl text-center my-4 border-b border-dotted border-mediumOrange">
            Your recipes
          </p>
        </header>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <div className="grid md:grid-cols-3 gap-4 mx-4">
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                    onDelete={() => {
                      onDelete(listing.id);
                    }}
                    onEdit={() => {
                      onEdit(listing.id);
                    }}
                  />
                ))}
              </div>
            </main>
            <div className="flex justify-center mt-4">
              {lastFetchedListing && (
                <button
                  onClick={onFetchMoreListings}
                  className="w-1/5 bg-indigo-500 text-white py-4 rounded-2xl hover:bg-indigo-600 hover:text-black"
                >
                  Load more
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mb-64">
            <h4 className="mt-32">
              Hello{" "}
              {auth.currentUser.displayName
                .split(" ")[0]
                .charAt(0)
                .toUpperCase() +
                auth.currentUser.displayName
                  .split(" ")[0]
                  .slice(1)
                  .toLowerCase()}
              ! Your recipe list is empty
            </h4>
            <Link
              to="/CreateOwnRecipe"
              className="my-2 mx-2 py-2 px-4 bg-indigo-400 text-white  rounded-lg hover:bg-indigo-600 hover:text-white hover:skew-y-6"
            >
              Let's create your recipes 🥙🍢
            </Link>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center w-1/2 bg-indigo-100 mx-auto p-10 space-y-5 mb-96">
        <p>Hi there!</p>
        <p>
          Want to save the recipes that you love? Just add them on the Recipes
          page and it will show up here.
        </p>
        <Link
          to="/SignIn"
          className="my-2 mx-2 py-1 px-4 bg-indigo-800 text-white  rounded-lg hover:bg-greens hover:text-white"
        >
          Browse now
        </Link>
      </div>
    );
  }
}
export default YourRecipes;
