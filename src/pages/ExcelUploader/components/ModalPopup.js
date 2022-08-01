import React from 'react'
import { Dialog, Slide, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalPopup({ open = false, onClose = () => { }, actions = '', children, title = '' }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="lg"
            fullWidth
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

export default ModalPopup