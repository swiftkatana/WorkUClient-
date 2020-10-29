import React from "react";
import { Animated } from "react-native";

const ShakeAll = (props) => {
  let shakeAnimation = new Animated.Value(0);

  const startShake = () => {
    console.log("shake");
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
      //props.afterShake start after delay of props.delay||300ms(default)  props. Shake
      props.afterShake();
    }, props.delay || 300);
  };
  // props.shake need to pass as true if you want its to shake
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
