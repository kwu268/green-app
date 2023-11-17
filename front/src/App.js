import React, { useState } from 'react' 
import './Global.css'
import Navbar from './components/Navbar.js'
import GameDataCard from './components/GameDataCard.js';
import GameDataRow from './components/GameDataRow.js';
import Profile from './components/Profile.js';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {sampleCourseData, sampleCourseData2, sampleCourseData3, sampleCourseData4} from "./sampleData.js"
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [viewType, setViewType] = useState("grid");

  const switchView = (buttonType) => {
    switch (buttonType) {
      case (buttonType === 'grid'):
        setViewType('grid')
        break;
      case (buttonType === 'row'):
        setViewType('row')
        break;
      case (buttonType === 'stats'):
        setViewType('stats')
        break;
    }
  }

  const isGrid = () => {
    console.log()
    setViewType('grid')
  }

  const isRow = () => {
    setViewType('row')
  }

  const isStats = () => {
    setViewType('stats')
  }

  return (
    <div className='flex  justify-start h-auto'>
  
      <div className='h-auto fixed'>
        <Navbar/>
      </div>

      <div name='Avatar Profile and Game Cards' className='flex flex-col ml-24 w-full h-3/4 '>
        
        <div  name="prfile info " className=' h-full'>
          <Profile/>
        </div>

        <div name="game data" className='align-middle h-auto border-t-2 w-3/4 ml-48'>

          <div className='pt-3 flex justify-center'>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button className="bg-green-200" onClick={isGrid}><AppsIcon/></Button>
            <Button className="bg-green-200" onClick={isRow}><MenuIcon/></Button>
            <Button className="bg-green-200" onClick={isStats}>Stats</Button>
          </ButtonGroup>
          </div>

          <br></br>
          {viewType=="grid" && 
            <div className='flex flex-start flex-wrap gap-7 justify-center' > 
              <GameDataCard courseData={sampleCourseData}/>
              <GameDataCard courseData={sampleCourseData2}/>
              <GameDataCard courseData={sampleCourseData3}/>
              <GameDataCard courseData={sampleCourseData4}/>
            </div>
            }
          {viewType=="row" &&
            <div className='flex flex-start flex-wrap gap-7  ' > 
              <GameDataRow courseData={sampleCourseData}/>
              <GameDataRow courseData={sampleCourseData2}/>
              <GameDataRow courseData={sampleCourseData3}/>
              <GameDataRow courseData={sampleCourseData4}/>
            </div>
            }
            {viewType=="stats" &&
            <div className='flex flex-start flex-wrap gap-7  pl-44' > 
              <GameDataRow courseData={sampleCourseData}/>
              <GameDataRow courseData={sampleCourseData2}/>
              <GameDataRow courseData={sampleCourseData3}/>
              <GameDataRow courseData={sampleCourseData4}/>
            </div>
            }

        </div>

      </div>
  

  </div>
  );
}

export default App;
