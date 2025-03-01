import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  Volume2,
  VolumeX,
  Sun,
  Maximize,
  Pause,
  Star,
  Clock,
  Languages,
  Info,
  Settings,
  Mic,
  X,
} from "lucide-react";
import Navbar from "./Navbar";

// Import the quiz questions and modal
import { quizQuestions } from "../components/quizQuestions";
import { createQuizModal } from "../components/createQuizModal";

const voiceOvers = {
  en: { name: "English Commentary", url: "/audio/commentary-en.mp3" },
  es: { name: "Spanish Commentary", url: "/audio/commentary-es.mp3" },
  fr: { name: "French Commentary", url: "/audio/commentary-fr.mp3" },
};

const languages = {
  en: { name: "English", subtitles: "/subtitles/en.vtt" },
  es: { name: "Spanish", subtitles: "/subtitles/es.vtt" },
  fr: { name: "French", subtitles: "/subtitles/fr.vtt" },
};

const videoSources = {
  "360p": { url: "/Trailer.mp4", label: "SD (360p)" },
  "480p": { url: "/Trailer.mp4", label: "SD (480p)" },
  "720p": { url: "/Trailer.mp4", label: "HD (720p)" },
  "1080p": { url: "/Trailer.mp4", label: "Full HD (1080p)" },
  "1440p": { url: "/Trailer.mp4", label: "Quad HD (1440p)" },
  "2160p": { url: "/Trailer.mp4", label: "4K UHD (2160p)" },
};

