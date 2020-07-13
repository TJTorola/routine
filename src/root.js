import * as eva from '@eva-design/eva';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  IconRegistry
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';

import Calendar from './calendar';
import Routine from './routine';
import Today from './today';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='CALENDAR'/>
    <BottomNavigationTab title='TODAY'/>
    <BottomNavigationTab title='ROUTINE'/>
  </BottomNavigation>
);

// TODO: Move the routine loading/persistance up to this level and see if there
// is a way to hold off on removing splash screen until it is loaded.

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)
      }}>
        <NavigationContainer>
          <Navigator
            headerMode='none'
            initialRouteName="Today"
            tabBar={props => <BottomTabBar {...props} />}
          >
            <Screen name='Calendar' component={Calendar}/>
            <Screen name='Today' component={Today}/>
            <Screen name='Routine' component={Routine}/>
          </Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ApplicationProvider>
  </>
);
