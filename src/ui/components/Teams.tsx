import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {useGlobalState} from "../GlobalStateProvider";

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
        field: 'fullName',
        headerName: 'Vollständiger Name',
        sortable: false,
        width: 220,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
                params.getValue(params.id, 'lastName') || ''
            }`,
    },
];

export default function Teams() {
    const {state} = useGlobalState();
    return (


        state.teams === undefined ?
            <>
                mach ma erst teams, mann
            </>
            :
            <div style={{height: 380, width: '100%'}}>
                <h1>{state.teams[0].teamName} ({state.teams[0].matchingFactor})</h1>
                <DataGrid
                    rows={state.teams[0].members}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />

                <h1>{state.teams[1].teamName} ({state.teams[1].matchingFactor})</h1>
                <DataGrid
                    rows={state.teams[1].members}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />

                <h1>{state.teams[2].teamName} ({state.teams[2].matchingFactor})</h1>
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
