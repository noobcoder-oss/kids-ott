import React, { useCallback, useState, useRef, useEffect } from "react";

const Carousel = ({ items, renderItem }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const [clickStartTime, setClickStartTime] = useState(0);
  const [clickStartX, setClickStartX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  const itemsToShow =
    windowWidth < 640 ? 2 : windowWidth < 1024 ? 3 : windowWidth < 1536 ? 4 : 6;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setScrollLeft(containerRef.current.scrollLeft);
    setClickStartTime(Date.now());
    setClickStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;

    const clickDuration = Date.now() - clickStartTime;
    const moveDistance = Math.abs(e.clientX - clickStartX);

    if (clickDuration < 200 && moveDistance < 5 && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const clickX =
        e.clientX - containerRef.current.getBoundingClientRect().left;
      const itemWidth = containerWidth / itemsToShow;
      const currentScroll = containerRef.current.scrollLeft;

      if (clickX < containerWidth / 2) {
        containerRef.current.scrollTo({
          left: Math.max(0, currentScroll - itemWidth),
          behavior: "smooth",
        });
      } else {
        containerRef.current.scrollTo({
          left: currentScroll + itemWidth,
          behavior: "smooth",
        });
      }
    }

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setStartX(e.touches[0].clientX - rect.left);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const scrollAmount = e.deltaY || e.deltaX;
    containerRef.current.scrollLeft += scrollAmount;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  // Create style element for no-scrollbar styles
  const styleElement = React.createElement(
    "style",
    { jsx: "global" },
    `.no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }`
  );

  // Create item elements
  const itemElements = items.map((item, idx) =>
    React.createElement(
      "div",
      {
        key: idx,
        className: "flex-none w-1/2 sm:w-1/3 lg:w-1/4 2xl:w-1/6 px-1",
      },
      renderItem(item)
    )
  );

  // Create flex container
  const flexContainer = React.createElement(
    "div",
    { className: "flex" },
    itemElements
  );

  // Create scrollable container
  const scrollableContainer = React.createElement(
    "div",
    {
      className: "overflow-x-auto overflow-y-hidden no-scrollbar select-none",
      ref: containerRef,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      style: {
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        cursor: isDragging ? "grabbing" : "grab",
      },
    },
    [styleElement, flexContainer]
  );

  // Create outer container
  return React.createElement(
    "div",
    { className: "relative w-full" },
    scrollableContainer
  );
};

export default Carousel;
