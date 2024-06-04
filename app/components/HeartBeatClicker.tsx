"use client";
import React from "react";
import { STATUS } from "./helper/constants";

function HeartBeatClicker(props: Props) {
  return (
    <div
      className="h-2/3 bg-base-300 rounded-b-lg flex items-center justify-center select-none cursor-pointer"
      onClick={
        props.status === STATUS.TRACKING
          ? props.increaseBeatCount
          : props.triggerTracking
      }
    >
      {props.content}
    </div>
  );
}

interface Props {
  readonly status: STATUS;
  readonly content: string;
  triggerTracking(): void;
  increaseBeatCount(): void;
}

export default HeartBeatClicker;
