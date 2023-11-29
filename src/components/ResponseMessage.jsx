import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ResponseMessage({open, setOpen, message, status}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    const updatedItem = { ...setOpen, open: false };
    setOpen(updatedItem)
  };

  return (
    <Stack spacing={2} sx={{ width: '100%'}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  >
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
