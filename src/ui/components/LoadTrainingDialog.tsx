import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import React from "react";
import {useGlobalState} from "../globalstate/GlobalStateProvider";
import {importPairsFromString} from "../../datahandling/importPairs";
import {selectIsOpenLoadTrainingDialog} from "../globalstate/selectIsOpenLoadTrainingDialog";


export default function LoadTrainingDialog() {
    const {state, setState} = useGlobalState();
    const [value, setValue] = React.useState("");

    const handleClose = () => {
        setState({
            ...state,
            isOpenLoadTrainingDialog: false
        })
    };

    const handleCloseAndImport = () => {
        const pairs = importPairsFromString(state.players,value);
        setState({
            ...state,
            pairs,
            isOpenLoadTrainingDialog: false,
        })
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Dialog
                open={selectIsOpenLoadTrainingDialog(state)}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Training Import"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bitte kopiere hier die Trainings-Liste als Komma-separierte Liste hinein. Das Format ist:
                        [id Spieler1], [id Spieler 2], [Matching Faktor]
                    </DialogContentText>
                    <TextField
                        id="outlined-multiline-static"
                        label="Training"
                        multiline
                        rows={5}
                        defaultValue={""}
                        onChange={handleChange}
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCloseAndImport}>Import</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}