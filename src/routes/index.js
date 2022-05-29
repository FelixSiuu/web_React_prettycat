import { Navigate } from 'react-router-dom'
import Vote from '../pages/Vote/Vote'
import Breeds from '../pages/Breeds/Breeds'
import Filter from '../pages/Filter/Filter'
import Favourites from '../pages/Favourites/Favourites'

const routes = [
  { path: '/' , element: <Navigate to="/vote"/>},
  { path: '/vote', element: <Vote /> },
  { path: '/breeds', element: <Breeds /> },
  { path: '/favourites', element: <Favourites /> },
  { path: '/filter', element: <Filter /> },
]

export default routes