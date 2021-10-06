import React, { useState } from "react";

function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setHistory((prev) => {
      const newHistory = [...prev];
      replace ? (newHistory[newHistory.length - 1] = newMode) : newHistory.push(newMode);
      return newHistory;
    });
  };

  const back = () => {
    if (history.length <= 1) {
      return;
    }
    setHistory((prev) => prev.slice(0, -1));
  };

  return { mode: history[history.length - 1], transition, back };
}

export default useVisualMode;
