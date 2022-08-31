import React, { useState } from 'react'

const items = [
    {
        title: 'Title 1',
        content: 'Content 1'
    },
    {
        title: 'Title 2',
        content: 'Content 2'
    },
    {
        title: 'Title 3',
        content: 'Content 3'
    }
]

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const onTitleClicked = (index) => {
        setActiveIndex(index)
    }

    const renderedItems = items.map((item, index) => {
        const active = activeIndex === index ? 'active' : ''

        return (
            <React.Fragment key={item.title}>
                <div 
                    className={`title ${active}`}
                    onClick={() => onTitleClicked(index)}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div 
                    className={`content ${active}`}
                >
                    <p>
                        {item.content}
                    </p>
                </div>
            </React.Fragment>
        )
    })

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    )
}

export default Accordion