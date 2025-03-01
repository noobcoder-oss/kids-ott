"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Play, Info, Heart, X, Check } from "lucide-react";
import Carousel from "../components/Carousel.js";
import Navbar from "../components/Navbar.js";

const Animated = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroContent, setHeroContent] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [moviesResponse, seriesResponse] = await Promise.all([
          fetch("https://kids-ott-backend.onrender.com/api/movies"),
          fetch("https://kids-ott-backend.onrender.com/api/series"),
        ]);

        if (!moviesResponse.ok || !seriesResponse.ok) {
          throw new Error("Failed to fetch the content");
        }

        const moviesData = await moviesResponse.json();
        const seriesData = await seriesResponse.json();

        setMovies(
          moviesData.map((movie) => ({ ...movie, contentType: "movie" }))
        );
        setSeries(
          seriesData.map((series) => ({ ...series, contentType: "series" }))
        );
        setHeroContent([
          ...moviesData.map((movie) => ({ ...movie, contentType: "movie" })),
          ...seriesData.map((series) => ({ ...series, contentType: "series" })),
        ]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch content");
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (heroContent.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((current) =>
        current === heroContent.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroContent]);

  const getContentPath = (item) => {
    if (item.contentType === "movie") {
      return `/movies/movie`;
    }
    return `/series/${item._id}/seasons`;
  };

  const handleWatchClick = (content) => {
    const basePath = getContentPath(content);
    navigate(basePath);
  };

  const handleInfoClick = (content) => {
    setSelectedContent(content);
    setShowInfoModal(true);
  };

  const handleAddToWishlist = (content) => {
    const isCurrentlyInWishlist = wishlist.some(
      (item) => item._id === content._id
    );

    if (isCurrentlyInWishlist) {
      setWishlist(wishlist.filter((item) => item._id !== content._id));
      setAlertMessage("Removed from wishlist");
    } else {
      setWishlist([...wishlist, content]);
      setAlertMessage("Added to wishlist");
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const isInWishlist = (contentId) => {
    return wishlist.some((item) => item._id === contentId);
  };

  const categories = [
    {
      title: "Trending Now",
      content: movies,
      type: "movie",
      link: "/trending",
    },
    {
      title: "Explore and Discovery",
      content: series,
      type: "series",
      link: "/discovery",
    },
    {
      title: "Animated",
      content: [
        ...movies.filter(
          (m) => m.genre?.includes("Action") || m.genre?.includes("Thriller")
        ),
        ...series.filter(
          (s) => s.genre?.includes("Action") || s.genre?.includes("Thriller")
        ),
      ],
      type: "mixed",
      link: "/animated",
    },

    {
      title: "Story telling",
      content: [
        ...movies.filter((m) => m.genre?.includes("Comedy")),
        ...series.filter((s) => s.genre?.includes("Comedy")),
      ],
      type: "mixed",
      link: "/storytelling",
    },
  ].filter((category) => category.content.length > 0);

  if (loading || error) {
    return React.createElement(
      "div",
      {
        className:
          "min-h-screen bg-white text-[#e31b53] flex items-center justify-center",
      },
      React.createElement(
        "div",
        {
          className: `text-[#e31b53] text-base sm:text-lg md:text-xl ${
            loading ? "animate-pulse" : ""
          }`,
        },
        loading ? "Loading..." : error
      )
    );
  }

  const featuredContent = heroContent[currentHeroIndex];

  const ContentCard = ({ item, index, onClick }) => {
    return React.createElement(
      "div",
      {
        onClick: () => handleInfoClick(item),
        className:
          "relative aspect-square flex flex-col items-center cursor-pointer group mr-3 transition-transform duration-300 hover:scale-105",
      },
      React.createElement(
        "div",
        {
          className:
            "w-full h-full overflow-hidden rounded-lg relative transition-all duration-300 hover:shadow-lg hover:shadow-[#e31b53]",
        },
        React.createElement("img", {
          src: item.imageUrl,
          alt: item.title,
          className:
            "w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110",
          loading: "lazy",
          onError: (e) => {
            e.target.src = "/placeholder-image.jpg";
          },
        }),
        React.createElement(
          "div",
          {
            className:
              "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3",
          },
          React.createElement(
            "h3",
            {
              className:
                "text-white text-sm sm:text-base font-semibold line-clamp-2",
            },
            item.title
          )
        ),
        index < 10 &&
          React.createElement(
            "div",
            {
              className:
                "absolute top-0 left-0 w-8 h-8 bg-[#e31b53]/90 flex items-center justify-center rounded-tr-lg rounded-bl-lg",
            },
            React.createElement(
              "span",
              {
                className: "text-white font-bold",
                style: {
                  fontSize: `${Math.max(18 - index, 12)}px`,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                },
              },
              index + 1
            )
          )
      )
    );
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-white text-[#e31b53] overflow-x-hidden" },
    React.createElement(Navbar, null),
    showAlert &&
      React.createElement(
        "div",
        {
          className:
            "fixed top-4 right-4 z-50 bg-[#e31b53] text-white px-4 py-2 rounded-md shadow-lg animate-fade-in",
        },
        React.createElement("p", null, alertMessage)
      ),
    showInfoModal &&
      React.createElement(
        "div",
        {
          className:
            "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80",
        },
        React.createElement(
          "div",
          {
            className:
              "bg-white border border-[#e31b53] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",
          },
          React.createElement(
            "div",
            { className: "p-6 space-y-4" },
            React.createElement(
              "div",
              { className: "flex justify-between items-center" },
              React.createElement(
                "h2",
                { className: "text-xl sm:text-2xl font-bold text-[#e31b53]" },
                selectedContent?.title
              ),
              React.createElement(
                "button",
                {
                  onClick: () => setShowInfoModal(false),
                  className: "text-[#e31b53] transition-colors",
                },
                React.createElement(X, { className: "w-6 h-6" })
              )
            ),
            React.createElement(
              "div",
              { className: "aspect-video w-full overflow-hidden rounded-lg" },
              React.createElement("img", {
                src: selectedContent?.imageUrl,
                alt: selectedContent?.title,
                className: "w-full h-full object-cover",
              })
            ),
            React.createElement(
              "div",
              { className: "flex items-center gap-3 text-sm text-gray-950" },
              React.createElement(
                "span",
                null,
                selectedContent?.contentType === "series"
                  ? `${selectedContent?.seasons?.length || 0} Seasons`
                  : "Movie"
              ),
              React.createElement("span", null, "•"),
              React.createElement("span", null, selectedContent?.releaseYear)
            ),
            React.createElement(
              "p",
              { className: "text-sm sm:text-base text-gray-950" },
              selectedContent?.description
            ),
            React.createElement(
              "div",
              { className: "flex flex-wrap gap-2" },
              selectedContent?.genre?.map((g, idx) =>
                React.createElement(
                  "span",
                  {
                    key: idx,
                    className:
                      "text-xs px-2 py-1 bg-[#e31b53] text-white rounded-full text-[#ff7aa8]",
                  },
                  g
                )
              )
            ),
            React.createElement(
              "div",
              { className: "flex justify-between items-center" },
              React.createElement(
                "div",
                { className: "flex gap-2" },
                React.createElement(
                  "span",
                  {
                    className:
                      "text-sm bg-[#e31b53] text-white px-2 py-1 rounded text-[#e31b53] w-fit",
                  },
                  selectedContent?.rating || "Age 3-10"
                )
              ),

              React.createElement(
                "button",
                {
                  onClick: () => handleAddToWishlist(selectedContent),
                  className:
                    "flex items-center gap-2 bg-[#e31b53] hover:bg-[#ff2d6d] text-white px-4 py-2 rounded-md transition-colors",
                },
                isInWishlist(selectedContent?._id)
                  ? React.createElement(Check, { className: "w-4 h-4" })
                  : React.createElement(Heart, {
                      className: "w-4 h-4 fill-[#e31b53]",
                    }),
                React.createElement(
                  "span",
                  { className: "text-sm" },
                  isInWishlist(selectedContent?._id)
                    ? "In Wishlist"
                    : "Add to Wishlist"
                )
              )
            ),
            React.createElement(
              "button",
              {
                onClick: () => {
                  handleWatchClick(selectedContent);
                  setShowInfoModal(false);
                },
                className:
                  "w-full flex items-center justify-center gap-2 bg-[#e31b53] hover:bg-[#ff2d6d] text-white px-4 py-2 rounded-md transition-colors",
              },
              React.createElement(Play, { className: "w-4 h-4" }),
              React.createElement("span", { className: "text-sm" }, "Watch Now")
            )
          )
        )
      ),
    featuredContent &&
      React.createElement(
        "div",
        {
          className:
            "relative w-full h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[85vh]",
        },
        React.createElement(
          "div",
          {
            className:
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
          },
          React.createElement("img", {
            src: featuredContent.imageUrl,
            alt: featuredContent.title,
            className: "w-full h-full object-cover object-center",
            loading: "eager",
            onError: (e) => {
              e.target.src = "/placeholder-image.jpg";
            },
          }),
          React.createElement("div", {
            className:
              "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent",
          })
        ),
        React.createElement(
          "div",
          {
            className:
              "relative h-full flex flex-col justify-end pb-4 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-2 md:space-y-3 lg:space-y-4",
          },
          React.createElement(
            "h1",
            {
              className:
                "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold max-w-[95%] md:max-w-3xl lg:max-w-4xl drop-shadow-2xl text-white leading-tight",
            },
            featuredContent.title
          ),
          React.createElement(
            "p",
            {
              className:
                "text-xs xs:text-sm sm:text-base md:text-lg max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] line-clamp-2 xs:line-clamp-3 sm:line-clamp-4 md:line-clamp-5 text-gray-200 drop-shadow-lg",
            },
            featuredContent.description
          ),
          featuredContent.genre &&
            React.createElement(
              "div",
              { className: "flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2" },
              featuredContent.genre.slice(0, 4).map((g, idx) =>
                React.createElement(
                  "span",
                  {
                    key: idx,
                    className:
                      "text-[10px] xs:text-xs sm:text-sm px-2 py-1 bg-[#e31b53]/20 rounded-full text-[#ff7aa8] backdrop-blur-sm",
                  },
                  g
                )
              )
            ),
          React.createElement(
            "div",
            { className: "flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3 md:mt-4" },
            React.createElement(
              "button",
              {
                onClick: () => handleWatchClick(featuredContent),
                className:
                  "flex items-center gap-1 sm:gap-2 bg-[#e31b53] hover:bg-[#ff2d6d] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_2px_rgba(227,27,83,0.6)] text-xs sm:text-sm md:text-base",
              },
              React.createElement(Play, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              React.createElement(
                "span",
                { className: "text-xs sm:text-sm md:text-base" },
                "Watch Now"
              )
            ),
            React.createElement(
              "div",
              { className: "flex gap-2 sm:gap-3" },
              React.createElement(
                "button",
                {
                  onClick: () => handleAddToWishlist(featuredContent),
                  className:
                    "p-1.5 sm:p-2 md:p-2.5 bg-white hover:bg-white/80 text-[#e31b53] rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-110",
                },
                isInWishlist(featuredContent._id)
                  ? React.createElement(Check, {
                      className: "w-5 h-5 sm:w-6 sm:h-6",
                    })
                  : React.createElement(Heart, {
                      className: "w-5 h-5 sm:w-6 sm:h-6 fill-[#e31b53]",
                    })
              ),
              React.createElement(
                "button",
                {
                  onClick: () => handleInfoClick(featuredContent),
                  className:
                    "p-1.5 sm:p-2 md:p-2.5 bg-white hover:bg-white/80 text-[#e31b53] rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-110",
                },
                React.createElement(Info, {
                  className: "w-5 h-5 sm:w-6 sm:h-6",
                })
              )
            )
          ),
          React.createElement(
            "div",
            {
              className:
                "w-21 bg-white text-[#e31b53] px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#e31b53]/30",
            },
            React.createElement(
              "p",
              {
                className: "text-xs sm:text-sm font-medium",
              },
              featuredContent.rating || "Age 3-10"
            )
          )
        )
      ),
    React.createElement(
      "div",
      {
        className:
          "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 space-y-6 sm:space-y-8 md:space-y-10 pb-6 sm:pb-8 md:pb-12 lg:pb-16 mt-8 sm:mt-12 md:mt-16",
        style: {
          backgroundImage: "url('/bg-pink.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      categories.map((category, idx) =>
        React.createElement(
          "div",
          { key: idx, className: "space-y-2 sm:space-y-3 md:space-y-4" },
          React.createElement(
            "div",
            { className: "flex justify-between items-center mb-3" },
            React.createElement(
              "h2",
              {
                className:
                  "text-base sm:text-lg md:text-xl lg:text-2xl font-bold",
              },
              category.title
            )
          ),
          React.createElement(Carousel, {
            items: category.content,
            renderItem: (item, index) =>
              React.createElement(ContentCard, {
                item: item,
                index: index,
                onClick: () => handleInfoClick(item),
              }),
          })
        )
      )
    )
  );
};

export default Animated;
