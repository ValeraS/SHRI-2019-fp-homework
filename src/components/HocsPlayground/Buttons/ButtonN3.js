/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from "react";
import * as R from "ramda";
import { compose, withState, withHandlers } from "recompose";
import BaseButton from "./BaseButton";
import withSmallSize from "../hocs/withSmallSize";
import withDefaultColor from "../hocs/withDefaultColor";

const withCounter = BaseComponent => {
  return ({ counter, children, ...props }) => {
    return React.createElement(BaseComponent, props, [`${counter} `, children]);
  };
};

const isEven = x => x % 2 === 0;

export default compose(
  withSmallSize,
  withDefaultColor,
  withState("counter", "setCounter", 0),
  withHandlers({
    onClick: ({ setCounter, setInnerColor, setOuterColor }) => () => {
      const setColor = color => () => {
        setInnerColor(color);
        setOuterColor(color);
      };
      setCounter(c => {
        R.ifElse(isEven, setColor("black"), setColor("green"))(c + 1);
        return c + 1;
      });
    }
  }),
  withCounter
)(BaseButton);
