import React, { useContext, useEffect, useState } from 'react'
import style from './countries.module.css'
import { Link } from 'react-router-dom'
import SearchCountry from './SearchCountry'
import Dropdwon from './Dropdwon'
import '../app.css'
import { ThemContext } from '../contexts/ThemContext'

const CountriesList = () => {
    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState('')
    const [isDark] = useContext(ThemContext)
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((res) => res.json())
            .then((data) => {
                setCountries(data)
                // data.forEach((country) => console.log(country.region))
            })
    }, [])

    let filterData = countries.filter((country) => country.region.toLowerCase().includes(query) 
    || country.name.common.toLowerCase().includes(query))

    // console.log(filterData)
    return (
        <>
            <section className={`${style.filterBox} `}>
                <SearchCountry setQuery={setQuery} />
                <Dropdwon setQuery={setQuery} />
            </section>
            <section className={style.countryList}>
                {
                    filterData.map((country) => (
                        <Link to={`/${country.name.common}`} className={`${style.countriesContainer} ${isDark ? 'containtColor' : ''}`} key={country.name.common}>
                            <img src={country.flags.svg} alt={`${country.name.common} flag`} />
                            <div className={style.countryText}>
                                <h2 className={style.title}>{country.name.common}</h2>
                                <p><b>Population</b>: {country.population.toLocaleString('en-IN')}</p>
                                <p><b>Region</b>: {country.region}</p>
                                <p><b>Capital</b>: {country.capital && country.capital[0]}</p>
                            </div>
                        </Link>
                    ))
                }
            </section>
        </>
    )
}

export default CountriesList
