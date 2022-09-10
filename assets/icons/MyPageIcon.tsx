import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface Prop {
  isOutLine: boolean;
}

const MyPageIcon = ({isOutLine}: Prop) => {
  return isOutLine ? (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={2}>
      <Path
        d="M16.5 6.5C16.5 9.12336 14.3733 11.25 11.75 11.25C9.12668 11.25 7 9.12336 7 6.5C7 3.87664 9.12668 1.75 11.75 1.75C14.3733 1.75 16.5 3.87664 16.5 6.5Z"
        stroke="#C1C1C1"
        stroke-width="1.5"
      />
      <Path
        d="M21 22V20C21 16.6863 18.3137 14 15 14H9C5.68629 14 3 16.6863 3 20V22"
        stroke="#C1C1C1"
        stroke-width="1.5"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.25 20C2.25 16.2721 5.27208 13.25 9 13.25H15C18.7279 13.25 21.75 16.2721 21.75 20V22.75H2.25V20ZM9 14.75C6.10051 14.75 3.75 17.1005 3.75 20V21.25H20.25V20C20.25 17.1005 17.8995 14.75 15 14.75H9Z"
        fill="#C1C1C1"
      />
    </Svg>
  ) : (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.5 6.5C16.5 9.12336 14.3733 11.25 11.75 11.25C9.12668 11.25 7 9.12336 7 6.5C7 3.87664 9.12668 1.75 11.75 1.75C14.3733 1.75 16.5 3.87664 16.5 6.5Z"
        fill="#507FB9"
        stroke="#507FB9"
        stroke-width="1.5"
      />
      <Path
        d="M3 20C3 16.6863 5.68629 14 9 14H15C18.3137 14 21 16.6863 21 20V22H3V20Z"
        fill="#507FB9"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.25 20C2.25 16.2721 5.27208 13.25 9 13.25H15C18.7279 13.25 21.75 16.2721 21.75 20V22.75H2.25V20ZM9 14.75C6.10051 14.75 3.75 17.1005 3.75 20V21.25H20.25V20C20.25 17.1005 17.8995 14.75 15 14.75H9Z"
        fill="#507FB9"
      />
    </Svg>
  );
};

export default MyPageIcon;
