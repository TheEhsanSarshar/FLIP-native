import * as React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  Text,
  findNodeHandle,
} from "react-native";
export function Box({ parentRef, number }) {
  const [toggle, setToggle] = React.useState(false);
  const ref = React.useRef();
  const animDeltaX = React.useRef(new Animated.Value(0));
  const animDeltaY = React.useRef(new Animated.Value(0));
  const animScaleX = React.useRef(new Animated.Value(1));
  const animScaleY = React.useRef(new Animated.Value(1));
  const opacity = React.useRef(new Animated.Value(0));
  const [measure, setMeasure] = React.useState({});
  const [_, forceUpdate] = React.useState();

  const initialPositionRef = React.useRef();

  React.useLayoutEffect(() => {
    opacity.current.setValue(0);
  });

  const isFirstTime2 = React.useRef(true);
  // React.useEffect(() => {
  //   return;
  //   if (isFirstTime2.current) {
  //     isFirstTime2.current = false;
  //     return;
  //   }
  //   // Animated.timing(opacity.current, {
  //   //   toValue: 1,
  //   //   duration: 10,
  //   //   useNativeDriver: true
  //   // }).start()
  //   if (ref.current && parentRef) {
  //     console.log("measuring...");
  //     ref.current.measureLayout(
  //       parentRef,
  //       (x, y, width, height, pageX, pageY) => {
  //         console.log({ x, y, width, height, pageX, pageY });
  //         // alert(`pageX is ${pageX}, x: is ${x}`)
  //         flipAnim({ x, y, width, height });
  //       },
  //       () => console.log("fail")
  //     );
  //   }
  // });

  const flipAnim = (dim) => {
    // alert('dim is '+ JSON.stringify(dim));
    // change the origin from top left to center
    const newBox = {
      x: dim.x + dim.width / 2,
      y: dim.y + dim.height / 2,

      width: dim.width,
      height: dim.height,
    };
    // alert('newBox is ' + JSON.stringify(newBox))

    console.log({ number, newBox, intial: initialPositionRef.current });

    if (isElementRectChanged(initialPositionRef.current, newBox)) {
      opacity.current.setValue(0);
      const deltaX = initialPositionRef.current.x - newBox.x;
      const deltaY = initialPositionRef.current.y - newBox.y;
      console.log(deltaX, deltaY);

      const scaleX = initialPositionRef.current.width / newBox.width;
      const scaleY = initialPositionRef.current.height / newBox.height;

      // alert(deltaX)
      animDeltaX.current.setValue(deltaX);
      opacity.current.setValue(1);

      Animated.timing(animDeltaX.current, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // animDeltaY.current.setValue(deltaY);
      // animScaleX.current.setValue(scaleX);
      // animScaleX.current.setValue(scaleY);
      // requestAnimationFrame(() => {

      // })
      // Animated.timing(scaleY.current, {
      //   toValue: 1,
      //   duration: 500,
      // }).start();
      // Animated.timing(scaleX.current, {
      //   toValue: 1,
      //   duration: 500,
      // }).start();
    }
    opacity.current.setValue(1);
    initialPositionRef.current = newBox;
  };

  // React.useEffect(() => {
  //   requestAnimationFrame(() => {
  //     Animated.timing(animDeltaX.current, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: true
  //     }).start();
  //   })
  // })

  const animatedStyles = React.useMemo(
    () => ({
      transform: [
        {
          translateX: animDeltaX.current,
        },
        {
          translateY: animDeltaY.current,
        },
        {
          scaleX: animScaleX.current,
        },
        {
          scaleY: animScaleY.current,
        },
      ],
      opacity: opacity.current,
    }),
    []
  );

  return (
    <Animated.View
      onLayout={(e) => {
        opacity.current.setValue(0);
        flipAnim(e.nativeEvent.layout);
      }}
      ref={ref}
      style={[styles.littleBox, animatedStyles]}
    />
  );
}

const styles = StyleSheet.create({
  littleBox: {
    width: 50,
    height: 50,
    backgroundColor: "pink",
    borderColor: "black",
    borderWidth: 2,
  },
});

function isElementRectChanged(initialPosition, finalPosition) {
  if (!initialPosition || !finalPosition) return false;

  // alert(`initialPosition.x: ${initialPosition.x}, finalPosition.x: ${finalPosition.x}`)
  const xMoved = initialPosition.x !== finalPosition.x;
  const yMoved = initialPosition.y !== finalPosition.y;
  // const xScaled = initialPosition.width !== finalPosition.width;
  // const yScaled = initialPosition.height !== finalPosition.height;

  return xMoved || yMoved;
  // return xMoved || yMoved || xScaled || yScaled;
}
