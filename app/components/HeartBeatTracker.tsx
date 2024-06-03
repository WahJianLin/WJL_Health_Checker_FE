"use client";
import React, { useEffect, useState } from "react";
import HeartBeatClicker from "./HeartBeatClicker";

function HeartBeatTracker() {
  const [state, setState] = useState<State>({
    timer: 0,
    beatCount: 0,
    trackMode: false,
    canClick: true,
  });

  const heartRateBlurb = (): String => {
    switch (true) {
      case state.beatCount <= 41:
        return "Your heart rate is amazing! You're absolute monster or just didn't click the button properly.";
      case state.beatCount <= 61:
        return "Your heart rate is pretty good. You're getting closer to peak human performance. Nice Job.";
      case state.beatCount <= 81:
        return "Your heart rate is decent. Being a standard human is good enought. Keep up the good work.";
      case state.beatCount <= 101:
        return "Your heart rate is acceptable, but could use some work. Go on some more walks or jobs you basic human. ";
      default:
        return "Your heart needs your help. Please eat better and exercise regularly. Your body can use it you below average human.";
    }
  };

  const instructionBlurb: String =
    "Place your fingers on your neck to feel your heart beat. Tap the below to the rate of your heart beat. Once the timer completes, your heart rate will be calculated.";
  const resultsBlurb: String = `Your heart rate is ${
    state.beatCount * 2
  } beats per minute. ${heartRateBlurb()}`;

  useEffect(() => {
    if (state.trackMode) {
      const decrementTimer = () => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
          trackMode: prevState.timer - 1 > 0,
          canClick: prevState.timer - 1 > 0,
        }));
      };

      const timerId = setInterval(decrementTimer, 1000);
      return () => clearInterval(timerId);
    }
    if (!state.canClick) {
      const decrementTimer = () => {
        setState((prevState) => ({
          ...prevState,
          canClick: true,
        }));
      };

      const timerId = setInterval(decrementTimer, 1500);
      return () => clearInterval(timerId);
    }
  }, [state.trackMode]);

  const incrementBeatCount: () => void = () => {
    setState((prevState) => ({
      ...prevState,
      beatCount: prevState.beatCount + 1,
    }));
  };

  const triggerTracking: () => void = () => {
    if (state.canClick) {
      setState((prevState) => ({
        ...prevState,
        trackMode: true,
        timer: 30,
        beatCount: 1,
      }));
    }
  };

  const trackingDetails = (): JSX.Element => {
    return (
      <div>
        <div className="flex w-full">
          <div className="grid h-20 flex-grow place-items-center">
            Timer: {state.timer}
          </div>
          <div className="divider divider-horizontal" />
          <div className="grid h-20 flex-grow place-items-center">
            Beats: {state.beatCount}
          </div>
        </div>
      </div>
    );
  };

  const instructionDetails = (): JSX.Element => {
    return <div>{state.beatCount > 1 ? resultsBlurb : instructionBlurb}</div>;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card h-1/4 w-1/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Heat Beat Tracker</h2>
          {state.trackMode ? trackingDetails() : instructionDetails()}
        </div>

        <HeartBeatClicker
          trackMode={state.trackMode}
          triggerTracking={triggerTracking}
          increaseBeatCount={incrementBeatCount}
        />
      </div>
    </div>
  );
}

interface State {
  readonly canClick: boolean;
  readonly trackMode: boolean;
  readonly beatCount: number;
  readonly timer: number;
}

export default HeartBeatTracker;
