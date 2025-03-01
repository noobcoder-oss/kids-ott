import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Edutainment from "./pages/Edutainment";
import Creativity from "./pages/Creativity";
import LanguageAndCommunication from "./pages/LanguageAndCommunication";
import Animated from "./pages/Animated";
import LivePerformancesAndShows from "./pages/LivePerformancesAndShows";
import Discovery from "./pages/Discovery";
import Fitness from "./pages/Fitness";
import StoryTelling from "./pages/StoryTelling";
import Brain from "./pages/Brain";
import Trending from "./pages/Trending";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ScreenTime from "./pages/ScreenTime";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import ManageSubscription from "./pages/ManageSubscription";
import MoviesDisplay from "./components/MoviesDisplay";
import SeriesDisplay from "./components/SeriesDisplay";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import WhoLogging from "./pages/WhoLogging";
import Otp from "./pages/Otp";
import ProfileSetup from "./pages/ProfileSetup";
import Wishlist from "./pages/WishList";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, {
        path: "/",
        element: React.createElement(Home),
      }),
      React.createElement(Route, {
        path: "/categories",
        element: React.createElement(Categories),
      }),
      React.createElement(Route, {
        path: "/movies",
        element: React.createElement(Movies),
      }),
      React.createElement(Route, {
        path: "/series",
        element: React.createElement(Series),
      }),
      React.createElement(Route, {
        path: "/edutainment",
        element: React.createElement(Edutainment),
      }),
      React.createElement(Route, {
        path: "/creativity",
        element: React.createElement(Creativity),
      }),
      React.createElement(Route, {
        path: "/language-&-communication",
        element: React.createElement(LanguageAndCommunication),
      }),
      React.createElement(Route, {
        path: "/animated",
        element: React.createElement(Animated),
      }),
      React.createElement(Route, {
        path: "/live-performances-&-shows",
        element: React.createElement(LivePerformancesAndShows),
      }),
      React.createElement(Route, {
        path: "/discovery",
        element: React.createElement(Discovery),
      }),
      React.createElement(Route, {
        path: "/fitness",
        element: React.createElement(Fitness),
      }),
      React.createElement(Route, {
        path: "/storytelling",
        element: React.createElement(StoryTelling),
      }),
      React.createElement(Route, {
        path: "/brain-boosters",
        element: React.createElement(Brain),
      }),
      React.createElement(Route, {
        path: "/trending",
        element: React.createElement(Trending),
      }),
      React.createElement(Route, {
        path: "/games",
        element: React.createElement(Games),
      }),
      React.createElement(Route, {
        path: "/subscription",
        element: React.createElement(Subscription),
      }),
      React.createElement(Route, {
        path: "/subscription/payment",
        element: React.createElement(Payment),
      }),
      React.createElement(Route, {
        path: "/subscription/manageSubscription",
        element: React.createElement(ManageSubscription),
      }),
      React.createElement(Route, {
        path: "/wishlist",
        element: React.createElement(Wishlist),
      }),
      React.createElement(Route, {
        path: "/profile",
        element: React.createElement(Profile),
      }),
      React.createElement(Route, {
        path: "/profile/settings",
        element: React.createElement(Settings),
      }),

      React.createElement(Route, {
        path: "/profile/screen-time",
        element: React.createElement(ScreenTime),
      }),

      React.createElement(Route, {
        path: "/profile/dashboard",
        element: React.createElement(Dashboard),
      }),
      React.createElement(Route, {
        path: "/movies/movie",
        element: React.createElement(MoviesDisplay),
      }),
      React.createElement(Route, {
        path: "/series/:seriesId/seasons",
        element: React.createElement(SeriesDisplay),
      }),
      React.createElement(Route, {
        path: "/signup",
        element: React.createElement(SignUp),
      }),
      React.createElement(Route, {
        path: "/whoLogged",
        element: React.createElement(WhoLogging),
      }),
      React.createElement(Route, {
        path: "/signin",
        element: React.createElement(SignIn),
      }),
      React.createElement(Route, {
        path: "/otp",
        element: React.createElement(Otp),
      }),
      React.createElement(Route, {
        path: "/profileSetup",
        element: React.createElement(ProfileSetup),
      })
    )
  );
};

export default App;
