import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ChevronDown } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [sortOption, setSortOption] = useState("alphabetical");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [moviesResponse, seriesResponse] = await Promise.all([
          fetch("https://kids-ott-backend.onrender.com/api/movies"),
          fetch("https://kids-ott-backend.onrender.com/api/series"),
        ]);

        if (!moviesResponse.ok || !seriesResponse.ok) {
          throw new Error("Failed to fetch content");
        }

        const moviesData = await moviesResponse.json();
        const seriesData = await seriesResponse.json();

        const allContent = [
          ...moviesData.map((movie) => ({
            ...movie,
            contentType: "movie",
            dateAdded: new Date().toISOString(),
            popularity: Math.random() * 100,
          })),
          ...seriesData.map((series) => ({
            ...series,
            contentType: "series",
            dateAdded: new Date().toISOString(),
            popularity: Math.random() * 100,
          })),
        ];

        const randomWishlist = allContent
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setWishlist(randomWishlist);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch wishlist content");
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const sortedWishlist = React.useMemo(() => {
    return [...wishlist].sort((a, b) => {
      switch (sortOption) {
        case "latest":
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case "oldest":
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case "popularity":
          return b.popularity - a.popularity;
        case "alphabetical":
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [wishlist, sortOption]);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  if (loading) {
    return React.createElement(
      "div",
      { className: "min-h-screen bg-white flex items-center justify-center" },
      React.createElement(
        "p",
        { className: "text-[#e31b53] text-lg animate-pulse" },
        "Loading your wishlist..."
      )
    );
  }

  if (error) {
    return React.createElement(
      "div",
      { className: "min-h-screen bg-white flex items-center justify-center" },
      React.createElement("p", { className: "text-[#e31b53] text-lg" }, error)
    );
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar),
    React.createElement(
      "div",
      {
        className: "min-h-screen bg-white text-[#e31b53] p-4 sm:p-6 md:p-8",
      },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto" },
        // Header with title and sort dropdown
        React.createElement(
          "div",
          { className: "flex justify-between items-center mb-6" },
          React.createElement(
            "h1",
            { className: "text-2xl sm:text-3xl font-bold" },
            "Your Wishlist"
          ),
          React.createElement(
            "div",
            { className: "relative" },
            React.createElement(
              "button",
              {
                onClick: () => setIsDropdownOpen(!isDropdownOpen),
                className:
                  "flex items-center gap-2 px-4 py-2 bg-white rounded-md hover:bg-gray-50 transition-colors border border-[#e31b53]",
              },
              "Sort by",
              React.createElement(ChevronDown, { className: "w-4 h-4" })
            ),
            isDropdownOpen &&
              React.createElement(
                "div",
                {
                  className:
                    "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200",
                },
                React.createElement(
                  "div",
                  { className: "py-1" },
                  [
                    { label: "Alphabetical", value: "alphabetical" },
                    { label: "Latest", value: "latest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "Popularity", value: "popularity" },
                  ].map((option) =>
                    React.createElement(
                      "button",
                      {
                        key: option.value,
                        onClick: () => {
                          setSortOption(option.value);
                          setIsDropdownOpen(false);
                        },
                        className: `block w-full text-left px-4 py-2 text-sm ${
                          sortOption === option.value
                            ? "bg-[#e31b53] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`,
                      },
                      option.label
                    )
                  )
                )
              )
          )
        ),
        // Grid of wishlist items
        React.createElement(
          "div",
          {
            className:
              "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
          },
          sortedWishlist.map((item) =>
            React.createElement(
              "div",
              {
                key: item._id,
                className:
                  "relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
              },
              React.createElement(
                "div",
                { className: "aspect-square relative rounded-lg" },
                React.createElement("img", {
                  src: item.imageUrl,
                  alt: item.title,
                  className: "w-full h-full object-cover rounded-lg",
                  onError: (e) => {
                    e.target.src = "/placeholder-image.jpg";
                  },
                }),
                React.createElement(
                  "div",
                  {
                    className:
                      "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end rounded-lg",
                  },
                  React.createElement(
                    "h3",
                    { className: "text-white font-semibold mb-2" },
                    item.title
                  ),
                  React.createElement(
                    "div",
                    { className: "text-gray-200 text-sm space-y-1" },
                    React.createElement(
                      "p",
                      null,
                      `${item.contentType === "movie" ? "Movie" : "Series"}`
                    ),
                    item.genre &&
                      React.createElement(
                        "p",
                        { className: "text-xs opacity-75" },
                        item.genre.join(", ")
                      )
                  ),
                  React.createElement(
                    "button",
                    {
                      onClick: () => handleRemove(item._id),
                      className:
                        "mt-2 bg-[#e31b53] text-white px-3 py-1 rounded-md text-sm hover:bg-[#ff2d6d] transition-colors",
                    },
                    "Remove"
                  )
                )
              )
            )
          )
        ),
        // Empty state
        wishlist.length === 0 &&
          React.createElement(
            "div",
            { className: "text-center py-12" },
            React.createElement(
              "p",
              { className: "text-gray-500" },
              "Your wishlist is empty"
            )
          )
      )
    )
  );
};

export default Wishlist;
