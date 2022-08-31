import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Accordion from './components/Accordion'
import Dropdown from './components/Dropdown'
import Route from './components/Route'
import Search from './components/Search'
import Translator from './components/Translator'

export default function App() {
    const options = [
        {
            label: 'Tiger',
            value: '/assets/images/tiger.jpeg'
        },
        {
            label: 'Anteater',
            value: '/assets/images/anteater.jpg'
        },
        {
            label: 'Buffalo',
            value: '/assets/images/buffalo.jpg'
        }
    ]
    const [selected, setSelected] = useState(options[0])

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Navbar />
            <Route path="/">
                <Accordion />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown 
                    options={options}
                    selected={selected}
                    onSelectChange={(option) => setSelected(option)}
                    fromTranslator={false}
                    label="Select a mammal" 
                />
            </Route>
            <Route path="/translator">
                <Translator />
            </Route>
        </div>
    )
}