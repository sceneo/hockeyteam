import {useGlobalState} from "../../globalstate/state/GlobalStateProvider";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React from "react";
import {selectIsOpenExportTeamsDialog} from "../../globalstate/selectors/selectIsOpenExportTeamsDialog";
import ExportTeamContent from "./ExportTeamContent";

export default function ExportTeamsDialog() {
    const {state, setState} = useGlobalState();

    const handleClose = () => {
        setState({
            ...state,
            isOpenExportTeamsDialog: false
        })
    };

    return (
        <div>
            <Dialog
                open={selectIsOpenExportTeamsDialog(state)}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Team Export"}</DialogTitle>
                <DialogContent>
                    <ExportTeamContent teamId={0}  />
                    <ExportTeamContent teamId={1}  />
                    <ExportTeamContent teamId={2}  />
                    <ExportTeamContent teamId={3}  />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Schließen</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}