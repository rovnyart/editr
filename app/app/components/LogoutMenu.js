import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

import AppContext from '../context';

export default function LogoutMenu({ email }) {
  const [anchorEl, setAhcnorEl] = useState(null);
  const { logoutUser } = useContext(AppContext);
  return (
    <>
      <Button onClick={(event) => setAhcnorEl(event.currentTarget)}>{email}</Button>
      {anchorEl && (
        <Popover
          anchorEl={anchorEl} open={Boolean(anchorEl)}
          onClose={() => setAhcnorEl(null)} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          getContentAnchorEl={null}
        >
          <MenuItem button onClick={logoutUser}>Logout</MenuItem>
        </Popover>
      )}
    </>
  );
}
