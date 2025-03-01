import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Categories = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  const [year, setYear] = useState("all");
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);
  const popupRef = useRef(null);
  const sortRef = useRef(null);
  const yearRef = useRef(null);

  const genres = [
    { name: "Movies", bgimg: "/categories/movies.png" },
    { name: "Series", bgimg: "/categories/series.png" },
    { name: "Edutainment", bgimg: "/categories/edutaiment.png" },
    { name: "Creativity", bgimg: "/categories/creativity.png" },
    { name: "Language-&-Communication", bgimg: "/categories/language.png" },
    { name: "Animated", bgimg: "/categories/animated.png" },
    { name: "Live-Performances-&-Shows", bgimg: "/categories/live.png" },
    { name: "Discovery", bgimg: "/categories/explore.png" },
    { name: "Fitness", bgimg: "/categories/sports.png" },
    { name: "Storytelling", bgimg: "/categories/storytelling.png" },
    { name: "Brain-Boosters", bgimg: "/categories/brain.png" },
  ];

  const years = ["Toddlers", "Pre-teens", "Teenagers"];
  const sortOptions = ["popularity", "latest", "oldest", "alphabetical"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpenSort(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setIsOpenYear(false);
      }
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        selectedGenre
      ) {
        setSelectedGenre(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedGenre]);

  const handleApplyFilters = () => {
    const genrePath = selectedGenre.toLowerCase();
    navigate(`/${genrePath}`);
  };

  // Helper function to create elements with classes
  const createElement = (type, props, ...children) => {
    return React.createElement(
      type,
      { ...props, className: props.className },
      ...children
    );
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-white" },
    React.createElement(Navbar, null),
    React.createElement(
      "main",
      {
        className:
          "w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8 sm:px-6 lg:px-8 mt-16",
      },
      // Categories Section
      createElement(
        "div",
        { className: "space-y-1 sm:space-y-2 mb-6 sm:mb-8" },
        createElement(
          "h1",
          {
            className:
              "text-3xl sm:text-4xl font-bold text-[#e31b53] bg-gradient-to-r from-[#e31b53] to-[#ff7aa8] bg-clip-text",
          },
          "Categories"
        ),
        createElement(
          "h2",
          { className: "text-lg sm:text-xl text-gray-400" },
          "Genre"
        )
      ),
      // Genre Grid
      createElement(
        "div",
        {
          className:
            "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4",
        },
        genres.map((genre) =>
          createElement(
            "div",
            {
              key: genre.name,
              onClick: () => setSelectedGenre(genre.name),
              className:
                "relative bg-white/10 rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/20 hover:-translate-y-1 hover:shadow-[0_0_25px_rgb(233,27,83)] group aspect-square",
              style: {
                backgroundImage: `url(${genre.bgimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              },
            },
            createElement(
              "div",
              {
                className:
                  "absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center",
              },
              createElement(
                "h2",
                {
                  className:
                    "text-lg sm:text-xl lg:text-2xl text-white font-semibold transition-colors",
                },
                genre.name
              )
            )
          )
        )
      ),
      // Filter Popup
      selectedGenre &&
        createElement(
          "div",
          {
            className:
              "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
          },
          createElement(
            "div",
            {
              ref: popupRef,
              className: "bg-gray-900 rounded-xl p-6 w-full max-w-md relative",
            },
            createElement(
              "button",
              {
                onClick: () => setSelectedGenre(null),
                className:
                  "absolute right-4 top-4 text-gray-400 hover:text-white",
              },
              React.createElement(X, { size: 24 })
            ),
            createElement(
              "h3",
              { className: "text-2xl font-bold text-white mb-6" },
              `${selectedGenre} Filters`
            ),
            createElement(
              "div",
              { className: "space-y-4" },
              // Sort Dropdown
              createElement(
                "div",
                { className: "relative w-full", ref: sortRef },
                createElement(
                  "button",
                  {
                    onClick: () => setIsOpenSort(!isOpenSort),
                    className:
                      "w-full appearance-none bg-white text-black px-4 py-2.5 rounded-lg capitalize cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors",
                  },
                  sortBy,
                  React.createElement(ChevronDown, {
                    className: `ml-2 transform transition-transform duration-200 ${
                      isOpenSort ? "rotate-180" : ""
                    }`,
                    size: 16,
                  })
                ),
                isOpenSort &&
                  createElement(
                    "div",
                    {
                      className:
                        "absolute z-10 mt-1 w-full text-black bg-white rounded-lg shadow-xl border border-gray-100",
                    },
                    sortOptions.map((option) =>
                      createElement(
                        "div",
                        {
                          key: option,
                          className:
                            "px-4 py-2 hover:bg-gray-50 cursor-pointer capitalize first:rounded-t-lg last:rounded-b-lg",
                          onClick: () => {
                            setSortBy(option);
                            setIsOpenSort(false);
                          },
                        },
                        option
                      )
                    )
                  )
              ),
              // Year Dropdown
              createElement(
                "div",
                { className: "relative w-full", ref: yearRef },
                createElement(
                  "button",
                  {
                    onClick: () => setIsOpenYear(!isOpenYear),
                    className:
                      "w-full appearance-none bg-white text-black px-4 py-2.5 rounded-lg capitalize cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors",
                  },
                  year === "all" ? "Age Based" : year,
                  React.createElement(ChevronDown, {
                    className: `ml-2 transform transition-transform duration-200 ${
                      isOpenYear ? "rotate-180" : ""
                    }`,
                    size: 16,
                  })
                ),
                isOpenYear &&
                  createElement(
                    "div",
                    {
                      className:
                        "absolute z-10 mt-1 w-full text-black bg-white rounded-lg shadow-xl border border-gray-100",
                    },
                    years.map((yearOption) =>
                      createElement(
                        "div",
                        {
                          key: yearOption,
                          className:
                            "px-4 py-2 hover:bg-gray-50 cursor-pointer capitalize first:rounded-t-lg last:rounded-b-lg",
                          onClick: () => {
                            setYear(yearOption);
                            setIsOpenYear(false);
                          },
                        },
                        yearOption === "all" ? "Age based" : yearOption
                      )
                    )
                  )
              ),
              // Apply Filters Button
              createElement(
                "button",
                {
                  onClick: handleApplyFilters,
                  className:
                    "w-full bg-[#e31b53] text-white py-2.5 rounded-lg hover:bg-[#ff2e6a] transition-colors font-semibold mt-4",
                },
                "Apply Filters"
              )
            )
          )
        )
    )
  );
};

export default Categories;
