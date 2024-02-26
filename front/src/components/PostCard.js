import  React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import { motion } from "framer-motion";

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PostDialog from './PostDialog';

function PostCard( {postData} ) {

  const randomCardImage = () => {
    const num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    return "bg-card" + num
    
  }

  const [open, setOpen] = useState(false);
  const [postImg, setPostImg] = useState(randomCardImage())

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <motion.div
    whileHover={{ scale: 1.05,  }}
    whileTap={{ scale: 0.95,  }}
    className=' h-[250px] w-[40%] shadow-lg shadow-slate-700 rounded-xl'>
      <Card 
        className='w-full h-full rounded-xl'>
        <CardActionArea className={`w-full h-full ${postImg} bg-cover rounded-xl`} onClick={handleClickOpen}>
          <div className='h-4/5 flex flex-col ml-5'>
            <div className=' mt-5'>
              <Typography className='  font-semibold' gutterBottom variant="h5" component="div">
                    {postData.title}
              </Typography>
            </div>
            <div className='flex flex-col'>
              <Typography variant="body2" color="text.secondary">
                  Total Par: {postData.game_details.strokes.reduce( (totalPar, strokesArray) => totalPar + parseInt(strokesArray.par, 10), 0 ) }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Total Strokes: {postData.game_details.strokes.reduce( (totalStrokes, strokesArray) => totalStrokes + parseInt(strokesArray.strokes, 10), 0 ) }
              </Typography>
            </div>
          </div>
          <div className='flex justify-end items-end gap-4 mr-5'>
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
        <Dialog
          className="flex flex-col items-center w-full"
          open={open}
          onClose={handleDialogClose}
          fullWidth
          maxWidth={"xl"}
        >
          <DialogContent className=''>
            <PostDialog postData={postData}/>
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  );
}


export default PostCard;