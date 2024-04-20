import React, { useState, useCallback, memo, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GestureHandlerRootView, PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, useAnimatedGestureHandler, useAnimatedStyle, runOnJS } from 'react-native-reanimated';


interface MicrophoneButtonProps {
  containerStyle?: object;
  disabled?: boolean;
  handleButtonPressed: () => void;
  handleButtonReleased: () => void;
  handleButtonSwipeUp: () => void;
  isInListeningMode: boolean;
  tooltipText: React.ReactNode;
}

const MicrophoneButton = React.memo(
  ({
    containerStyle,
    disabled,
    handleButtonPressed,
    handleButtonReleased,
    handleButtonSwipeUp,
    isInListeningMode,
    tooltipText,
  }: MicrophoneButtonProps) => {
    const micPosition = useSharedValue(0);
    const isSwipedUp = useSharedValue(false);
    const [isPlayingGif, setIsPlayingGif] = useState(false);

    useEffect(() => {
      if (isInListeningMode) {
        setIsPlayingGif(true);
      } else {
        setIsPlayingGif(false)
      }
    }, [isInListeningMode, setIsPlayingGif]);

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_: any, ctx: any) => {
        'worklet';
        isSwipedUp.value = false;
        ctx.startY = micPosition.value;
      },
      onActive: (event: any, ctx: any) => {
        'worklet';
        let newPosition = ctx.startY + event.translationY;

        // Limit the swiping distance
        if (newPosition < -(80 + 10)) {
          newPosition = -(80 + 10);
        }

        micPosition.value = newPosition;

        if (micPosition.value <= -80 && !isSwipedUp.value) {
          isSwipedUp.value = true;
        }
      },
      onFinish: (_event: any, _context: any, _isCanceledOrFailed: any) => {
        'worklet';
        if (isSwipedUp.value) {
          runOnJS(handleButtonSwipeUp)();
        } else {
          runOnJS(handleButtonReleased)();
        }
        isSwipedUp.value = false;
        micPosition.value = withSpring(0);
      },
    });

    const animatedStyles = useAnimatedStyle(() => {
      'worklet';
      return {
        transform: [{ translateY: micPosition.value }],
      };
    });

    return (
      <GestureHandlerRootView style={{ ...containerStyle }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[animatedStyles, disabled && styles.disabledMicContainer]}>
            <TouchableOpacity activeOpacity={1} onPressIn={handleButtonPressed} disabled={disabled}>
              {
                isPlayingGif ? (
                  <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                  <Image style={{ height: hp(8), width: wp(18), }} source={require('../../../assets/recordingStart.gif')} />
                  </View>
                ) : (
                  <Image style={{ height: hp(8), width: wp(18), borderRadius: 100 }} source={require('../../../assets/recordingIcon.png')} />
                )
              }
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
        {tooltipText}
      </GestureHandlerRootView>
    );
  },
);

const styles = StyleSheet.create({
  disabledMicContainer: {
    opacity: 0.5,
  }
});

export default memo(MicrophoneButton);

