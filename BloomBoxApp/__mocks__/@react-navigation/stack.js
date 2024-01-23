// __mocks__/@react-navigation/stack.js
import React from 'react';

const MockedStackNavigator = ({ children } = {}) => <>{children}</>;
MockedStackNavigator.Navigator = ({ children } = {}) => <>{children}</>;
MockedStackNavigator.Screen = () => null;

export { MockedStackNavigator as createStackNavigator };