import React from 'react';
// import Svg from 'react-native-svg';
// import Svg, { Mask, Rect } from 'react-native-svg';
import { Svg, Mask, Rect } from 'react-native-svg';

interface Prop {
  isOutLine: boolean;
}

const CuratorIcon = ({ isOutLine }: Prop) => {
  return isOutLine ? (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' strokeWidth={2}>
      <Mask id='path-1-inside-1_1345_25469' fill='white'>
        <Rect x='3' y='4' width='10.5882' height='10.5882' rx='0.5' />
      </Mask>
      <Rect
        x='3'
        y='4'
        width='10.5882'
        height='10.5882'
        rx='0.5'
        stroke='#C1C1C1'
        stroke-width='2.4'
        mask='url(#path-1-inside-1_1345_25469)'
      />
      <Mask id='path-2-inside-2_1345_25469' fill='white'>
        <Rect x='14.647' y='4' width='6.35293' height='6.35293' rx='0.5' />
      </Mask>
      <Rect
        x='14.647'
        y='4'
        width='6.35293'
        height='6.35293'
        rx='0.5'
        stroke='#C1C1C1'
        stroke-width='2.4'
        mask='url(#path-2-inside-2_1345_25469)'
      />
      <Mask id='path-3-inside-3_1345_25469' fill='white'>
        <Rect x='15' y='11.5' width='6' height='9.5' rx='0.5' />
      </Mask>
      <Rect
        x='15'
        y='11.5'
        width='6'
        height='9.5'
        rx='0.5'
        stroke='#C1C1C1'
        stroke-width='2.4'
        mask='url(#path-3-inside-3_1345_25469)'
      />
      <Mask id='path-4-inside-4_1345_25469' fill='white'>
        <Rect x='3' y='15.647' width='10.59' height='5.29411' rx='0.5' />
      </Mask>
      <Rect
        x='3'
        y='15.647'
        width='10.59'
        height='5.29411'
        rx='0.5'
        stroke='#C1C1C1'
        stroke-width='2.4'
        mask='url(#path-4-inside-4_1345_25469)'
      />
    </Svg>
  ) : (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <Rect
        x='3'
        y='4'
        width='10.5882'
        height='10.5882'
        rx='0.5'
        fill='#507FB9'
      />
      <Rect
        x='14.647'
        y='4'
        width='6.35293'
        height='6.35293'
        rx='0.5'
        fill='#507FB9'
      />
      <Rect x='15' y='11.5' width='6' height='9.5' rx='0.5' fill='#507FB9' />
      <Rect
        x='3'
        y='15.647'
        width='10.59'
        height='5.29411'
        rx='0.5'
        fill='#507FB9'
      />
    </Svg>
  );
};

export default CuratorIcon;
