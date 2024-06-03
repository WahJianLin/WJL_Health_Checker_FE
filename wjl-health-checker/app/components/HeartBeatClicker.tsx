"use client";
import React from "react";

function HeartBeatClicker(props: Props) {
  return (
    <div
      className="h-3/4 bg-base-300 rounded-b-lg flex items-center justify-center select-none cursor-pointer"
      onClick={
        props.trackMode ? props.increaseBeatCount : props.triggerTracking
      }
    >
      {props.trackMode
        ? "Click here to track heart beat"
        : "Click here to start tracking"}
    </div>
  );
}

interface Props {
  readonly trackMode: boolean;
  triggerTracking(): void;
  increaseBeatCount(): void;
}

export default HeartBeatClicker;
