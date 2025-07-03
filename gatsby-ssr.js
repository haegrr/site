// eslint-disable-next-line no-unused-vars
import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="preconnect-fonts" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  ]);
};
