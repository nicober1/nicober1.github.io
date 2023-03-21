import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import DonateButton from '@site/src/components/DonateButton'


export default function ColorModeToggleWrapper(props) {
  return (
    <>
    <DonateButton></DonateButton>
      <ColorModeToggle {...props} />
    </>
  );
}
