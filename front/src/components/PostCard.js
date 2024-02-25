import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

function PostCard( {postData} ) {
  return (
    <Card className=' h-[200px] w-[45%]'>
      <CardActionArea className='w-full h-full'>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {postData.title}
            </Typography>
        <div className='flex'>
            <Typography variant="body2" color="text.secondary">
                Total Par: {postData.game_details.strokes.reduce( (totalPar, strokesArray) => totalPar + parseInt(strokesArray.par, 10), 0 ) }
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Total Strokes: {postData.game_details.strokes.reduce( (totalStrokes, strokesArray) => totalStrokes + parseInt(strokesArray.strokes, 10), 0 ) }
            </Typography>
        </div>

          
        </CardContent> 
        <div className='flex justify-end gap-4 mr-5 mt-12'>
            <div className=''>
                <FavoriteIcon className='mr-2'/>
                
                {postData.likes}
            </div>
            <div>
                <CommentIcon className='mr-2'/>
                {postData.comments}
            </div>
        </div>
      </CardActionArea>
    </Card>
  );
}


export default PostCard;