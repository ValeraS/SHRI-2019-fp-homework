/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from "react";
import { compose, withHandlers, withState } from "recompose";
import BaseButton from "./BaseButton";
import withLargeSize from "../hocs/withLargeSize";
import withPrimaryColor from "../hocs/withPrimaryColor";

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "black",
  "pink",
  "gray",
  "yellow"
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const withRotate = BaseComponent => ({ deg, ...props }) => (
  <div
    style={{
      transform: `rotate(${deg}deg)`,
      transformOrigin: "center",
      display: "inline-block"
    }}
  >
    <BaseComponent {...props} />
  </div>
);

export default compose(
  withLargeSize,
  withPrimaryColor,
  withState("deg", "setDeg", 0),
  withHandlers({
    onClick: ({ setDeg, setInnerColor, setOuterColor }) => () =>
      setDeg(d => {
        const newDeg = (d + 30) % 360;
        if (newDeg === 0) {
          setInnerColor(getRandomColor());
          setOuterColor(getRandomColor());
        }
        return newDeg;
      })
  }),
  withRotate
)(BaseButton);
