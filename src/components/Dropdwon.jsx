import React, { useContext } from 'react'
import style from './dropdwon.module.css'
import { ThemContext } from '../contexts/ThemContext'

const Dropdwon = ({setQuery}) => {
  const [isDark] = useContext(ThemContext)

  return (
    <div className={`${style.dropdwonBox} ${isDark ? 'containtColor' : ''}`}>
      <select onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}>
        <option hidden>Filter by Region</option>
        <option value=''>All Regions</option>
        <option value='Africa'>Africa</option>
        <option value='Americas'>Americas</option>
        <option value='Asia'>Asia</option>
        <option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
      </select>
    </div>
  )
}

export default Dropdwon
