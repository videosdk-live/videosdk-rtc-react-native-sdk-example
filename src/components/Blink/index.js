import React, { Component } from "react";
import { Animated, View } from "react-native";

export default class Blink extends Component {
  constructor(props) {
    super(props);
    this.fadeAnimation = new Animated.Value(1);
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.fadeAnimation, {
          toValue: 0.5,
          duration: this.props.duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: this.props.duration,
          useNativeDriver: true,
        }),
      ])
    );
  }

  start() {
    this.animation.start();
  }

  stop() {
    this.animation.stop();
    this.animation.reset();
  }

  render() {
    return (
      <View style={{ ...this.props.style }}>
        <Animated.View style={{ opacity: this.fadeAnimation }}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}
