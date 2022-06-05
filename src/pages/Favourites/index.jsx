import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js'
import Button from '@mui/material/Button'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PetsIcon from '@mui/icons-material/Pets'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import { getFavListRequest, unFavRequest } from '../../apis/request.js'
import './index.scss'

export default function Favourites() {
  const [favList, setFavList] = useState([])
  const [favId, setFavId] = useState('')
  const [open, setOpen] = useState(false)

  // when component mounted, get fav list
  useEffect(() => {
    getFavList()
  }, [])

  // publish a value for navbar
  PubSub.publish('value', 3)

  const getFavList = async () => {
    const { data } = await getFavListRequest('lovecatguy')
    setFavList(data)
  }

  const deleteFavImg = async () => {
    await unFavRequest(favId)
  }

  // asking user for a answer whether delete a fav img
  const handleClick = (e) => {
    // show dialog
    setOpen(true)
    // also set image fav id
    setFavId(e.currentTarget.id)
  }

  // handle yes or no button
  const handleUnFav = (answer) => {
    if (answer === 'yes') {
      return () => {
        deleteFavImg()
        setTimeout(() => {
          getFavList()
          setOpen(false)
        }, 1500)
      }
    } else if (answer === 'no') {
      return () => {
        setTimeout(() => {
          setOpen(false)
        }, 300)
      }
    }
  }

  return (
    <div className="fovaurite">
      <ImageList>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Favourites</ListSubheader>
        </ImageListItem>
        {
          favList.map((item) => {
            return (
              <ImageListItem key={item.id}>
                <img src={item.image.url} alt="favourite cat" loading="lazy" />
                <ImageListItemBar
                  title={`@${item.sub_id}`}
                  subtitle={`fav at ${item.created_at.split('T')[0]}`}
                  actionIcon={
                    <IconButton
                      id={item.id}
                      sx={{ color: 'rgba(255, 255, 255, 0.44)' }}
                      onClick={(e) => {
                        handleClick(e)
                      }}
                    >
                      <FavoriteIcon color="error" />
                    </IconButton>
                  }
                />
              </ImageListItem>
            )
          })
        }
      </ImageList>

      <div className={open ? 'dialog' : 'dialog_close'}>
        <div className="mask" onClick={() => {setOpen(false)}}></div>
        <div className="dialog_content">
          <span className="dialog_title">
            Undo Fav this image? &nbsp; <PetsIcon color="warning" />
          </span>
          <div className="dialog_button">
            <Button variant="contained" color="primary" endIcon={<CheckIcon />} onClick={handleUnFav('yes')}>
              YES
            </Button>
            <Button variant="contained" color="error" endIcon={<CancelIcon />} onClick={handleUnFav('no')}>
              NO
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
