import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import {Person} from "../../person/person";

interface PlayersProps {
    players: Person[];
}

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
            `${params.getValue(params.id, 'firstName') || ''} ${
                params.getValue(params.id, 'lastName') || ''
            }`,
    },
];

export default function Players(props: PlayersProps) {
    return (
        <div style={{ height: 1200, width: '100%' }}>
            <DataGrid
                rows={props.players}
                columns={columns}
                pageSize={20}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
