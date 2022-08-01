import React from 'react'
import ExcelUploader from './ExcelUploader'
import JsonDiff from './JsonDiff'

function Pages() {
    return (
        <div
        style={{
            padding: '10px',
            height:window.screen.availHeight,
            background: '#dbdbdb'
        }}
        >

            <ExcelUploader />
        </div>
    )
}

export default Pages