import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Button } from "@material-ui/core"
import AssingForm from './AssingForm';
import { comboValues } from "../../dummyDatas/comboValues"
import ModalPopup from '../ModalPopup';
import DisplayTable from '../DisplayTable/DisplayTable';


const AssignField = forwardRef((props, ref) => {

    const [state, setState] = useState({
        isOpen: false,
        oldFields: []
    })
    const [mappedFields, setMappedFieds] = useState([])
    const displayTableRef = useRef(null);

    const handleClose = () => {

    }

    useImperativeHandle(
        ref,
        () => ({
            openModal(data) {// data is obejct from jsonarray[0]
                setState({
                    isOpen: true,
                    oldFields: data
                })
                setMappedFieds(getInitialValues(data[0]))
            }
        })
    )

    return (
        <>
            <ModalPopup
                open={state.isOpen}
                onClose={handleClose}
                title="Assign Fields"
                actions={<>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => displayTableRef.current.openModal(state.oldFields, mappedFields)} color="primary">
                        Agree
                    </Button>
                </>}
            >
                <AssingForm fields={mappedFields} comboValues={comboValues} setFields={(data) => setMappedFieds(data)} />
            </ModalPopup>
            <DisplayTable ref={displayTableRef} />
        </>
    )
})

const getInitialValues = (fieldObeject = {}) => {// to convert object fields to array

    let initialData = Object.keys(fieldObeject).map((item) => {
        return { field: item, mappedField: '' }
    })
    return initialData
}

export default AssignField  