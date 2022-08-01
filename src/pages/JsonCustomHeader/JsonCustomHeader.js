import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Popup from './Popup/Popup'
import { excelData } from '../ExcelUploader/dummyDatas/excel'
import { comboValues } from '../ExcelUploader/dummyDatas/comboValues'
import MapFields from './components/MapFields'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import DisplayTable from './DisplayTable'
import { isFunction } from 'lodash'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        // color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const JsonCustomHeader = forwardRef(({ onSubmit = null }, ref) => {

    const classes = useStyles()

    const [state, setState] = useState({
        isOpen: true,
        json: [],
        fieldCombo: [],
        replacedObjectArray: []
    })
    const [mappedFields, setMappedFieds] = useState([]) //initial form data
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const tableRef = useRef(null);

    const formatMappingField = () => { // to make initial header form data from json
        let fieldsToMap = Object.keys(excelData[0]).map((header) => {
            return { field: header, mappedTo: '' }
        })
        setMappedFieds(fieldsToMap)
        setState({ ...state, isOpen: true, fieldCombo: comboValues, json: excelData })
    }

    useEffect(() => {
        formatMappingField()
    }, [excelData])

    const handlePopuClose = () => {
        setState({
            ...state,
            isOpen: false,
            json: [],
            fieldCombo: []
        })
    }

    const convertJsonKeyToMapped = async () => {
        setIsSubmitLoading(true)
        let replacements = {}
        mappedFields.forEach((data) => { //covert mapped values array to object
            replacements = { ...replacements, [data.field]: data.mappedTo }
        })

        let convertedJson = state.json.map((tab) => {// replaces old key with user assigned new key
            let replacedObject = {}
            Object.keys(tab).forEach((key) => {
                const newKey = replacements[key] || key;
                replacedObject = { ...replacedObject, [newKey]: tab[key] }
            });
            return replacedObject
        })
        if (isFunction(onSubmit)) await onSubmit(convertedJson)
        setState({ ...state, isOpen: false, json: [], fieldCombo: [], replacedObjectArray: convertedJson })
        setIsSubmitLoading(false)
    }

    const handleSubmitClick = () => {
        convertJsonKeyToMapped()
    }
    const handlePreviewtClick = () => {
        tableRef.current.openTableModal(excelData, mappedFields)
    }

    return (
        <>
            <Popup
                open={state.isOpen}
                title="Map Fields"
                onClose={handlePopuClose}
                actions={<div style={{ margin: '0 30px 10px 0', display: 'flex' }}>
                    <div className={classes.wrapper} >
                        <Button variant="contained" onClick={handlePreviewtClick} size='small' style={{ boxShadow: 'none', marginRight: 5 }} >
                            Preview
                        </Button>
                    </div>
                    <div className={classes.wrapper} >
                        <Button variant="contained"
                            disabled={isSubmitLoading}
                            onClick={handleSubmitClick} size='small' style={{ boxShadow: 'none' }} >
                            Submit
                        </Button>
                        {isSubmitLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>}
            >
                <MapFields mappedFields={mappedFields} setMappedFields={setMappedFieds} comboValues={state.fieldCombo} />
            </Popup>
            <DisplayTable ref={tableRef} />
        </>
    )
})

export default JsonCustomHeader