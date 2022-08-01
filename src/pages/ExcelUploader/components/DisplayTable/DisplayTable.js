import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ModalPopup from '../ModalPopup'
import Table from './Table'

const DisplayTable = forwardRef((props, ref) => {

    const [state, setState] = useState({
        isOpen: false,
        tableData: [],
        headers: []
    })

    const handleModalOpen = (jsonData, mappedFields) => {
        setState({...state, tableData: jsonData, headers: mappedFields, isOpen: true})
    }

    const handleClose = () => {
        
    }

    useImperativeHandle(
        ref,
        () => ({
            openModal(jsonData, mappedFields) {
                handleModalOpen(jsonData, mappedFields)
            }
        })
    )

    return (
        <>
            <ModalPopup
                open={state.isOpen}
                onClose={handleClose}
                title="Assign Fields"
                // actions={<>
                   
                // </>}
            >
                <Table headers={state.headers} tableData={state.tableData} />
            </ModalPopup>
        </>
    )
})

export default DisplayTable