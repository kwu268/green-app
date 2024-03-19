import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const nameParts = name.split(' ');
  let initials = nameParts[0][0];
  if (nameParts.length > 1) {
    initials += nameParts[1][0];
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials
  };
}
  
export default function AvatarInfo({displayName, size}) {
  return (
    <Stack className=''>
      {displayName ?  <Avatar {...stringAvatar(displayName)} className={`${size}`} /> :  <Avatar  className={`${size}`}/>}
    
    </Stack>
  );
}