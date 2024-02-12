import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function GameDataCard({ courseData }) {
  const { courseName, courseType, totalPar, totalStrokes, imgSrc } = courseData;

  return (
    <Card className="mt-8 w-2/5 h border-gray-400 border-2 rounded-2xl bg-gradient-to-br from-red-100 to-violet-400  h-full bg-cover">
      <CardActionArea>
     
        <CardContent className="">
          <Typography gutterBottom variant="h5" component="div">
            {courseName}
          </Typography>
          <div className="flex gap-3 justify-center ">
            <div>
              <div className="font-bold ">Holes</div>
              <div>{courseType}</div>
            </div>

            <div>
              <div className="font-bold ">Par</div>
              <div>{totalPar}</div>
            </div>

            <div>
              <div className="font-bold ">Strokes</div>
              <div>{totalStrokes}</div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button ><FavoriteIcon style={{ color: 'white' }}/></button>
      </CardActions>
    </Card>
  );
}
