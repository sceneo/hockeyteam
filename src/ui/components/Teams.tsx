import * as React from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {useGlobalState} from "../globalstate/GlobalStateProvider";

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

export default function Teams() {
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
            <div style={{height: 380, width: '100%'}}>
                <h1>{state.teams[0].teamName} ({simplifyNumbers(state.teams[0].matchingFactor)})</h1>
                <DataGrid
                    rows={state.teams[0].members}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />

                <h1>{state.teams[1].teamName} ({simplifyNumbers(state.teams[1].matchingFactor)})</h1>
                <DataGrid
                    rows={state.teams[1].members}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />

                <h1>{state.teams[2].teamName} ({simplifyNumbers(state.teams[2].matchingFactor)})</h1>
                <DataGrid
                    rows={state.teams[2].members}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
    );
}
