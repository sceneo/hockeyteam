import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import {useGlobalState} from "../GlobalStateProvider";

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
    },
    {
        field: 'fullName',
        headerName: 'Vollständiger Name',
        sortable: false,
        width: 220,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.getValue(params.id, 'firstname') || ''} ${
                params.getValue(params.id, 'lastname') || ''
            }`,
    },
];

export default function Players() {
    const {state} = useGlobalState();
    return (
        state.players === undefined ?
            <>
                Mach ma erst teammitglieder, Junge!
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
