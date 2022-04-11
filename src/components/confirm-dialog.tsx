import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material"


type ConfirmDialogProps = {
    open: boolean,
    title: string,
    text: string,
    cancel: () => void,
    confirm: () => void,
    autoFocus: "ok" | "no"
}

const ConfirmDialog = ({open, title, text, cancel, confirm, autoFocus}: ConfirmDialogProps) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContentText>
                {text}
            </DialogContentText>
            <DialogActions>
                <Button autoFocus={ autoFocus === "ok" } onClick={confirm}>
                    Ok
                </Button>
                <Button autoFocus={ autoFocus !== "ok" } onClick={cancel}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog