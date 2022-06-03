import React, { useState, useEffect, useCallback } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { motion } from "framer-motion"
import SelectBar from '../../components/SelectBar'
import { getBreedsListRequest, getCategoriesListRequest, getFilterImagesRequest } from '../../apis/request.js'
import './index.scss'

export default function Filter() {

  const [breedsList, setBreedList] = useState([])
  const [cateList, setCateList] = useState([])
  const [typesList] = useState([
    { 'id': 'gif', 'name': 'animated'},
    { 'id': 'jpg', 'name': 'static'},
  ])
  const [limitList] = useState([
    { 'id': 6, 'name': '6' },
    { 'id': 10, 'name': '10' },
    { 'id': 18, 'name': '18' },
    { 'id': 24, 'name': '24' },
  ])
  const [breedId, setBreedId] = useState('')
  const [cateId, setCateId] = useState()
  const [mineType, setMineType] = useState('gif')
  const [limit, setLimit] = useState(10)
  const [filterImages, setFilter] = useState([])

  // get breed list
  const getBreedsList = useCallback(async () => {
    const {data} = await getBreedsListRequest()
    // insert 'none' option for not selected breed
    setBreedList([{ 'id':'', 'name': 'None' }, ...data])
    console.log('get breeds list successful')
  },[])

  // get categories list
  const getCategoriesList = useCallback(async () => {
    const {data} = await getCategoriesListRequest()
    setCateList([{ 'id':'', 'name': 'None' }, ...data])
    console.log('get categories list successful')
  },[])

  // get filter images
  const getFilterImages = useCallback(async () => {
    const {data} = await getFilterImagesRequest(breedId, cateId, mineType, limit)
    console.log('get filter data successful')
    setFilter(data)
  },[breedId, cateId, mineType, limit])

  useEffect(() => {
    getBreedsList()
  }, [getBreedsList])

  useEffect(() => {
    getCategoriesList()
  },[getCategoriesList])

  useEffect(() => {
    getFilterImages()
  },[getFilterImages])

  const getSelected = (data) => {
    switch(data.title){
      case 'Breeds': return setBreedId(data.id)
      case 'Categories': return setCateId(data.id)
      case 'Type': return setMineType(data.id)
      case 'Limit': return setLimit(data.id)
      default: return false
    }
  }

  // for framer motion
  const variants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  }

  return (
    <div className="filter">
      <div className="selectBar_box">
        <SelectBar getSelected={getSelected} selectlist={breedsList} title={'Breeds'}/>
        <SelectBar getSelected={getSelected} selectlist={cateList} title={'Categories'}/>
        <SelectBar getSelected={getSelected} selectlist={typesList} title={'Type'}/>
        <SelectBar getSelected={getSelected} selectlist={limitList} title={'Limit'}/>
      </div>
      <div className="filter_img_container">
        {
          filterImages.length !== 0 
          ?
          <>
          <ImageList variant="masonry" cols={2} gap={5}>
            {
              filterImages.map((item) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ delay: 1 }}
                >
                  <ImageListItem>
                    <img
                      src={item.url}
                      alt='cat'
                      loading='lazy'
                    />
                  </ImageListItem>
                </motion.div>
              ))
            }
          </ImageList>
          <Button variant="contained" 
            fullWidth 
            onClick={() => {getFilterImages()}}
            >
              ANOTHER
          </Button>
          </>
          : 
          <div className="noRes">
            <CircularProgress/>
          </div>
        }
      </div>
    </div>
  )
}
