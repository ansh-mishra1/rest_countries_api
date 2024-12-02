import React, { useContext, useState } from 'react'
import style from './header.module.css'
import '../app.css'
import { ThemContext } from '../contexts/ThemContext'

const Header = () => {
    const [isDark, setIsDark] = useContext(ThemContext)

    return (
        <header className={`${style.header} ${isDark ? 'containtColor' : ''}`} >
            <section className={style.headerContaint}>
                <div className={style.headerDiv1}>
                    <span>Where in the world?</span>
                </div>
                <div className={style.headerDiv2} onClick={() => {
                    setIsDark(!isDark)
                    localStorage.setItem('isDark', !isDark)
                }}>
                    <i className={`fa-regular fa-${isDark ? 'sun' : 'moon'}`}></i>&nbsp;
                    <span>{`${isDark ? 'Light' : 'Dark'}`} Mode</span>
                </div>
            </section>
        </header>
    )
}

export default Header
