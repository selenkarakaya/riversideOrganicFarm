import { Link } from "react-router-dom";
import works_Meal from "../components/layouts/image/works_Meal.jpg";
import works_Box from "../components/layouts/image/works_Box.jpg";
import works_Cook from "../components/layouts/image/works_Cook.png";
import works_Delivery from "../components/layouts/image/works_Delivery.png";
import home_whyImportant from "../components/layouts/image/home_whyImportant.jpg";
import FeedbackUI from "./FeedbackUI";
import Typewriter from "react-ts-typewriter";

function Home() {
  return (
    <div>
      <section
        id="main"
        className="home-main h-[25rem] md:h-[45rem] bg-cover bg-center bg-no-repeat"
      >
        <div className="flex flex-col space-y-12 justify-center items-center h-[25rem] md:h-[45rem] text-white">
          <div>
            <h1 className="text-3xl">Save your serious</h1>
            <h1 className="text-center">
              <Typewriter text="time, stress, money" />
            </h1>
          </div>
          <h2>Get started with Riverside Farm meals!</h2>
          <div>
            <h3>Now with more choices every week or created recipe by you</h3>
            <h3 className="text-center">
              and meals starting from just £5.99/pp
            </h3>
          </div>
          <button className="shadow-white shadow-md py-4 px-8 bg-mediumOrange rounded-md">
            <Link to="/OurRecipeBoxes">Get Offer</Link>
          </button>
        </div>
      </section>
      <section
        id="diversty"
        className="md:border-b-2 border-dashed border-mediumOrange"
      >
        <div className="md:flex md:space-x-20 m-6 justify-center">
          <div className="home-Breakfast  h-96 md:w-1/2 lg:w-1/4  bg-cover bg-center"></div>
          <div className="home-Snacks  h-96 md:w-1/2 lg:w-1/4  bg-cover bg-center"></div>
        </div>

        <div className="md:flex md:space-x-20 m-6 justify-center">
          <div className=" home-Lunch  h-96 md:w-1/2 lg:w-1/4 bg-cover bg-right"></div>
          <div className="home-Dinner h-96 md:w-1/2 lg:w-1/4 bg-cover bg-center"></div>
        </div>
      </section>
      <section id="howWorks">
        <div className="flex flex-col my-4">
          <div>
            <h1 className="text-2xl text-center font-bold">How it works</h1>
            <p className="text-center font-imbue">
              Choose your recipes or create your own recipes • Pre-measured
              ingredients for less waste • Delivered safely to your door
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-x-2 md:space-y-1 space-y-4 mx-16 my-3">
            <div className="md:w-1/3">
              <img
                className="object-cover h-60 w-60"
                src={works_Meal}
                alt="works_Meal"
              />
              <h1 className="text-center mt-2 font-bold">Choose your meals</h1>
              <p className="text-center">
                Curated, easy-to-follow recipes every week, customisable by you
              </p>
            </div>
            <div className="md:w-1/3">
              <img
                className="object-cover h-60 w-60"
                src={works_Box}
                alt="works_Box"
              />
              <h1 className="text-center mt-2 font-bold">
                Create the perfect box
              </h1>
              <p className="text-center">
                Suit your lifestyle with a variety of Extras, including desserts
                and sides
              </p>
            </div>
            <div className="md:w-1/3">
              <img
                className="object-cover h-60 w-60"
                src={works_Delivery}
                alt="works_Delivery"
              />
              <h1 className="text-center mt-2 font-bold">
                Get convenient weekly deliveries
              </h1>
              <p className="text-center">
                Scheduling made easy, with drop-offs right at your door
              </p>
            </div>
            <div className="md:w-1/3">
              <img
                className="object-cover  h-60 w-60"
                src={works_Cook}
                alt="works_Cook"
              />
              <h1 className="text-center mt-2 font-bold">
                Cook seasonal, fresh ingredients
              </h1>
              <p className="text-center">
                Food made from scratch in the comfort of your kitchen
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-mediumOrange w-20 text-center p-3 my-3 rounded-lg hover:scale-125 hover:bg-darkGreen ease-out duration-500">
              <Link to="HowItWorks"> Learn More</Link>
            </button>
            <p className="underline decoration-wavy">
              You can skip a week or cancel at any time
            </p>
          </div>
        </div>
      </section>
      <section id="whyImportant">
        <div className="flex md:flex-row flex-col md:space-y-1 space-y-6 mt-4 mx-6 space-x-6">
          <div className="md:w-1/2">
            <img src={home_whyImportant} alt="home_whyImportant" />
          </div>
          <div className="md:w-1/2 flex flex-col items-center h-auto justify-center space-y-10">
            <h1 className="box text-center py-4">
              <Typewriter text="Why is eating healthy food important?" />
            </h1>
            <p>
              Eating healthy foods is important because it provides the
              nutrients the body needs to carry out its essential functions.
              These nutrients include vitamins, minerals, protein, healthy fats
              and complex carbohydrates. Healthy foods support cell growth and
              repair, maintain energy balance, and can improve the immune
              system. Healthy foods can also play a role in maintaining mental
              balance and providing stable energy throughout the day. By
              choosing foods wisely, we can play an active role in maintaining
              the health and well-being of our bodies.
            </p>
            <Link
              to="/Recipes"
              className="bg-darkGreen bg-opacity-80 hover:bg-darkGreen w-10/12 p-4 rounded-lg text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <FeedbackUI />
      <section id="started">
        <div className="home-started  flex md:flex-row flex-col space-y-6 mt-4 items-center md:items-start md:justify-between md:mt-5 h-80 bg-cover bg-top md:bg-center">
          <h1 className="w-1/3 text-center text-2xl mt-6">Let's Start!</h1>
          <div className="w-1/3 text-center ">
            <p className="text-2xl">
              G<i className="fa-solid fa-heart text-darkGreen"></i>
              <i className="fa-solid fa-heart text-darkGreen"></i>d
            </p>
            <p className="text-2xl">
              F<i className="fa-solid fa-heart text-darkGreen"></i>
              <i className="fa-solid fa-heart text-darkGreen"></i>d
            </p>
            <p className="text-2xl">
              G<i className="fa-solid fa-heart text-darkGreen"></i>
              <i className="fa-solid fa-heart text-darkGreen"></i>d
            </p>
            <p className="text-2xl">
              M<i className="fa-solid fa-heart text-darkGreen"></i>
              <i className="fa-solid fa-heart text-darkGreen"></i>d
            </p>
          </div>
          <button className="w-1/3 text-2xl">
            <Link
              to="/OurRecipeBoxes"
              className="border-2 border-darkGreen rounded-lg p-2 hover:bg-darkGreen hover:text-white"
            >
              View Our Boxes
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
