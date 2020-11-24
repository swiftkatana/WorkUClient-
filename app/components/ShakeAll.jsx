import React from "react";
import { Animated } from "react-native";

const ShakeAll = (props) => {
  let shakeAnimation = new Animated.Value(0);

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      props.afterShake();
    }, props.delay || 300);
  };
  if (props.shake) startShake();
  return (
    <Animated.View
      style={{
        ...{
          transform: [
            { translateY: shakeAnimation },
            { translateX: shakeAnimation },
          ],
        },
        ...props.style,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default ShakeAll;
