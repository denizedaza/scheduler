import React, { useState } from "react";

function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
     //if replace is true, push history to replace current mode; otherwise, move to last mode 
     const newHistory = [...history];
     replace ? newHistory[newHistory.length - 1] = newMode : newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newMode)
  }

  const back = () => {
    if (history.length <= 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

   return { mode, transition, back }
}

export default useVisualMode;