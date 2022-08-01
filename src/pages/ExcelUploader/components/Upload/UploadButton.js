import React from 'react'
import { withStyles, TextField, Button, FormGroup } from "@material-ui/core"
import { CloudUpload } from '@material-ui/icons';

const StyledTextField = withStyles({
    root: {
        "& fieldset": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }
    }
})(TextField);

const StyledButton = withStyles({
    root: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        // textTransform: "lowercase"
    }
})(Button);

function UploadButton({ onClick, fileName }) {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 0 15px 15px'
        }}>
            <FormGroup row>
                <StyledTextField size="small" value={fileName ? fileName : ''} variant="outlined" placeholder="File Name" disabled />
                <StyledButton startIcon={<CloudUpload />} onClick={onClick} size="small" variant="contained" disableElevation>
                    Upload
                </StyledButton>
            </FormGroup>
        </div>
    )
}

export default UploadButton