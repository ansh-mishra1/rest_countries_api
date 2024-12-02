import { useContext, useEffect, useState } from 'react'
import './App.css'
import CountriesList from './components/CountriesList'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CountryDetails from './components/CountryDetails'
import { ThemContext } from './contexts/ThemContext'

function App() {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDark')));
  useEffect(() => {
    if(isDark){
      document.body.classList.add('dark')
    }
    else{
      document.body.classList.remove('dark')
    }
  },[isDark])
  return (
    <ThemContext.Provider value={ [isDark, setIsDark] } >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={ <CountriesList isDark={isDark} />} />
          <Route path='/:country' element={<CountryDetails isDark={isDark} />} />
        </Routes>
      </BrowserRouter>
    </ThemContext.Provider>
  )
}

export default App
