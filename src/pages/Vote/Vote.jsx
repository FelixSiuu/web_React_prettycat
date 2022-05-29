import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import Button from '@mui/material/Button';
import './Vote.scss'
import { getImgRequest, voteRequest, favRequest, unFavRequest } from '../../apis/request.js'

export default function Vote() {

  const [imgSrc, setImgSrc] = useState('')
  const [value, setValue] = useState(1)
  const [isFav, setIsFav] = useState(false)
  const [imgId, setId] = useState('')
  const [favId, setFavId] = useState(0)

  useEffect(()=>{
    getImage()
  },[])

  async function getImage(){
    const {data} = await getImgRequest()
    setImgSrc(data[0].url)
    setId(data[0].id)
  }

  async function voteImg(){
    const response = await voteRequest(bodyForVote)
    if(response.status === 200) console.log('vote successful');
  }

  async function saveFavImg(){
    const response = await favRequest(bodyForFav)
    if(response.status === 200) console.log('fav this image')
    setFavId(response.data.id)
  }

  async function deleteFavImg(){
    const response = await unFavRequest(favId)
    if(response.status === 200) console.log('delete this fav image');
  }

  const bodyForFav = {
    image_id: imgId,
    sub_id: 'lovecatguy'
  }

  const bodyForVote = {
    ...bodyForFav,
    value: value,
  }

  return (
    <div className='vote'>
      <div className="voting">
        <div
          // like image send 1
          className="vote_up"
          onClick={()=>{
            setValue(1)
            voteImg()
            getImage()
            setIsFav(false)
          }}
        >
          <Button variant="contained" color="success" startIcon={<ThumbUpIcon/>}>
            LOVE IT
          </Button>
        </div>
        <div 
          className="vote_down" 
          onClick={()=>{
            // don't like image send 0
            setValue(0)
            voteImg()
            getImage()
            setIsFav(false)
          }}
        >
          <Button variant="contained" color="error" startIcon={<ThumbDownAltIcon/>}>
            NOPE IT
          </Button>
        </div>
      </div>

      <div className="img_container">
        <div className="img_box">
          <img src={imgSrc} alt="" />
          {/* fav box for medium and large screen */}
          <div className="fav_box_pc">
            {
              isFav 
              ? 
              <Snackbar
                icon={
                <span onClick={()=>{
                  setIsFav(false)
                  deleteFavImg()
                  }}>
                  <FavoriteIcon color='error'/>
                  &nbsp;FAV IT 
                </span>}
                message={<><MoodIcon/>&nbsp;You love this cat !</>}
              />
              : 
              <Snackbar
                icon={
                <span onClick={()=>{
                  setIsFav(true)
                  saveFavImg()
                  }}>
                  <FavoriteBorderIcon /> 
                  &nbsp;FAV IT
                </span>}
                message={<><SentimentVeryDissatisfiedIcon/>&nbsp;You do not love this cat</>}
              />
            }
          </div>
        </div>

        {/* fav box for small screen */}
        <div className="fav_box_mobile">
          {
            isFav 
            ? 
            <Snackbar
              icon={
              <span onClick={()=>{
                setIsFav(false)
                deleteFavImg()
                }}>
                <FavoriteIcon color='error' />
                &nbsp;FAV IT 
              </span>}
              message={<><MoodIcon/>&nbsp;You love this cat !</>}
            />
            : 
            <Snackbar
              icon={
              <span onClick={()=>{
                setIsFav(true)
                saveFavImg()
                }} >
                <FavoriteBorderIcon/> 
                &nbsp;FAV IT
              </span>}
              message={<><SentimentVeryDissatisfiedIcon/>&nbsp;You do not love this cat</>}
            />
          }
        </div>
      </div>
    </div>
  )
}
