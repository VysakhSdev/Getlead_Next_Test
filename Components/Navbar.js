import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


export default function ButtonAppBar() {
    const router = useRouter();

    const handleLogout = () => {
      localStorage.removeItem('User_token');
      localStorage.removeItem('User_refresh');
      toast.error("Log out Successfully");
      router.push('/login');
    };
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GET LEAD
          </Typography>
          <Button color="inherit" onClick={handleLogout}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}