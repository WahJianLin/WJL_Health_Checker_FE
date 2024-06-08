"use client";
import React, { useEffect, useState } from "react";
import HeartBeatClicker from "./HeartBeatClicker";
import { STATUS } from "./helper/constants";

function HeartBeatTracker() {
  const [state, setState] = useState<State>({
    timer: 0,
    beatCount: 0,
    status: STATUS.READY
  });

  const canClick: boolean = state.status === STATUS.READY || state.status === STATUS.TRACKING;

  const heartRateBlurb = (): String => {
    switch (true) {
      case state.beatCount <= 41:
        return "Your heart rate is amazing! You're absolute monster or just didn't click the button properly.";
      case state.beatCount <= 61:
        return "Your heart rate is pretty good. You're getting closer to peak human performance. Nice Job.";
      case state.beatCount <= 81:
        return "Your heart rate is decent. Being a standard human is good enought. Keep up the good work.";
      case state.beatCount <= 101:
        return "Your heart rate is acceptable, but could use some work. Go on some more walks or jogs you basic human. ";
      default:
        return "Your heart needs your help. Please eat better and exercise regularly. Your body can use it you below average human.";
    }
  };

  const instructionBlurb: String =
    "Place your fingers on your neck to feel your heart beat. Tap the below to the rate of your heart beat. Once the timer completes, your heart rate will be calculated.";
  const resultsBlurb: String = `Your heart rate is ${
    state.beatCount
  } beats per minute. ${heartRateBlurb()}`;

  useEffect(() => {
    if (state.status === STATUS.START_COUNTDOWN) {
      const decrementTimer = () => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1 > 0 ? prevState.timer - 1 : 5,
          status: prevState.timer - 1 > 0 ? prevState.status : STATUS.TRACKING,
        }));
      };
      const timerId = setInterval(decrementTimer, 1000);
      return () => clearInterval(timerId);
    } else if (state.status === STATUS.TRACKING) {
      const decrementTimer = () => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
          status: prevState.timer - 1 > 0 ? prevState.status : STATUS.RESETTING,
          beatCount: prevState.timer - 1 > 0 ? prevState.beatCount : prevState.beatCount * 2 
        }));
      };

      const timerId = setInterval(decrementTimer, 1000);
      return () => clearInterval(timerId);
    } else if ( state.status === STATUS.RESETTING ) {
      const decrementTimer = () => {
        setState((prevState) => ({
          ...prevState,
          status: STATUS.READY,
        }));
      };

      const timerId = setInterval(decrementTimer, 1500);
      return () => clearInterval(timerId);
    }
    
  }, [state.status]);

  const incrementBeatCount: () => void = () => {
    setState((prevState) => ({
      ...prevState,
      beatCount: prevState.beatCount + 1,
    }));
  };

  const triggerTracking: () => void = () => {
    if (state.status === STATUS.READY) {
      setState((prevState) => ({
        ...prevState,
        status: STATUS.START_COUNTDOWN,
        timer: 3,
        beatCount: 0
      }));
    }
  };

  const trackingDetails = (): JSX.Element => {
    return (
      <div>
        <div className="flex w-full">
          <div className="grid h-20 w-1/2 place-items-center text-lg">
            Timer: {state.timer}
          </div>
          <div className="divider divider-horizontal" />
          <div className="grid h-20 w-1/2 place-items-center text-lg">
            Beats: {state.beatCount}
          </div>
        </div>
      </div>
    );
  };

  const instructionDetails = (): JSX.Element => {
    return <div>{state.beatCount > 1 ? resultsBlurb : instructionBlurb}</div>;
  };

  const getContentString = (): string => {
    if (state.status === STATUS.READY){
      return "Click here to start tracking";
    } else if (state.status === STATUS.START_COUNTDOWN) {
      return `${state.timer}`;
    } else if (state.status === STATUS.TRACKING) {
      return "Click here to track heart beat";
    } else 
    return "";
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card h-2/5 w-2/5 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Heart Beat Tracker</h2>
          {state.status === STATUS.TRACKING ? trackingDetails() : instructionDetails()}
        </div>
        <HeartBeatClicker
          canClick={canClick}
          status={state.status}
          triggerTracking={triggerTracking}
          increaseBeatCount={incrementBeatCount}
          content={getContentString()}
        />
      </div>
    </div>
  );
}

interface State {
  readonly status: STATUS;
  readonly beatCount: number;
  readonly timer: number;
}

export default HeartBeatTracker;
