import  React, {useEffect, useState} from 'react';
import TableData from './TableData'
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function PostDialog({postData, token, setCardNumLikes, setNumComments}) {
    const [like, setLike] = useState("text-white")
    const [comments, setComments] = useState(false)
    const [numLikes, setNumLikes] = useState(0)
    const [usersLiked, setUsersLiked] = useState({})

    const sendLikeRequest = async (user_id, post_id, method) => {
      const params = {
        user_id: user_id,
        post_id: post_id,
        method: method
      }
      await axios.post(`${serverURL}/sendLikeRequest`, { ...params })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    const likePost = async () => {
        var method; 
        if (like === "text-white") {
            method = "like"
            setLike("text-red-500")
            setNumLikes(numLikes + 1)
            setCardNumLikes(numLikes + 1)
        }
        else {
            method = "dislike"
            setLike("text-white")
            setNumLikes(numLikes - 1)
            setCardNumLikes(numLikes - 1)
            
        }
        await sendLikeRequest(token.user.id, postData.post_id, method);
    }

    const postComment = async (comment, user_id, postID) => {
      const params = {
        comment: comment,
        userID: user_id,
        postID: postID
      }
      await axios.post(`${serverURL}/createComment`, { ...params })
      .then(response => {
        
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    const getPostCommentsLikes = async () => {
      axios.get(`${serverURL}/getPostCommentsLikes`, {params: {
        post_id: postData.post_id
      }} )
        .then(response => {
          setComments(response.data.comments)
          setNumComments(response.data.comments.length)
          setNumLikes(response.data.likes.length)
          setCardNumLikes(response.data.likes.length)
          const listOfUsersLiked = {}
          response.data.likes.forEach(like => {
            listOfUsersLiked[like.liked_by] = true;
            if (token.user.id == like.liked_by) {
              setLike("text-red-500")
            }
          });
          setUsersLiked(listOfUsersLiked)

        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    

    const handleComment =  async (event) => {
      event.preventDefault();
      const [ comment ] = event.target;
      // console.log(postData)
      await postComment(comment.value, token.user.id, postData.post_id) ;
      await getPostCommentsLikes();    
    }

      useEffect( () => {
        
        if (comments === false) {
          getPostCommentsLikes()
          
        }
        
      })


  return (
    <div className={`flex h-[550px] gap-2`}>
        <div className='w-3/5  h-full flex items-center '>
            <TableData postData={postData}/>
        </div>
        <div className=' flex flex-col border-2 w-2/5 h-full bg-white rounded-lg'>
            <div className=' h-[90%] pl-3 pt-3 overflow-y-auto border-2'>
                {comments && comments.map((commentData, i) => {
                  return <div key={i} className='flex gap-2'>
                    <div className='font-bold'>{commentData.user_profile.display_name.display_name}</div>
                    <div>{commentData.comment_string}</div>
                  </div>
                })}
            </div>
            <div className='h-[5%] flex items-end mb-2 gap-1'>
                <button onClick={likePost}><FavoriteIcon className={`transition-colors ease-in-out delay-150 text-2xl stroke-black ${like}`} /></button>
                <div className=' text-lg'>
                    {numLikes}
                </div>
            </div>
            <div className='flex  h-[8%]  border-2rounded-lg'>
                <form className='flex h-full w-full items-end' onSubmit={handleComment}>
                    <input className='h-full w-5/6 px-2 py-3  border-slate-400' type="text" placeholder={'Type your comment here...'}/>
                    <button className="h-full text-stone-200 font-medium rounded-md w-1/6 shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit">Send</button>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default PostDialog