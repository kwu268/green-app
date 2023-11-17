import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function GameDataCard({courseData}) {
  const { courseName, courseType, totalPar, totalStrokes, imgSrc } = courseData;
  
  return (
    <Card className='max-w-xs' >
      <CardActionArea>
        <img src={imgSrc} alt="Oak Gables" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {courseName}
          </Typography>
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
           
          

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}