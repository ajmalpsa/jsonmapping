import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import AssignField from '../AssignField';
import UploadButton from './UploadButton';
import UploadForm from './UploadForm';
import {excelData} from "../../dummyDatas/excel"
import JsonCustomHeader from '../../../JsonCustomHeader';

function Upload() {

    const [state, setState] = useState({
        isLoading: false,
        data: {},
        errors: {},
        files: []
    })
    const assignFieldRef = useRef(null)

    const uploadFiles = async (files, encryptedId) => {
        if (files.length > 0) {
            setState({ ...state, isLoading: true });
            var formdata = new FormData();
            //formdata.append("DocRef", eId);
            formdata.append("eDocRef", encryptedId);
            files.forEach((file) => {
                formdata.append("files", file, file.name)
                formdata.append("DocName", file.name);
                //console.log(files.name);
            })
            // formdata.append("Module", moduleName);
            // formdata.append("ModuleCode", moduleCode);
            // formdata.append("MemberCode", MemberCode ?? '');
            // formdata.append("IsIdentityDocument", isIdentityDocument);
            // const result = await DocManagementMethods.postImage(formdata, dispatch, insertDocUrl ? insertDocUrl : Apis.insertDocument, onSuccess, files);
            // setState({ ...state, isLoading: false, data: {} });
            assignFieldRef.current.openModal(excelData)
        }
    }

    const {
        acceptedFiles, isDragActive,
        isDragAccept, open,
        isDragReject, getRootProps, getInputProps
    } = useDropzone({
        accept: '.csv', //docSettings.supportedFiles,
        maxSize: 2 * 1024 * 1024,//in bytes
        onDropRejected: (error) => {
            //console.log(error);
            error.forEach((e) => {
                setState({ ...state, errors: e.errors })
            })
            // if (isFunction(onError)) onError(error)
        },
        onDrop: async (files) => {
            // console.log(files);
            uploadFiles(files)
            // console.log(files);
            setState({ ...state, files })
        },
        noClick: true,
        noKeyboard: true
    });

    return (
        <>
            <div>
                <UploadForm />
                <div style={{
                    display: 'none'
                }}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul></ul>
                    </aside>
                </div>
                <div>
                    <UploadButton fileName={state.files[0]?.name} onClick={open} />
                </div>
            </div>
            {/* <AssignField ref={assignFieldRef} /> */}
            <JsonCustomHeader />
        </>
    )
}

export default Upload