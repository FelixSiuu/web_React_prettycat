import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoodIcon from '@mui/icons-material/Mood'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SnackBar from '../../components/SnackBar'
import Button from '@mui/material/Button'
import './index.scss'
import { getImgRequest, voteRequest, favRequest, unFavRequest } from '../../apis/request.js'

export default function Vote() {
  const [imgSrc, setImgSrc] = useState('')
  const [value, setValue] = useState(1)
  const [isFav, setIsFav] = useState(false)
  const [imgId, setId] = useState('')
  const [favId, setFavId] = useState(0)

  useEffect(() => {
    getImage()
  }, [])

  async function getImage() {
    const { data } = await getImgRequest()
    setImgSrc(data[0].url)
    setId(data[0].id)
  }

  async function voteImg() {
    await voteRequest(bodyForVote)
  }

  async function saveFavImg() {
    const response = await favRequest(bodyForFav)
    setFavId(response.data.id)
  }

  async function deleteFavImg() {
    await unFavRequest(favId)
  }

  const bodyForFav = {
    image_id: imgId,
    sub_id: 'lovecatguy'
  }

  const bodyForVote = {
    ...bodyForFav,
    value: value
  }

  // for framer motion
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    }
  }
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <div className="vote">
      <div className="voting">
        <div
          // like image send 1
          className="vote_up"
          onClick={() => {
            setValue(1)
            voteImg()
            getImage()
            setIsFav(false)
          }}
        >
          <Button variant="contained" color="success" startIcon={<ThumbUpIcon />}>
            LOVE IT
          </Button>
        </div>
        <div
          className="vote_down"
          onClick={() => {
            // don't like image send 0
            setValue(0)
            voteImg()
            getImage()
            setIsFav(false)
          }}
        >
          <Button variant="contained" color="error" startIcon={<ThumbDownAltIcon />}>
            NOPE IT
          </Button>
        </div>
      </div>

      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="img_container"
      >
        <motion.li variants={item} className="img_box">
          <img src={imgSrc} alt="" />
          {/* fav box for medium and large screen */}
          <div className="fav_box_pc">
            {isFav ? (
              <SnackBar
                icon={
                  <span
                    onClick={() => {
                      setIsFav(false)
                      deleteFavImg()
                    }}
                  >
                    <FavoriteIcon color="error" />
                    &nbsp;FAV IT
                  </span>
                }
                message={
                  <>
                    <MoodIcon />
                    &nbsp;You love this cat !
                  </>
                }
              />
            ) : (
              <SnackBar
                icon={
                  <span
                    onClick={() => {
                      setIsFav(true)
                      saveFavImg()
                    }}
                  >
                    <FavoriteBorderIcon />
                    &nbsp;FAV IT
                  </span>
                }
                message={
                  <>
                    <SentimentVeryDissatisfiedIcon />
                    &nbsp;You do not love this cat
                  </>
                }
              />
            )}
          </div>
        </motion.li>

        {/* fav box for small screen */}
        <div className="fav_box_mobile">
          {isFav ? (
            <SnackBar
              icon={
                <span
                  onClick={() => {
                    setIsFav(false)
                    deleteFavImg()
                  }}
                >
                  <FavoriteIcon color="error" />
                  &nbsp;FAV IT
                </span>
              }
              message={
                <>
                  <MoodIcon />
                  &nbsp;You love this cat !
                </>
              }
            />
          ) : (
            <SnackBar
              icon={
                <span
                  onClick={() => {
                    setIsFav(true)
                    saveFavImg()
                  }}
                >
                  <FavoriteBorderIcon />
                  &nbsp;FAV IT
                </span>
              }
              message={
                <>
                  <SentimentVeryDissatisfiedIcon />
                  &nbsp;You do not love this cat
                </>
              }
            />
          )}
        </div>
      </motion.ul>
    </div>
  )
}
