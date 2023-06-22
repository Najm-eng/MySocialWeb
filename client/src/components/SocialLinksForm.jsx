import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useSelector } from 'react-redux';

const SocialLinksForm = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [twitterLink, setTwitterLink] = useState('');
  const [linkedInLink, setLinkedInLink] = useState('');
  const token = useSelector((state) => state.token);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateSocialLinks = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/socialLinks`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          twitter: twitterLink,
          linkedIn: linkedInLink,
        }),
      }
    );

    if (response.ok) {
      alert('Social links updated successfully');
    } else {
      alert('Failed to update social links');
    }
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Social Links
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Social Links</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your social links below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="twitter"
            label="Twitter"
            type="url"
            fullWidth
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
          />
          <TextField
            margin="dense"
            id="linkedin"
            label="LinkedIn"
            type="url"
            fullWidth
            value={linkedInLink}
            onChange={(e) => setLinkedInLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateSocialLinks}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SocialLinksForm;
