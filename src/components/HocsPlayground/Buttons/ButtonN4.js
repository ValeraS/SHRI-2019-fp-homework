/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from "react";
import { compose, withState, withHandlers } from "recompose";
import BaseButton from "./BaseButton";
import withDefaultColor from "../hocs/withDefaultColor";
import withSmallSize from "../hocs/withSmallSize";

const withCounter = BaseComponent => {
  return ({ counter, ...props }) => {
    return (
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {counter}
        <BaseComponent {...props} />
      </div>
    );
  };
};

export default compose(
  withSmallSize,
  withDefaultColor,
  withState("counter", "setCounter", 5),
  withHandlers({
    onClick: ({ setCounter, setInnerColor, setOuterColor }) => () =>
      setCounter(c => {
        if (c === 1) {
          setInnerColor("orange");
          setOuterColor("orange");
          return 5;
        }
        return c - 1;
      })
  }),
  withCounter
)(BaseButton);
