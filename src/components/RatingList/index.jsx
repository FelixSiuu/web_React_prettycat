import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import './index.scss'

export default function RatingList(props) {

  const [ratingList, setRatingList] = useState([])

  useEffect(() => {
    setRatingList([
      { key: 'Affection Level', value: props.breedInfo.affection_level },
      { key: 'Adaptability', value: props.breedInfo.adaptability },
      { key: 'Child Friendly', value: props.breedInfo.child_friendly },
      { key: 'Dog Friendly', value: props.breedInfo.dog_friendly },
      { key: 'Energy Level', value: props.breedInfo.energy_level },
      { key: 'Grooming', value: props.breedInfo.grooming },
      { key: 'Health Issues', value: props.breedInfo.health_issues },
      { key: 'Intelligence', value: props.breedInfo.intelligence },
      { key: 'Shedding Level', value: props.breedInfo.shedding_level },
      { key: 'Social Needs', value: props.breedInfo.social_needs },
      { key: 'Stranger Friendly', value: props.breedInfo.stranger_friendly },
      { key: 'Vocalisation', value: props.breedInfo.vocalisation },
    ])
  },[props.breedInfo])

  return (
    <div className="rating_list">
      {
        ratingList.map((item, index) => {
          return (
            <div className="rating_item" key={index}>
              <Typography component="legend">{item.key}</Typography>
              
              {/* fixed error : A component is changing the uncontrolled value state of Rating to 
              be controlled.Elements should not switch from uncontrolled to controlled (or vice versa).*/}
              <Rating name="read-only" value={item.value === undefined ? 0 : item.value} readOnly />
            </div>
          )
        })
      }
    </div>
  )
}
