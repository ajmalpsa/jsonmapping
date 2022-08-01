import React from 'react'
import { Grid } from "@material-ui/core"
import FieldWithLabel from '../FieldWithCheckBox/FieldWithLabel';

function AssingForm({ fields = [], setFields = () => { }, comboValues = [] }) {

  const handleChange = (index, value, key) => {
    let tempArray = [...fields];
    tempArray[index] = { ...tempArray[index], mappedField: value }
    setFields(tempArray)
  }

  return (
    <>
      <Grid container spacing={2}>
        {fields.map((item, index) => {
          return <Grid item xs={4} key={index + 1}>
            <FieldWithLabel
              field={item.field}
              value={item.mappedField}
              comboValues={comboValues}
              onChange={(value) => handleChange(index, value, item.field)} />
          </Grid>
        })}
      </Grid>
    </>
  )
}



export default AssingForm