import React from 'react'

function Table({ headers = [], tableData = [] }) {
    console.log(tableData);
    return (
        <div >
            <table border={1} width="100%">
                <thead>
                    <tr>
                        {headers.map((header, key) => {
                            return <td key={key}>
                                {header.mappedField}
                            </td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((data, index) => {
                           return <tr key={index}>
                                {headers.map((header, key) => {
                                    console.log(data[header.field]);
                                    return <td key={key}>
                                        {data[header.field]}
                                    </td>
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table