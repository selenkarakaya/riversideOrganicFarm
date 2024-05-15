import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layouts/Navbar";
import PrivateRoute from "./components/layouts/PrivateRoute";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import OurRecipeBoxes from "./pages/OurRecipeBoxes";
import HowItWorks from "./pages/HowItWorks";
import OurRecipes from "./pages/OurRecipes";
import YourRecipes from "./pages/YourRecipes";
import RecipeCollapse from "./pages/RecipeCollapse";
import GiftCards from "./pages/GiftCards";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import Contact from "./pages/Contact";
import CreateOwnRecipe from "./pages/CreateOwnRecipe";
import EditListings from "./pages/EditListings";
import EditFeedback from "./pages/EditFeedback";
import Feedback from "./pages/Feedback";
import Checkout from "./pages/Checkout";
import { RecipeProvider } from "./context/RecipeContext";
import { AlertProvider } from "./context/AlertContext";
function App() {
  return (
    <RecipeProvider>
      <AlertProvider>
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/OurRecipeBoxes" element={<OurRecipeBoxes />} />
              <Route path="/HowItWorks" element={<HowItWorks />} />
              <Route path="/Recipes" element={<RecipeCollapse />} />
              <Route path="/OurRecipes" element={<OurRecipes />} />
              <Route path="/YourRecipes" element={<YourRecipes />} />
              <Route path="/GiftCards" element={<GiftCards />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<PrivateRoute />}>
                <Route path="/Profile" element={<Profile />} />
              </Route>
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route path="/CreateOwnRecipe" element={<CreateOwnRecipe />} />
              <Route
                path="/EditListings/:listingId"
                element={<EditListings />}
              />
              <Route
                path="/EditFeedback/:feedbacksId"
                element={<EditFeedback />}
              />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/Checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </Router>
        <ToastContainer />
      </AlertProvider>
    </RecipeProvider>
  );
}

export default App;
