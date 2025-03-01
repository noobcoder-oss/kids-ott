import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  Search,
  User,
  X,
  Home,
  CreditCard,
  LogIn,
  UserPlus,
  UserCircle,
  ChevronDown,
  ChevronUp,
  GamepadIcon,
  LayoutDashboardIcon,
  Heart,
  Mic,
} from "lucide-react";
import BedtimeModal from "./BedtimeModel";
import BedtimeToggle from "./BedtimeToggle";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const NavItem = ({ item, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = item.icon;

  return React.createElement(
    Link,
    {
      to: item.href || "#",
      className: `relative group flex items-center px-2 sm:px-3 py-1 rounded-full transition-all duration-300 ${
        isActive
          ? "text-white bg-[#e31b53]"
          : "text-black hover:bg-[#e31b53]/20"
      }`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
    React.createElement(
      "div",
      { className: "relative flex items-center gap-1 sm:gap-2" },
      React.createElement(IconComponent, {
        size: 16,
        className: `transition-all duration-300 ${
          isActive || isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`,
      }),
      React.createElement(
        "span",
        {
          className: `text-sm sm:text-base transition-all duration-300 ${
            isHovered && !isActive ? "pl-1 sm:pl-2" : ""
          }`,
        },
        item.name
      )
    ),
    isHovered &&
      !isActive &&
      React.createElement("div", {
        className:
          "absolute -bottom-2 left-0 w-full h-0.5 bg-[#e31b53] origin-left animate-grow",
      })
  );
};

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileProfileDropdownOpen, setIsMobileProfileDropdownOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allContent, setAllContent] = useState([]);
  const [isBedtimeModalOpen, setIsBedtimeModalOpen] = useState(false);
  const [bedtimeModalType, setBedtimeModalType] = useState("warning");

  const location = useLocation();
  const navigate = useNavigate();

  // Speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
      handleSearch(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });

    // Stop listening after 5 seconds
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 5000);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, seriesResponse] = await Promise.all([
          fetch("https://kids-ott-backend.onrender.com/api/movies"),
          fetch("https://kids-ott-backend.onrender.com/api/series"),
        ]);

        const movies = await moviesResponse.json();
        const series = await seriesResponse.json();

        const formattedMovies = movies.map((movie) => ({
          ...movie,
          type: "movie",
        }));

        const formattedSeries = series.map((series) => ({
          ...series,
          type: "series",
        }));

        setAllContent([...formattedMovies, ...formattedSeries]);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);

    setTimeout(() => {
      if (query.trim() === "") {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const filteredResults = allContent
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.genre &&
              item.genre.some((g) =>
                g.toLowerCase().includes(query.toLowerCase())
              ))
        )
        .slice(0, 8);

      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 300);
  };

  const handleResultClick = (result) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);

    if (result.type === "movie") {
      navigate(`/movies/movie`);
    } else if (result.type === "series") {
      navigate(`/series/${result._id}/seasons`);
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Category", href: "/categories", icon: LayoutDashboardIcon },
    { name: "Games", href: "/games", icon: GamepadIcon },
    { name: "Subscription", href: "/subscription", icon: CreditCard },
  ];

  const profileDropdownItems = [
    { name: "Profile", href: "/profile", icon: UserCircle },
    { name: "Sign Up", href: "/signup", icon: UserPlus },
    { name: "Sign In", href: "/signin", icon: LogIn },
  ];

  const handleBedtimeToggle = (isActive) => {
    if (isActive) {
      setBedtimeModalType("warning");
      setIsBedtimeModalOpen(true);
      setTimeout(() => {
        setBedtimeModalType("activated");
        setIsBedtimeModalOpen(true);
      }, 5 * 60 * 1000);
    } else {
      setIsBedtimeModalOpen(false);
    }
  };

  const handleBedtimeModalClose = () => {
    setIsBedtimeModalOpen(false);
  };

  const handleBedtimeModalAction = () => {
    if (bedtimeModalType === "warning") {
      setIsBedtimeModalOpen(false);
    } else if (bedtimeModalType === "activated") {
      setIsBedtimeModalOpen(false);
    }
  };

  // Smart recommendations based on popular content
  const getSmartRecommendations = () => {
    return allContent
      .sort((a, b) => b.views - a.views) // Sort by views (assuming views field exists)
      .slice(0, 5); // Top 5 recommendations
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "bg-white text-black relative" },
      React.createElement(
        "nav",
        {
          className:
            "max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3",
        },
        React.createElement(
          Link,
          { to: "/" },
          React.createElement(
            "div",
            { className: "flex items-center" },
            React.createElement("img", {
              src: "/logo.png",
              alt: "Logo",
              className: "h-6 sm:h-8 hover:scale-105 transition-transform",
            })
          )
        ),
        React.createElement(
          "div",
          {
            className:
              "hidden xl:flex gap-2 xl:gap-4 px-3 xl:px-6 py-1.5 xl:py-2",
          },
          navItems.map((item) =>
            React.createElement(NavItem, {
              key: item.name,
              item: item,
              isActive: location.pathname === item.href,
            })
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-2 sm:gap-4" },
          // Mobile BedtimeToggle
          React.createElement(
            "div",
            { className: "xl:hidden" },
            React.createElement(BedtimeToggle, {
              onToggle: handleBedtimeToggle,
            })
          ),
          React.createElement(
            "button",
            {
              className: "group relative text-black p-1 transition-colors",
              onClick: () => setIsSearchOpen(!isSearchOpen),
            },
            React.createElement(Search, {
              size: 20,
              className: "group-hover:scale-110 transition-all",
            })
          ),
          React.createElement(
            "div",
            {
              className:
                "hidden xl:flex items-center gap-2 xl:gap-4 text-black",
            },
            [
              React.createElement(
                Link,
                { key: "wishlist", to: "/wishlist" },
                React.createElement(
                  "button",
                  { className: "group p-1 text-black" },
                  React.createElement(Heart, {
                    size: 20,
                    className: "group-hover:scale-110 transition-all ",
                  })
                )
              ),
              React.createElement(
                "button",
                { key: "notifications", className: "group p-1 text-black" },
                React.createElement(Bell, {
                  size: 20,
                  className: "group-hover:scale-110 transition-all",
                })
              ),
              React.createElement(
                "div",
                { key: "profile", className: "relative" },
                React.createElement(
                  "button",
                  {
                    className:
                      " text-[#e31b53] p-1 border-1 border-black rounded-full hover:scale-105 transition-transform",
                    onClick: () =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen),
                  },
                  React.createElement(User, { size: 20 })
                ),
                isProfileDropdownOpen &&
                  React.createElement(
                    "div",
                    {
                      className:
                        "absolute right-0 top-full mt-2 w-48 border-1 bg-white text-black rounded-lg shadow-lg z-50",
                    },
                    profileDropdownItems.map((item) =>
                      React.createElement(
                        Link,
                        {
                          key: item.name,
                          to: item.href,
                          className:
                            "flex items-center px-4 py-2 text-sm hover:bg-[#e31b53]/20 transition-colors",
                          onClick: () => setIsProfileDropdownOpen(false),
                        },
                        React.createElement(item.icon, {
                          className: "mr-2",
                          size: 16,
                        }),
                        item.name
                      )
                    )
                  )
              ),
              // Desktop BedtimeToggle
              React.createElement(
                "div",
                { key: "bedtime-toggle" },
                React.createElement(BedtimeToggle, {
                  onToggle: handleBedtimeToggle,
                })
              ),
            ]
          ),
          React.createElement(
            "button",
            {
              className: "xl:hidden p-1 hover:rotate-90 transition-transform",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
            },
            isMobileMenuOpen
              ? React.createElement(X, { size: 24 })
              : React.createElement(Menu, { size: 24 })
          )
        )
      ),
      // Updated search overlay for both mobile and desktop
      isSearchOpen &&
        React.createElement(
          "div",
          {
            className:
              "absolute top-full left-0 w-full z-50 p-3 sm:p-4 bg-black/80",
          },
          React.createElement(
            "div",
            { className: "max-w-7xl mx-auto" },
            React.createElement(
              "div",
              { className: "flex gap-2 sm:gap-4 relative" },
              React.createElement(
                "div",
                { className: "w-full relative" },
                React.createElement("input", {
                  type: "text",
                  placeholder: "Search",
                  value: searchQuery,
                  onChange: (e) => handleSearch(e.target.value),
                  className:
                    "w-full px-3 sm:px-4 py-2 bg-white text-gray-800 rounded-lg text-sm sm:text-base pr-10",
                }),
                React.createElement(
                  "button",
                  {
                    className:
                      "absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e31b53]",
                    onClick: listening ? stopListening : startListening,
                  },
                  React.createElement(Mic, {
                    size: 20,
                    className: listening ? "text-[#e31b53]" : "",
                  })
                ),
                React.createElement(Search, {
                  size: 20,
                  className:
                    "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                })
              ),
              React.createElement(
                "button",
                {
                  className:
                    "bg-[#e31b53] text-white px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-sm sm:text-base",
                  onClick: () => setIsSearchOpen(false),
                },
                "Close"
              )
            ),
            searchQuery &&
              React.createElement(
                "div",
                {
                  className:
                    "mt-2 max-h-[300px] overflow-y-auto bg-white rounded-lg",
                },
                isLoading
                  ? React.createElement(
                      "div",
                      { className: "text-center py-4 text-black" },
                      "Loading..."
                    )
                  : searchResults.length > 0
                  ? searchResults.map((result) =>
                      React.createElement(
                        "button",
                        {
                          key: result._id,
                          onClick: () => handleResultClick(result),
                          className:
                            "w-full text-left px-4 py-2 hover:bg-[#e31b53]/20 flex items-center space-x-3",
                        },
                        React.createElement("img", {
                          src: result.imageUrl,
                          alt: result.title,
                          className: "w-12 h-16 object-cover rounded",
                        }),
                        React.createElement(
                          "div",
                          null,
                          React.createElement(
                            "div",
                            { className: "text-sm text-gray-800" },
                            result.title
                          ),
                          React.createElement(
                            "div",
                            { className: "text-xs text-gray-400" },
                            `${result.type} • ${
                              result.release_date?.slice(0, 4) || "N/A"
                            }`
                          )
                        )
                      )
                    )
                  : React.createElement(
                      "div",
                      { className: "text-center py-4 text-gray-400" },
                      "No results found"
                    )
              ),
            !searchQuery &&
              React.createElement(
                "div",
                { className: "mt-4" },
                React.createElement(
                  "h3",
                  { className: "text-lg font-semibold text-white" },
                  "Smart Recommendations"
                ),
                React.createElement(
                  "div",
                  {
                    className:
                      "mt-2 max-h-[300px] overflow-y-auto bg-white rounded-lg",
                  },
                  getSmartRecommendations().map((item) =>
                    React.createElement(
                      "button",
                      {
                        key: item._id,
                        onClick: () => handleResultClick(item),
                        className:
                          "w-full text-left px-4 py-2 hover:bg-[#e31b53]/20 flex items-center space-x-3",
                      },
                      React.createElement("img", {
                        src: item.imageUrl,
                        alt: item.title,
                        className: "w-12 h-16 object-cover rounded",
                      }),
                      React.createElement(
                        "div",
                        null,
                        React.createElement(
                          "div",
                          { className: "text-sm text-gray-800" },
                          item.title
                        ),
                        React.createElement(
                          "div",
                          { className: "text-xs text-gray-400" },
                          `${item.type} • ${
                            item.release_date?.slice(0, 4) || "N/A"
                          }`
                        )
                      )
                    )
                  )
                )
              )
          )
        ),
      // Mobile menu section with improved consistency
      isMobileMenuOpen &&
        React.createElement(
          "div",
          {
            className:
              "xl:hidden bg-white absolute top-full left-0 w-full z-50 shadow-lg border-t border-gray-100",
          },
          React.createElement(
            "div",
            { className: "flex flex-col p-4 gap-2" },
            // Main navigation items
            navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;
              return React.createElement(
                Link,
                {
                  key: item.name,
                  to: item.href,
                  className: `py-2.5 px-4 rounded-lg flex items-center gap-3 ${
                    isActive
                      ? "bg-[#e31b53] text-white font-medium"
                      : "hover:bg-[#e31b53]/10 text-gray-800"
                  }`,
                  onClick: () => setIsMobileMenuOpen(false),
                },
                React.createElement(IconComponent, {
                  size: 18,
                  className: `${isActive ? "text-white" : "text-[#e31b53]"}`,
                }),
                React.createElement("span", null, item.name)
              );
            }),

            // Divider
            React.createElement("div", {
              className: "h-px bg-gray-200 my-2",
            }),

            // Secondary actions with consistent styling
            React.createElement(
              Link,
              {
                to: "/wishlist",
                className:
                  "py-2.5 px-4 rounded-lg flex items-center gap-3 hover:bg-[#e31b53]/10 text-gray-800",
              },
              React.createElement(Heart, {
                size: 18,
                className: "text-[#e31b53]",
              }),
              React.createElement("span", null, "Wishlist")
            ),
            React.createElement(
              "button",
              {
                className:
                  "py-2.5 px-4 rounded-lg flex items-center gap-3 hover:bg-[#e31b53]/10 text-gray-800 w-full text-left",
              },
              React.createElement(Bell, {
                size: 18,
                className: "text-[#e31b53]",
              }),
              React.createElement("span", null, "Notifications")
            ),

            // Divider
            React.createElement("div", {
              className: "h-px bg-gray-200 my-2",
            }),

            // Profile dropdown section
            React.createElement(
              "button",
              {
                className:
                  "w-full flex justify-between items-center py-2.5 px-4 rounded-lg text-gray-800 hover:bg-[#e31b53]/10",
                onClick: () =>
                  setIsMobileProfileDropdownOpen(!isMobileProfileDropdownOpen),
              },
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                React.createElement(User, {
                  size: 18,
                  className: "text-[#e31b53]",
                }),
                React.createElement("span", null, "Profile")
              ),
              isMobileProfileDropdownOpen
                ? React.createElement(ChevronUp, {
                    size: 18,
                    className: "text-gray-500",
                  })
                : React.createElement(ChevronDown, {
                    size: 18,
                    className: "text-gray-500",
                  })
            ),

            // Profile dropdown items with animated transition
            isMobileProfileDropdownOpen &&
              React.createElement(
                "div",
                {
                  className:
                    "mt-1 space-y-1 pl-4 border-l-2 border-[#e31b53]/30 ml-3 animate-fadeIn",
                },
                profileDropdownItems.map((item) =>
                  React.createElement(
                    Link,
                    {
                      key: item.name,
                      to: item.href,
                      className:
                        "flex items-center gap-3 py-2.5 px-4 text-gray-700 hover:bg-[#e31b53]/10 rounded-lg",
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        setIsMobileProfileDropdownOpen(false);
                      },
                    },
                    React.createElement(item.icon, {
                      size: 18,
                      className: "text-gray-500",
                    }),
                    React.createElement("span", null, item.name)
                  )
                )
              )
          )
        ),
      React.createElement(BedtimeModal, {
        isOpen: isBedtimeModalOpen,
        onClose: handleBedtimeModalClose,
        type: bedtimeModalType,
        onAction: handleBedtimeModalAction,
      })
    )
  );
};

export default Navbar;
