import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import style from './countryDetails.module.css'
import { ThemContext } from '../contexts/ThemContext'

const CountryDetails = () => {
  const { country } = useParams()
  const [details, setDetails] = useState([])
  const [countryBorders, setCountryBorders] = useState([])
  const [isDark] = useContext(ThemContext)

  useEffect(() => {
    // Fetching Data by country name
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data)
        // console.log(data)
        data.forEach((country) => {
          if (country.borders) {
            Promise.all(country.borders.map((border) => (
              fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
                .then(([borderCountries]) => borderCountries.name.common)
            ))).then((countryBorders) => setCountryBorders(countryBorders))
          }
        })
      }).catch((err) => console.log(err))
  }, [country])
  // console.log(details)
  return (

    <section className={style.countryDetailCantainer} >
      <div className={style.backBtn}>
        <span onClick={() => {
          history.back()
        }} className={`${isDark ? 'containtColor' : ''}`}><i className="fa-solid fa-arrow-left"></i> Back</span>
      </div>
      {
        details.map((country) => (
          <div className={style.detailBox} key={country.name.common}>
            <div className={style.flagBox} >
              <img src={country.flags.svg} alt={`${country.name.common} flag`} />
            </div>
            <div className={style.textBox} >
              <h1>{country.name.common}</h1>
              <div className={style.textDetail} >
                <div>
                  <p><b>Native Name</b>: {Object.values(country.name.nativeName)[0].common}</p>
                  <p><b>Population</b>: {country.population.toLocaleString('en-IN')}</p>
                  <p><b>Region</b>: {country.region}</p>
                  <p><b>Sub Region</b>: {country.subregion} </p>
                  <p><b>Capital</b>: {country.capital?.[0]}</p>
                </div>
                <div>
                  <p><b>Top Level Domain</b>: {country.tld} </p>
                  <p><b>Currencies</b>: {Object.values(country.currencies).map((currency) => currency.name).join(', ')} </p>
                  <p><b>Languages</b>: {Object.values(country.languages).map((language) => language).join(', ')}</p>
                </div>
              </div>

              {country.borders ?
                <div className={style.countryBorder}>
                  <p><b>Border Countries</b>: </p>
                  {
                    countryBorders.map((border) => (
                      <Link to={`/${border}`} className={style.linkTags} key={border} >
                        <span>{border}</span>
                      </Link>
                    ))
                  }
                </div> : false}
            </div>
          </div>
        ))
      }
    </section>

  )
}

export default CountryDetails
