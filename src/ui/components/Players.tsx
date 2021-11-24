import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import {useGlobalState} from "../globalstate/GlobalStateProvider";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
    }
];

export default function Players() {
    const {state} = useGlobalState();
    return (
        state.players === undefined ?
            <>
                Es müssen zuerst Teammitglieder/Spieler hochgeladen oder simuliert werden. Bitte gehe auf Recalc.
            </>
            :
        <div style={{ height: 1200, width: '100%' }}>
            <DataGrid
                rows={state.players}
                columns={columns}
                pageSize={20}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