const MovieDisplay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [isQualityChanging, setIsQualityChanging] = useState(false);
  const [volume, setVolume] = useState(100);
  const [prevVolume, setPrevVolume] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedVoiceOver, setSelectedVoiceOver] = useState(null);
  const [voiceOverVolume, setVoiceOverVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastPlaybackPosition, setLastPlaybackPosition] = useState(0);
  const [wasPlaying, setWasPlaying] = useState(false);

  // Add these new states in MovieDisplay component
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [earnedRewards, setEarnedRewards] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const voiceOverRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSources[selectedQuality].url;
      videoRef.current.load(); // Ensure the video is loaded
      videoRef.current.addEventListener("loadedmetadata", () => {
        setDuration(videoRef.current.duration);
      });
    }
  }, [selectedQuality]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (selectedVoiceOver && voiceOverRef.current) {
            voiceOverRef.current.currentTime = videoRef.current.currentTime;
            voiceOverRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (voiceOverRef.current) {
        voiceOverRef.current.pause();
      }
    }
  };

  const handleQualityChange = (quality) => {
    if (quality === selectedQuality || !videoRef.current) return;

    setIsQualityChanging(true);
    setLastPlaybackPosition(videoRef.current.currentTime);
    setWasPlaying(isPlaying);

    setSelectedQuality(quality);
    videoRef.current.src = videoSources[quality].url;

    videoRef.current.load();
    videoRef.current.addEventListener(
      "loadeddata",
      function onLoad() {
        videoRef.current.currentTime = lastPlaybackPosition;

        if (wasPlaying) {
          videoRef.current.play();
        }

        setIsQualityChanging(false);
        videoRef.current.removeEventListener("loadeddata", onLoad);
      },
      { once: true }
    );
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseInt(e.target.value);
    setVolume(newVolume);
    setPrevVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  const handleBrightnessChange = (e) => {
    setBrightness(Number.parseInt(e.target.value));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      setVolume(prevVolume);
      videoRef.current.volume = prevVolume / 100;
    } else {
      setPrevVolume(volume);
      setVolume(0);
      videoRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleVoiceOverChange = (voiceOverId) => {
    setSelectedVoiceOver(
      voiceOverId === selectedVoiceOver ? null : voiceOverId
    );
    if (voiceOverRef.current) {
      voiceOverRef.current.src = voiceOvers[voiceOverId]?.url || "";
      voiceOverRef.current.currentTime = videoRef.current?.currentTime || 0;
      if (isPlaying) voiceOverRef.current.play();
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (videoRef.current) {
      while (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild);
      }

      const track = document.createElement("track");
      track.kind = "subtitles";
      track.src = languages[lang].subtitles;
      track.srclang = lang;
      track.label = languages[lang].name;
      track.default = true;

      videoRef.current.appendChild(track);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Add this function to handle time updates and trigger questions
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);

      // Check for quiz questions
      const nextQuestion = quizQuestions.find(
        (q) =>
          !q.answered &&
          Math.floor(videoRef.current.currentTime) === q.timestamp
      );

      if (nextQuestion && !currentQuestion) {
        videoRef.current.pause();
        setIsPlaying(false);
        setCurrentQuestion(nextQuestion);
      }

      if (
        voiceOverRef.current &&
        Math.abs(
          voiceOverRef.current.currentTime - videoRef.current.currentTime
        ) > 0.3
      ) {
        voiceOverRef.current.currentTime = videoRef.current.currentTime;
      }
    }
  };

  // Add these handlers for the quiz
  const handleQuizAnswer = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    if (currentQuestion.correctAnswer === selectedAnswer) {
      setShowReward(true);
      setEarnedRewards((prev) => prev + currentQuestion.reward);
      currentQuestion.answered = true;
    }
    setCurrentQuestion(null);
    setSelectedAnswer(null);
  };

  const handleCloseQuiz = () => {
    setCurrentQuestion(null);
    setShowReward(false);
    setSelectedAnswer(null);
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (selectedVoiceOver && voiceOverRef.current) {
            voiceOverRef.current.currentTime = videoRef.current.currentTime;
            voiceOverRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Error playing video after quiz:", error);
        });
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    if (voiceOverRef.current) {
      voiceOverRef.current.currentTime = pos * duration;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const createVideoPlayer = () => {
    return React.createElement(
      "div",
      {
        ref: containerRef,
        className:
          "relative aspect-video w-full rounded-xl overflow-hidden bg-black group",
      },
      React.createElement("video", {
        ref: videoRef,
        src: videoSources[selectedQuality].url,
        className: "w-full h-full",
        style: { filter: `brightness(${brightness}%)` },
        onTimeUpdate: handleTimeUpdate,
        onPlay: () => setIsPlaying(true),
        onPause: () => setIsPlaying(false),
        onEnded: () => setIsPlaying(false),
        onClick: togglePlay,
        crossOrigin: "anonymous",
      }),
      !isPlaying &&
        React.createElement(
          "div",
          {
            className:
              "absolute inset-0 flex items-center justify-center bg-black/50",
          },
          React.createElement(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                togglePlay();
              },
              className:
                "flex items-center gap-2 bg-gradient-to-br from-[#e31b53] to-[#ff7aa8] text-white px-6 py-3 rounded-full hover:opacity-90 transition",
            },
            React.createElement(Play, { className: "w-6 h-6" })
          )
        ),
      // Hide settings button in fullscreen on mobile devices
      !isFullscreen &&
        React.createElement(
          "button",
          {
            onClick: () => setIsSettingsOpen(!isSettingsOpen),
            className:
              "absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full sm:hidden",
          },
          React.createElement(Settings, { className: "w-6 h-6 text-white" })
        )
    );
  };

  const createControls = () => {
    return React.createElement(
      "div",
      {
        className: `bg-black rounded-xl p-4 mt-4 space-y-4 border border-[#e31b53]/30 ${
          isSettingsOpen ? "block" : "hidden sm:block"
        }`,
      },
      React.createElement(
        "div",
        { className: "w-full", onClick: handleProgressClick },
        React.createElement(
          "div",
          { className: "h-1 w-full bg-gray-600 cursor-pointer rounded-full" },
          React.createElement("div", {
            className:
              "h-full bg-[#e31b53] rounded-full transition-all duration-100",
            style: { width: `${(currentTime / duration) * 100}%` },
          })
        )
      ),
      React.createElement(
        "div",
        {
          className:
            "flex flex-col sm:flex-row items-center justify-between gap-4",
        },
        React.createElement(
          "div",
          {
            className:
              "flex items-center justify-between w-full sm:w-auto sm:justify-start gap-4",
          },
          React.createElement(
            "button",
            {
              onClick: togglePlay,
              className: "text-white hover:text-[#ff7aa8] transition-colors",
            },
            isPlaying
              ? React.createElement(Pause, { className: "w-6 h-6" })
              : React.createElement(Play, { className: "w-6 h-6" })
          ),
          React.createElement(
            "span",
            { className: "text-sm text-gray-300" },
            `${formatTime(currentTime)} / ${formatTime(duration)}`
          )
        ),
        React.createElement(
          "div",
          {
            className:
              "flex flex-wrap items-center justify-center sm:justify-end gap-4 w-full sm:w-auto",
          },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(
              "button",
              { onClick: toggleMute },
              isMuted
                ? React.createElement(VolumeX, {
                    className: "w-5 h-5 text-gray-300",
                  })
                : React.createElement(Volume2, {
                    className: "w-5 h-5 text-gray-300",
                  })
            ),
            React.createElement("input", {
              type: "range",
              min: "0",
              max: "100",
              value: volume,
              onChange: handleVolumeChange,
              className:
                "w-20 sm:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#e31b53]",
            })
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(Sun, { className: "w-5 h-5 text-gray-300" }),
            React.createElement("input", {
              type: "range",
              min: "50",
              max: "150",
              value: brightness,
              onChange: handleBrightnessChange,
              className:
                "w-20 sm:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#e31b53]",
            })
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(Languages, {
              className: "w-5 h-5 text-gray-300",
            }),
            React.createElement(
              "select",
              {
                value: selectedLanguage,
                onChange: (e) => handleLanguageChange(e.target.value),
                className:
                  "p-2 border rounded-md bg-gray-800 text-white text-sm",
              },
              Object.entries(languages).map(([key, value]) =>
                React.createElement(
                  "option",
                  { key: key, value: key },
                  value.name
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(Mic, { className: "w-5 h-5 text-gray-300" }),
            React.createElement(
              "select",
              {
                value: selectedVoiceOver || "",
                onChange: (e) => handleVoiceOverChange(e.target.value),
                className:
                  "p-2 border rounded-md bg-gray-800 text-white text-sm",
              },
              React.createElement("option", { value: "" }, "No Voice-over"),
              Object.entries(voiceOvers).map(([key, value]) =>
                React.createElement(
                  "option",
                  { key: key, value: key },
                  value.name
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(Settings, {
              className: "w-5 h-5 text-gray-300",
            }),
            React.createElement(
              "select",
              {
                value: selectedQuality,
                onChange: (e) => handleQualityChange(e.target.value),
                disabled: isQualityChanging,
                className: `p-2 border rounded-md bg-gray-800 text-white text-sm ${
                  isQualityChanging ? "opacity-50 cursor-not-allowed" : ""
                }`,
              },
              Object.entries(videoSources).map(([key, value]) =>
                React.createElement(
                  "option",
                  { key: key, value: key },
                  value.label
                )
              )
            )
          ),
          React.createElement(
            "button",
            {
              onClick: toggleFullscreen,
              className: "text-gray-300 hover:text-[#ff7aa8] transition-colors",
            },
            React.createElement(Maximize, { className: "w-6 h-6" })
          )
        )
      )
    );
  };

  const createMovieDetails = () => {
    return React.createElement(
      "div",
      { className: "mt-8" },
      React.createElement(
        "div",
        { className: "md:col-span-2" },
        React.createElement(
          "div",
          {
            className:
              "bg-black rounded-xl p-6 border border-[#e31b53]/30 space-y-6",
          },
          React.createElement(
            "h1",
            { className: "text-2xl md:text-3xl font-bold text-[#e31b53]" },
            "Frozen 2"
          ),
          React.createElement(
            "div",
            { className: "grid sm:grid-cols-2 gap-4" },
            React.createElement(
              "div",
              { className: "space-y-2" },
              React.createElement(
                "div",
                { className: "flex items-center gap-2 text-gray-300" },
                React.createElement(Clock, { className: "w-5 h-5" }),
                React.createElement("span", null, "2h 15m")
              ),
              React.createElement(
                "div",
                { className: "flex items-center gap-2 text-gray-300" },
                React.createElement(Languages, { className: "w-5 h-5" }),
                React.createElement(
                  "span",
                  null,
                  Object.keys(languages)
                    .map((lang) => languages[lang].name)
                    .join(", ")
                )
              )
            ),
            React.createElement(
              "div",
              { className: "space-y-2" },
              React.createElement(
                "div",
                { className: "flex items-center gap-2 text-gray-300" },
                React.createElement(Info, { className: "w-5 h-5" }),
                React.createElement("span", null, "Fantasy, Animation")
              ),
              React.createElement(
                "div",
                { className: "flex items-center gap-2 text-gray-300" },
                React.createElement(Star, { className: "w-5 h-5" }),
                React.createElement("span", null, "Release Date: 2024")
              )
            )
          ),
          React.createElement(
            "div",
            { className: "text-gray-400" },
            React.createElement(
              "p",
              null,
              "A thrilling fantasy adventure that delves into the depths of magic and destiny. When Elsa discovers a mysterious voice calling her, she must embark on a perilous journey to uncover the truth about her powers while facing profound challenges and emotional revelations."
            )
          ),
          React.createElement(
            "div",
            { className: "flex flex-wrap gap-2" },
            ["Animation", "Fantasy", "Adventure"].map((genre) =>
              React.createElement(
                "span",
                {
                  key: genre,
                  className:
                    "bg-[#e31b53]/20 text-[#ff7aa8] px-3 py-1 rounded-full text-sm",
                },
                genre
              )
            )
          )
        )
      )
    );
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-white text-[#e31b53]" },
    React.createElement(Navbar, null),
    React.createElement(
      "div",
      { className: "max-w-7xl mx-auto px-4 py-4" },
      React.createElement(
        "button",
        {
          onClick: () => window.history.back(),
          className:
            "inline-flex items-center gap-2 text-[#e31b53] hover:text-[#ff7aa8] transition-colors mb-4",
        },
        React.createElement(ArrowLeft, { className: "w-5 h-5" }),
        React.createElement(
          "span",
          { className: "hidden sm:inline" },
          "Back to Home"
        )
      ),
      createVideoPlayer(),
      createControls(),
      createMovieDetails(),
      React.createElement("audio", { ref: voiceOverRef, className: "hidden" }),
      // Add the quiz modal
      (currentQuestion || showReward) &&
        createQuizModal({
          question: currentQuestion,
          onAnswer: handleQuizAnswer,
          onSubmit: handleSubmitAnswer,
          onClose: handleCloseQuiz,
          showReward,
          rewardAmount: currentQuestion?.reward || 0,
          selectedAnswer: selectedAnswer,
        })
    )
  );
};

export default MovieDisplay;
