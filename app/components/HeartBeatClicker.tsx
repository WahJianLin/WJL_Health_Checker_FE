"use client";
import React from "react";
import { STATUS } from "./helper/constants";

function HeartBeatClicker(props: Props) {
  return (
    <div
      className={`${
        props.canClick ? "bg-base-300" : "bg-gray-300"
      } h-2/3 rounded-b-lg flex items-center justify-center select-none cursor-pointer`}
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
  readonly canClick: boolean;
  readonly status: STATUS;
  readonly content: string;
  triggerTracking(): void;
  increaseBeatCount(): void;
}

export default HeartBeatClicker;
