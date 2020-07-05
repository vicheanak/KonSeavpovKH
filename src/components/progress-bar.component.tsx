import React from 'react';
import { View, ViewProps, Animated, Easing, Dimensions } from 'react-native';
import { Text, ThemedComponentProps, withStyles } from '@ui-kitten/components';
import * as Progress from 'react-native-progress';

export interface ProgressBarProps extends ViewProps, ThemedComponentProps {
  progress: number;
  text?: any;
}

const ProgressBarComponent = ({ progress, text, ...props }: ProgressBarProps): React.ReactElement<ViewProps> => {
  return (
    <View style={props.themedStyle.container}>
         <View style={[props.themedStyle.talkBubble, {left: `${progress}%`}]}>
          <Text style={[props.themedStyle.text]}>{text}</Text>
          <View style={props.themedStyle.talkBubbleSquare} />
        </View>   
      <View
        {...props}
        style={[props.themedStyle.progressContainer, props.style]}>
        <View style={[props.themedStyle.progress, { width: `${progress}%` }]}/>
      </View>
    </View>
  )
};

export const ProgressBar = withStyles(ProgressBarComponent, (theme) => ({
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    paddingRight: 10,
  },
  talkBubbleSquare: {
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
    borderRadius: 50,
    position: 'relative',
    left: -30
  },
  text: {
    zIndex: 99,
    position: 'relative',
    top: 20,
    left: -24,
    color: 'black',
    fontSize: 15,
    // height: 30,
    // left: -23
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // height: 30,
    borderWidth: 2
  },
  progressContainer: {
    // height: 6,
    height: 10,
    borderRadius: 3,
    backgroundColor: theme['background-basic-color-2'],
    overflow: 'hidden',
  },
  progress: {
    flex: 1,
    backgroundColor: theme['color-primary-default'],
  },
}));

