import  React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

function PostCard( {postData} ) {

  const randomCardImage = () => {
    const num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    const cardImg = "bg-card" + num
    return cardImg
  }
  const [postImg, setPostImg] = useState(randomCardImage())

 


  return (
    <Card className=' h-[250px] w-[45%] shadow-lg shadow-slate-700'>
      <CardActionArea className={`w-full h-full ${postImg} border-2 border-red-500`} >
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