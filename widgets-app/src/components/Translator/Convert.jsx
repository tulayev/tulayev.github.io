import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Convert = ({lang, text}) => {
    const [translated, setTranslated] = useState('')
    const [debouncedText, setDebouncedText] = useState(text)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text)
        }, 1000)

        return () => {
            clearTimeout(timerId)
        }
    }, [text])

    useEffect(() => {
        const translate = async () => {
            const { data } = await axios.get('https://translate.googleapis.com/translate_a/single', {
                params: {
                    client: 'gtx',
                    dt: 't',
                    sl: 'en',
                    tl: lang.value,
                    q: debouncedText
                }
            })

            if (data[0] && data[0][0] && data[0][0][0])
                setTranslated(data[0][0][0])
        }

        translate()
    }, [lang, debouncedText])

    return (
        <div>
            <h1 className="ui header">
                {translated}
            </h1>
        </div>
    )
}

export default Convert