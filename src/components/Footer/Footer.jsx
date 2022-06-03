import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  const navigate = useNavigate()
  const location = useLocation()

  const navData = [
    { id: 0, label: 'VOTE', icon: <ThumbsUpDownIcon /> },
    { id: 1, label: 'BREEDS', icon: <FormatListBulletedIcon /> },
    { id: 2, label: 'FILTER', icon: <SavedSearchIcon /> },
    { id: 3, label: 'FAVOURITES', icon: <FavoriteIcon /> }
  ]

  useEffect(() => {
    const pathName = location.pathname.split('/')[1].toUpperCase()
    const found = navData.find((item) => {
      return item.label === pathName
    })
    setValue(found.id)
  }, [value])

  return (
    <div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
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
