import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Typography,
} from "@material-ui/core";
import React from "react";
import {useGlobalState} from "../../globalstate/state/GlobalStateProvider";
import {selectIsOpenExportPlayerDialog} from "../../globalstate/selectors/selectIsOpenExportPlayerDialog";
import {exportPlayers} from "../../../datahandling/exportPlayers";


export default function ExportPlayerDialog() {
    const {state, setState} = useGlobalState();

    const handleClose = () => {
        setState({
            ...state,
            isOpenExportPlayerDialog: false
        })
    };

    const getOutputTextList = (): string[] => {
        return state.players === undefined ? [] : exportPlayers(state.players);
    }

    return (
        <div>
            <Dialog
                open={selectIsOpenExportPlayerDialog(state)}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Spieler Export"}</DialogTitle>
                <DialogContent>
                    {getOutputTextList().map((item,index)=>{
                        return (
                            <Typography>
                                {item}
                            </Typography>
                        )
                    })}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Schließen</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}