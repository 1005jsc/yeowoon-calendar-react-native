import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TextInputTest from './src/screens/TextView';

import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import store from './src/store';
import Calendar2 from './src/components/Calendar/Calendar2';
import Calendar1 from './src/components/Calendar/Calendar1';

export default function App() {
  console.log('app');
  return (
    <Provider store={store}>
      <Container>
        <StatusBar style='auto' />
        {/* <TextInputTest></TextInputTest> */}
        {/* <CuratorIcon isOutLine={true} /> */}
        <Calendar1 />
        {/* <Calendar2 /> */}
      </Container>
    </Provider>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 60px;
`;
