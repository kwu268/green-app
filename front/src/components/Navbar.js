import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';



export default function Navbar() {
  return (
    <AppBar className='fixed left-0 w-nav h-full '>
      <Toolbar className='bg-green-300 flex flex-col justify-start h-full '>
        <div className='flex'>
        
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <div className='flex justify-center '> 
                <div className='text-lg font-semibold '>Green</div>
                <GolfCourseIcon className='w-1/2'/>
              </div>
            </IconButton>
          </div>
              

            <Button>
              <SearchIcon className=' text-white' />
            </Button>


            
          
          <div className="mt-auto">
            <Button>
              <SettingsIcon className='text-white'/>
            </Button>
          </div>
        

        </Toolbar>
      </AppBar>
  );
}

