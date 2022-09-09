import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TextInputTest from './src/screens/TextView';

import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import store from './src/store';
import Calendar from './src/components/Calendar/Calendar';

export default function App() {
  console.log('app');
  return (
    <Provider store={store}>
      <Container>
        <StatusBar style='auto' />
        {/* <TextInputTest></TextInputTest> */}
        {/* <CuratorIcon isOutLine={true} /> */}
        <Calendar />
      </Container>
    </Provider>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 60px;
`;
