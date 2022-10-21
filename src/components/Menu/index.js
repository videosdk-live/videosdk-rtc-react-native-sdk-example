import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import styles from "./styles";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };

    // this.createPanResponder(props);
  }

  setModalVisible(visible) {
    const { closeFunction, height } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });
        if (typeof closeFunction === "function") closeFunction();
      });
    }
  }

  createPanResponder(props) {
    const { height } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], {
            useNativeDriver: false,
          })(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const gestureLimitArea = height / 3;
        const gestureDistance = gestureState.dy;
        if (gestureDistance > gestureLimitArea) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      children,
      menuBackgroundColor,
      onRequestClose,
      onClose = () => this.close(),
      radius,
      placement,
      left,
      right,
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <Modal transparent visible={modalVisible} onRequestClose={onRequestClose}>
        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={[
            styles.wrapper,
            {
              position: "absolute",
              bottom: 80,
            },
            placement == "left"
              ? {
                  left: left ? left : 20,
                }
              : {
                  right: right ? right : 20,
                },
          ]}
        >
          <Animated.View
            style={[
              panStyle,
              styles.container,
              {
                height: "100%",
                width: "100%",
                borderRadius: radius || 10,
                backgroundColor: menuBackgroundColor || "#F3F3F3",
              },
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default Menu;
