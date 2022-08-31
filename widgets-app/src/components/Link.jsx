import React from 'react'

const Link = ({ href, className, children }) => {
    const onClick = (e) => {
        if (e.metakey || e.ctrlKey) {
            return
        }

        e.preventDefault()

        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <a
            href={href}
            className={className}
            onClick={onClick}
        >
            {children}
        </a>
    )
}

export default Link