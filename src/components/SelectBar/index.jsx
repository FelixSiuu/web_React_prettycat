import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import './index.scss'

export default function SelectBar(props) {
  const [selected, setSelected] = useState('')

  const handleChange = (event) => {
    setSelected(event.target.value)
    // pass an object data, for different data(such as categories, breed)
    props.getSelected({id: event.target.value, title: props.title})
  }

  return (
    <div className="selectbar">
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selected} onChange={handleChange}>
          {
            props.selectlist.map(item => {
              return (
                <MenuItem key={item.id} value={item.id}>{item.name} </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  )
}
