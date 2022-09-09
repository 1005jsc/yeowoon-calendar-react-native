import React from 'react';
import {Text} from 'react-native';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import {DefaultTheme} from 'styled-components';
import styled from 'styled-components/native';

type ChipProps = {
  text?: string;
  theme?: DefaultTheme[keyof DefaultTheme];
  style?: boolean;
};

const Chip = ({text, theme, style}: ChipProps) => {
  return (
    <Container themeyo={theme} style={style}>
      <Text>
        <ChipText themeyo={theme} style={style}>
          {text}
        </ChipText>
      </Text>
    </Container>
  );
};
export default Chip;

type ChipContainerProps = {
  themeyo: string;
  style: boolean;
};

const Container = styled.View<ChipContainerProps>`
  /* width: 61px; */
  background-color: ${props => {
    return props.style ? props.theme[props.themeyo] : props.theme.White;
  }};
  height: 37px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  border: 2px solid
    ${props => {
      return props.style ? props.theme.White : props.theme[props.themeyo];
    }};
`;
type ChipTextProps = {
  style: boolean;
  themeyo: string;
};

const ChipText = styled.Text<ChipTextProps>`
  color: ${props => {
    console.log(props.theme[props.themeyo]);
    console.log(props.style);
    return props.style ? props.theme.White : props.theme[props.themeyo];
  }};
  /* color: #f5e960; */
  line-height: 18px;
  font-size: 16px;
  font-weight: 700;
`;
