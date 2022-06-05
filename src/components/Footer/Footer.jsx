import React, { useState } from 'react'
import PubSub from 'pubsub-js'
import { useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import Paper from '@mui/material/Paper'

export default function Footer() {
  const [value, setValue] = useState()
  const [navData] = useState([
    { id: 0, label: 'VOTE', icon: <ThumbsUpDownIcon /> },
    { id: 1, label: 'BREEDS', icon: <FormatListBulletedIcon /> },
    { id: 2, label: 'FILTER', icon: <SavedSearchIcon /> },
    { id: 3, label: 'FAVOURITES', icon: <FavoriteIcon /> }
  ])
  const navigate = useNavigate()

  // create a function to subscribe to value
  const mySubscriber = function (_, data) {
    setValue(data)
  };
  PubSub.subscribe('value', mySubscriber)

  return (
    <div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue)
          }}
        >
          {navData.map((item) => {
            return (
              <BottomNavigationAction
                key={item.id}
                label={item.label}
                icon={item.icon}
                onClick={() => {
                  navigate(`/${item.label.toLowerCase()}`)
                }}
              />
            )
          })}
        </BottomNavigation>
      </Paper>
    </div>
  )
}
