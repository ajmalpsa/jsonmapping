import React from 'react'
import ComboBox from '../ComboBox'
import "./style.css"

function FieldWithLabel({ field = "", comboValues = [], onChange = () => { }, value = '' }) {

    return (
        <div className="row">
            <div className={"input-group prefix"}>
                <span className="input-group-addon">
                    {field}
                </span>
                <span style={{width: '70%'}}>
                    <ComboBox
                        mappingkey={{ label: 'name', value: 'code' }}
                        name="Map To"
                        value={value}
                        optionsdata={comboValues}
                        onChange={(_, value) => onChange(value?.value ?? '')}
                    />
                </span>
            </div>
        </div >
    )
}

export default FieldWithLabel