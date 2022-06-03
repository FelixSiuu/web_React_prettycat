import React, { useState, useEffect, useCallback } from 'react'
import { motion } from "framer-motion"
import Button from '@mui/material/Button'
import SelectBar from '../../components/SelectBar'
import RatingList from '../../components/RatingList'
import { getBreedInfoRequest, getBreedsListRequest } from '../../apis/request.js'
import './index.scss'

export default function Breeds() {

  const [breedId, setBreedId] = useState("abys")
  const [breedInfo, setBreedInfo] = useState({})
  const [breedImg, setImg] = useState("")
  const [metric, setMetric] = useState("")
  const [breedsList, setList] = useState([])

  // get breed info
  const getBreedInfo = useCallback(async () => {
    const {data} = await getBreedInfoRequest(breedId)
    // breed info
    setBreedInfo(data[0].breeds[0])
    // metric (kg)
    setMetric(data[0].breeds[0].weight.metric)
    // refference image
    setImg(data[0].url)
    console.log('get breed info successful')
  },[breedId])

  // get selected breed from child(SelectBar)
  const getSelected = (data) => {
    setBreedId(data.id)
  }

  // get breed list
  const getBreedsList = useCallback(async () => {
    const {data} = await getBreedsListRequest()
    setList(data)
    console.log('get breeds list successful')
  },[])

  useEffect(() => {
    getBreedsList()
  }, [getBreedsList])

  useEffect(() => {
    getBreedInfo()
  },[getBreedInfo])

  // for framer motion
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  return (
    <div className="breeds">
      <SelectBar getSelected={getSelected} selectlist={breedsList}/>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ delay: 1 }}
      >
        <div className="img_container">
          <div className="img_box">
            <img src={breedImg} alt="" />
          </div>
        </div>
      </motion.div>
      <div className="info_detail">
        <div className="breed_name">{breedInfo.name}</div>
        <div className="breed_origin">Origin: {breedInfo.origin}</div>
        <div className="breed_description">{breedInfo.description}</div>
        <div className="breed_temperament">{breedInfo.temperament}</div>
        <div className="weight">{metric} kg</div>
        <div className="life_span">{breedInfo.life_span} average life span</div>
        <RatingList breedInfo={breedInfo}/>
        <Button variant="contained" fullWidth>
          <a href={breedInfo.wikipedia_url} target="_blank" rel="noreferrer">WIKIPEDIA</a>
        </Button>
      </div>
    </div>
  )
}
