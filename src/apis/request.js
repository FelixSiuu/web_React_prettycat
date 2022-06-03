import axios from 'axios'

axios.defaults.headers.common['x-api-key'] = "e0c1cfae-90bc-4889-ba62-a4e0d629ff72" 

// Ask for 1 Image, at full resolution
export const getImgRequest = () => {
  return axios.get('https://api.thecatapi.com/v1/images/search', {
    params:{ 
      limit: 1, 
      size: "full"
    }
  }) 
}

// voting img
export const voteRequest = (body) => {
  return axios.post('https://api.thecatapi.com/v1/votes', body)
}

// save an favourite image
export const favRequest = (body) => {
  return axios.post('https://api.thecatapi.com/v1/favourites', body)
}

// delete an favourte image
export const unFavRequest = (favourite_id) => {
  return axios.delete(`https://api.thecatapi.com/v1/favourites/${favourite_id}`)
}

// get fav list
export const getFavListRequest = (user) => {
  return axios.get('https://api.thecatapi.com/v1/favourites', {
    sub_id: user
  })
}

// get breeds list
export const getBreedsListRequest = () => {
  return axios.get(`https://api.thecatapi.com/v1/breeds`)
}

// get breed info
export const getBreedInfoRequest = (id) => {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`)
}

// get categories list
export const getCategoriesListRequest = () => {
  return axios.get('https://api.thecatapi.com/v1/categories')
}

// get filter images
export const getFilterImagesRequest = (breed_id, category_ids, mime_types, limit) => {
  return axios.get('https://api.thecatapi.com/v1/images/search', {
    params: {
      breed_id: breed_id,
      category_ids: category_ids,
      mime_types: mime_types,
      limit: limit
    }
  })
}