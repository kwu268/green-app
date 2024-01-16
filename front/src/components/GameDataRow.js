import * as React from 'react';
import Card from '@mui/material/Card';

import { Button, CardActionArea, CardActions } from '@mui/material';

export default function GameDataRow({courseData}) {
  const { courseName, courseType, totalPar, totalStrokes, imgSrc } = courseData;
  

  return (
    <Card className='flex border-2 border-gray-400 rounded-md' >
      <div className='w-1/5'>
          <img src={imgSrc} alt="Oak Gables"/>
      </div>
      
      <CardActionArea className=''>
        <div className='flex justify-around'>

          <div className='text-xl font-bold w-1/5'>
            {courseName}
          </div>

          <div >
            <div className='flex gap-3 justify-center '>
              <div>
                <div className='font-bold '>Holes</div>
                <div>{courseType}</div>
            </div>

              <div>
                <div className='font-bold '>Par</div>
                <div>{totalPar}</div>
              </div>

              <div>
                <div className='font-bold '>Strokes</div>
                <div>{totalStrokes}</div>
              </div>
          </div>
          </div>


          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </div>
      </CardActionArea>
    </Card>
  );
}