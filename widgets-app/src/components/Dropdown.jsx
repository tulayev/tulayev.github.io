import React, { useEffect, useRef, useState } from 'react'

const Dropdown = ({options, selected, onSelectChange, fromTranslator, label}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const onBodyClick = e => {
            if (ref.current.contains(e.target)) 
                return

            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClick)

        return () => {
            document.body.removeEventListener('click', onBodyClick)
        }
    }, [])

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null
        }

        return (
            <div 
                key={option.value} 
                className="item"
                onClick={() => onSelectChange(option)}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div>
            <div ref={ref} className="ui form">
                <div className="field">
                    <label className="label">
                        {label}
                    </label>
                    <div 
                        className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                        onClick={() => setOpen(!open)}
                    >
                        <i className="dropdown icon"></i>
                        <div className="text">{selected.label}</div>
                        <div 
                            className={`menu ${open ? 'visible transition' : ''}`}
                            onClick={() => setOpen(!open)}
                        >
                            {renderedOptions}
                        </div>
                    </div>
                </div>
            </div>

            {!fromTranslator ? 
                <div style={{marginTop: '10px'}}>
                    <img 
                        src={selected.value} 
                        alt={selected.label} 
                        style={{objectFit: 'cover', width: '100%'}}
                    />
                </div>
            : null}
        </div>
    )
}

export default Dropdown