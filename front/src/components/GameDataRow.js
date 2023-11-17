import * as React from "react";
import Card from "@mui/material/Card";

import { Button, CardActionArea, CardActions } from "@mui/material";

export default function GameDataRow({ courseData }) {
  const { courseName, courseType, totalPar, totalStrokes, imgSrc } = courseData;

  return (
    <Card className="max-h-xs h-28 w-full mr-32  flex">
      <div>
        <img src={imgSrc} alt="Oak Gables" className="w-64 h-52" />
      </div>

      <CardActionArea className="">
        <div className="flex justify-around">
          <div className="text-xl font-bold w-44 ">{courseName}</div>

          <div className="">
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
