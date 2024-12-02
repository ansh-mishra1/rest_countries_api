import React, { useContext } from 'react'
import style from './SearchCountry.module.css'
import { ThemContext } from '../contexts/ThemContext'

const SearchCountry = ({setQuery}) => {
    const [isDark] = useContext(ThemContext)
    return (
    <div className={`${style.searchBox} ${isDark ? 'containtColor' : ''}`}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder='Search for a country...' onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
    )
}

export default SearchCountry
