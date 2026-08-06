import {useEffect, useState} from 'react'

type Theme = 'dark' | 'light'

function getStored(): Theme {
    const v = localStorage.getItem('harshify-theme')
    return v === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getStored)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('harshify-theme', theme)
    }, [theme])

    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return {theme, toggle}
}