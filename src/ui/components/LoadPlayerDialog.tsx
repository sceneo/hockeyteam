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
import {selectIsOpenLoadPlayerDialog} from "../globalstate/selectIsOpenLoadPlayerDialog";
import {importPlayersFromString} from "../../datahandling/importPlayers";


export default function LoadPlayerDialog() {
    const {state, setState} = useGlobalState();
    const [value, setValue] = React.useState("");

    const handleClose = () => {
        setState({
            ...state,
            isOpenLoadPlayerDialog: false
        })
    };

    const handleCloseAndImport = () => {
        const players = importPlayersFromString(value);
        setState({
            ...state,
            players,
            isOpenLoadPlayerDialog: false,
        })
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Dialog
                open={selectIsOpenLoadPlayerDialog(state)}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Spieler Import"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bitte kopiere hier die Spieler als Komma-separierte Liste hinein. Das Format ist:
                        [id], [Vorname], [Nachname]
                    </DialogContentText>
                    <TextField
                        id="outlined-multiline-static"
                        label="Spieler"
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