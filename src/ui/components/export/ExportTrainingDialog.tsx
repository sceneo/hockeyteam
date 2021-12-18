import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Typography,
} from "@material-ui/core";
import React from "react";
import {useGlobalState} from "../../globalstate/state/GlobalStateProvider";
import {selectIsOpenExportPairsDialog} from "../../globalstate/selectors/selectIsOpenExportPairsDialog";
import {exportPairs} from "../../../datahandling/exportPairs";


export default function ExportTrainingDialog() {
    const {state, setState} = useGlobalState();

    const handleClose = () => {
        setState({
            ...state,
            isOpenExportTrainingDialog: false
        })
    };

    const getOutputTextList = (): string[] => {
        return state.players === undefined ? [] : exportPairs(state.pairs);
    }

    return (
        <div>
            <Dialog
                open={selectIsOpenExportPairsDialog(state)}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Training Export"}</DialogTitle>
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