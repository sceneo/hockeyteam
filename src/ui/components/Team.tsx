import {DataGrid, GridColDef} from "@material-ui/data-grid";
import * as React from "react";
import {useGlobalState} from "../globalstate/GlobalStateProvider";
import {Typography} from "@material-ui/core";

export interface TeamProps {
    teamIndex: number;
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'firstname',
        headerName: 'Vorname',
        width: 150,
        editable: true,
    },
    {
        field: 'lastname',
        headerName: 'Nachname',
        width: 150,
        editable: true,
    },
    {
        field: 'teamintegration',
        headerName: 'Team Matching Faktor',
        width: 150,
        editable: true,
    },
];

export default function Team(props: TeamProps) {
    const {state} = useGlobalState();

    const simplifyNumbers = (num: number): number => {
        return Math.round(num * 100) / 100;
    }

    return (
        state.teams === undefined ?
            <>
                Es muss zuerst ein Team hochgeladen oder simuliert werden. Bitte gehe auf Recalc.
            </>
            :
            <>
                <h1>{state.teams[props.teamIndex].teamName}</h1>
                <Typography>
                    Matching Faktor: {simplifyNumbers(state.teams[props.teamIndex].matchingFactor)}
                </Typography>
                <Typography>
                    Defensive:       {simplifyNumbers(state.teams[props.teamIndex].totalDefense)}
                </Typography>
                <Typography>
                    Offensive:       {simplifyNumbers(state.teams[props.teamIndex].totalOffense)}
                </Typography>
                <Typography>
                    Physis:          {simplifyNumbers(state.teams[props.teamIndex].totalPhysis)}
                </Typography>

                <DataGrid style={{height: 370, width: '100%'}}
                    rows={state.teams[props.teamIndex].members}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </>
    );
}