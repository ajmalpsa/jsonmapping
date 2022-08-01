import React from 'react'

function DisplayJson({ json, keys, commonKeys }) {
    return (
        <div style={{ maxWidth: '50vw', margin: 5 }}>
            {"{"}
            {Object.entries(json).map((item) => {
                if (keys.find(i => i === item[0])  && commonKeys.find(i => i !== item[0]))
                    return <><span style={{ display: 'block', background: 'green', marginBottom: 2 }}>{`"${item[0]}" : "${item[1]}",`}</span></>
                else if (keys.find(i => i === item[0]) && commonKeys.find(i => i === item[0]))
                    return <><span style={{ display: 'block', background: 'yellow', marginBottom: 2 }}>{`"${item[0]}" : "${item[1]}",`}</span></>
                else
                    return <><span style={{ display: 'block' }}>{`"${item[0]}" : "${item[1]}",`}</span></>
            })}
            {"}"}
        </div>
    )
}

export default DisplayJson