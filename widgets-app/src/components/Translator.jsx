import React, { useState } from 'react'
import Convert from './Translator/Convert'
import Dropdown from './Dropdown'

const Translator = () => {
    const options = [
        {
            label: 'Russian',
            value: 'ru'
        },
        {
            label: 'Uzbek',
            value: 'uz'
        }
    ]
    const [text, setText] = useState('')
    const [lang, setLang] = useState(options[0])

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="userInput">Enter text in English...</label>
                    <input 
                        id="userInput"
                        type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </div>

            <Dropdown 
                options={options}
                selected={lang}
                onSelectChange={(option) => setLang(option)}
                fromTranslator={true} 
                label="Select a language" 
            />

            <hr />
            <h3 className="ui header">Output</h3>

            <Convert
                lang={lang}
                text={text}
            />
        </div>
    )
}

export default Translator