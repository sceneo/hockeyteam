import * as React from 'react';
import Team from "./Team";
import {Button} from "@material-ui/core";
import {useGlobalState} from "../../globalstate/state/GlobalStateProvider";
import ExportTeamsDialog from "../export/ExportTeamsDialog";

export default function Teams() {
    const {state, setState} = useGlobalState();

    const triggerTeamExport = () => {
        setState({
            ...state,
            isOpenExportTeamsDialog: true,
        })
    }

    return (

            <div>
                <Button style={{minWidth: '30%'}} variant="outlined" color="secondary"
                        onClick={() => triggerTeamExport()}>
                    Export Teams
                </Button>
                <p/>
                <Team teamIndex={0} />
                <Team teamIndex={1} />
                <Team teamIndex={2} />
                <Team teamIndex={3} />
                <ExportTeamsDialog />
            </div>
    );
}
