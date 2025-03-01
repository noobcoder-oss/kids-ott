import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Play,
  Filter,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import Navbar from "./Navbar";

const SeriesDisplay = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedEpisodes, setExpandedEpisodes] = useState({});
  const [filters, setFilters] = useState({
    duration: "all",
  });

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      if (!seriesId) {
        setError("Invalid series ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://kids-ott-backend.onrender.com/api/series/${seriesId}/seasons`
        );
        if (!response.ok) throw new Error("Failed to fetch series");
        const data = await response.json();
        setSeries(data);
        setSelectedSeason(data.seasons[0]?.seasonNumber);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [seriesId]);

  const toggleEpisodeExpansion = (episodeId) => {
    setExpandedEpisodes((prev) => ({
      ...prev,
      [episodeId]: !prev[episodeId],
    }));
  };

  const filterEpisodes = (episodes) => {
    if (!episodes) return [];
    return episodes.filter((episode) => {
      if (filters.duration !== "all") {
        const duration = parseInt(episode.duration);
        if (filters.duration === "short" && duration >= 30) return false;
        if (filters.duration === "long" && duration < 30) return false;
      }
      return true;
    });
  };

  const sortEpisodes = (episodes) => {
    return [...episodes].sort((a, b) => {
      const compareValue = a.episodeNumber - b.episodeNumber;
      return sortOrder === "asc" ? compareValue : -compareValue;
    });
  };

  const getCurrentSeasonEpisodes = () => {
    if (!series || !selectedSeason) return [];
    const currentSeason = series.seasons.find(
      (s) => s.seasonNumber === selectedSeason
    );
    const filtered = filterEpisodes(currentSeason?.episodes || []);
    return sortEpisodes(filtered);
  };

  if (loading) {
    return React.createElement(
      "div",
      {
        className: "min-h-screen bg-white flex items-center justify-center p-4",
      },
      React.createElement(
        "div",
        { className: "animate-pulse text-xl text-[#e31b53]" },
        "Loading..."
      )
    );
  }

  if (error) {
    return React.createElement(
      "div",
      {
        className:
          "min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-4",
      },
      React.createElement(
        "div",
        { className: "text-[#e31b53] text-xl text-center" },
        error
      ),
      React.createElement(
        "button",
        {
          onClick: () => navigate("/"),
          className:
            "px-6 py-3 text-[#e31b53] border border-[#e31b53] rounded-lg hover:bg-[#e31b53]/10 transition-colors",
        },
        "Back to Home"
      )
    );
  }

  return React.createElement(
    "div",
    { className: "min-h-screen bg-white" },
    React.createElement(Navbar, null),
    React.createElement(
      "div",
      { className: "p-4 max-w-7xl mx-auto" },
      // Back Button
      React.createElement(
        "button",
        {
          onClick: () => navigate("/"),
          className:
            "flex items-center gap-2 text-[#e31b53] hover:text-pink-400 mb-6",
        },
        React.createElement(ArrowLeft, { className: "w-5 h-5" }),
        "Back to Home"
      ),

      // Series Info
      React.createElement(
        "div",
        { className: "flex flex-col sm:flex-row gap-6 mb-8" },
        React.createElement("img", {
          src: series?.imageUrl || "/api/placeholder/300/450",
          alt: series?.title,
          className:
            "w-64 h-64 object-cover rounded-lg shadow-md mx-auto sm:mx-0",
        }),
        React.createElement(
          "div",
          { className: "flex-1" },
          React.createElement(
            "h1",
            { className: "text-2xl font-bold mb-3 text-[#e31b53]" },
            series?.title
          ),
          React.createElement(
            "p",
            { className: "text-gray-800 mb-4" },
            series?.description
          ),
          React.createElement(
            "div",
            { className: "flex flex-wrap gap-2" },
            series?.genre?.map((g, idx) =>
              React.createElement(
                "span",
                {
                  key: idx,
                  className:
                    "px-3 py-1 bg-[#e31b53]/10 rounded-full text-[#e31b53] text-sm",
                },
                g
              )
            )
          )
        )
      ),

      // Combined Seasons and Filters in single line
      React.createElement(
        "div",
        { className: "mb-6 flex flex-wrap items-center gap-4" },

        // Season Selector
        React.createElement(
          "div",
          { className: "relative" },
          React.createElement(
            "select",
            {
              value: selectedSeason,
              onChange: (e) => setSelectedSeason(Number(e.target.value)),
              className:
                "appearance-none bg-white text-[#e31b53] border border-[#e31b53] rounded-lg px-4 py-2 pr-10 cursor-pointer hover:bg-[#e31b53]/5 transition-colors outline-none",
            },
            series?.seasons?.map((season) =>
              React.createElement(
                "option",
                { key: season.seasonNumber, value: season.seasonNumber },
                "Season ",
                season.seasonNumber
              )
            )
          ),
          React.createElement(ChevronDown, {
            className:
              "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#e31b53] pointer-events-none",
          })
        ),

        // Duration Filter
        React.createElement(
          "div",
          { className: "relative" },
          React.createElement(
            "select",
            {
              value: filters.duration,
              onChange: (e) =>
                setFilters((prev) => ({
                  ...prev,
                  duration: e.target.value,
                })),
              className:
                "appearance-none bg-white text-[#e31b53] border border-[#e31b53] rounded-lg px-4 py-2 pr-10 cursor-pointer hover:bg-[#e31b53]/5 transition-colors outline-none",
            },
            React.createElement("option", { value: "all" }, "All Durations"),
            React.createElement("option", { value: "short" }, "Under 30 mins"),
            React.createElement("option", { value: "long" }, "Over 30 mins")
          ),
          React.createElement(ChevronDown, {
            className:
              "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#e31b53] pointer-events-none",
          })
        ),

        // Sort Order Button
        React.createElement(
          "button",
          {
            onClick: () =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc")),
            className:
              "flex items-center justify-center gap-2 px-4 py-2 border border-[#e31b53] rounded-lg hover:bg-[#e31b53]/5 transition-colors text-[#e31b53]",
          },
          sortOrder === "asc"
            ? React.createElement(SortAsc, { className: "w-5 h-5" })
            : React.createElement(SortDesc, { className: "w-5 h-5" }),
          sortOrder === "asc" ? "Oldest First" : "Newest First"
        )
      ),

      // Episodes List
      React.createElement(
        "div",
        { className: "space-y-4" },
        getCurrentSeasonEpisodes().map((episode) =>
          React.createElement(
            "div",
            {
              key: episode._id,
              className:
                "bg-[#e31b53] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-white",
            },
            React.createElement(
              "div",
              {
                className:
                  "flex items-center justify-between p-4 cursor-pointer",
                onClick: () => toggleEpisodeExpansion(episode._id),
              },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "h3",
                  { className: "font-medium" },
                  episode.episodeNumber,
                  ". ",
                  episode.title
                ),
                React.createElement(
                  "p",
                  { className: "text-sm text-white/80" },
                  "Duration: ",
                  episode.duration || 20,
                  "mins"
                )
              ),
              expandedEpisodes[episode._id]
                ? React.createElement(ChevronUp, {
                    className: "w-5 h-5 text-white",
                  })
                : React.createElement(ChevronDown, {
                    className: "w-5 h-5 text-white",
                  })
            ),
            expandedEpisodes[episode._id] &&
              React.createElement(
                "div",
                { className: "p-4 border-t border-white/20" },
                React.createElement(
                  "p",
                  { className: "text-white/90 mb-4" },
                  episode.description
                ),
                React.createElement(
                  Link,
                  { to: "/movies/movie" },
                  React.createElement(
                    "button",
                    {
                      className:
                        "flex items-center gap-2 bg-white text-[#e31b53] px-4 py-2 rounded-lg hover:bg-white/90 transition-colors",
                    },
                    React.createElement(Play, { className: "w-5 h-5" }),
                    "Play Episode"
                  )
                )
              )
          )
        )
      )
    )
  );
};

export default SeriesDisplay;
