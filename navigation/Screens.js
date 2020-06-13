import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

// screens

import Form1099 from '../screens/1099';
import W2 from '../screens/W2';
import Onboarding from '../screens/Onboarding';
import view1040list from '../screens/view1040list';
import view1040 from '../screens/view1040';

import view1099list from '../screens/view1099list';
import view1099 from '../screens/view1099';

import viewW2list from '../screens/viewW2list';
import viewW2 from '../screens/viewW2';

// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';

// header for screens
import Header from '../components/Header';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const OnbaordingStack = createStackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Onboarding" navigation={navigation} />
      })
    },
    W2: {
      screen: W2,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="W2 Form" navigation={navigation} />
      })
    },
    Form1099: {
      screen: Form1099,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="1099 Form" navigation={navigation} />
      })
    },
    view1040list: {
      screen: view1040list,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="1040 Form View List" navigation={navigation} />
      })
    },
    view1040: {
      screen: view1040,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="1040 Form View" navigation={navigation} />
      })
    },
    view1099list: {
      screen: view1099list,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="1099 Form View List" navigation={navigation} />
      })
    },
    view1099: {
      screen: view1099,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="1099 Form View" navigation={navigation} />
      })
    },
    viewW2list: {
      screen: viewW2list,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="W2 Form View List" navigation={navigation} />
      })
    },
    viewW2: {
      screen: viewW2,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="W2 Form View" navigation={navigation} />
      })
    },
    
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const AppStack = createDrawerNavigator(
  {
    OnbaordingStack: {
      screen: OnbaordingStack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },

   
    
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
