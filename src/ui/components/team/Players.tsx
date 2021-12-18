import * as React from 'react';
import {
    DataGrid,
    GridCellEditCommitParams,
    GridColDef,
    GridEditCellPropsParams,
} from '@material-ui/data-grid';
import {useGlobalState} from "../../globalstate/state/GlobalStateProvider";
import {Person} from "../../../matchmaking/person";
import {useState} from "react";

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
        field: 'defense',
        headerName: 'Defensiv',
        width: 150,
        editable: true,
    },
    {
        field: 'offense',
        headerName: 'Offensiv',
        width: 150,
        editable: true,
    },
    {
        field: 'physical',
        headerName: 'Physis',
        width: 150,
        editable: true,
    }
];

export default function Players() {
    const {state, setState} = useGlobalState();
    const [playerIdInScope, setPlayerIdInScope] = useState(-1);
    const [fieldnameInScope, setFieldnameInScope] = useState("");
    const [valueInScope, setValueInScope] = useState("");

    const handleCellValueChange = (params: GridEditCellPropsParams) => {
        setPlayerIdInScope(state.players === undefined ? -1 : state.players[parseInt(params.id.toString())].id);
        setFieldnameInScope(params.field);
        setValueInScope(params.props.value === null || params.props.value === undefined ? "" : params.props.value.toString())
    }

    const handleCellValueCommit = (params: GridCellEditCommitParams) => {
        if (state.players !== undefined) {
            const updatedPlayers = state.players;
            updatedPlayers.forEach(player => {
                if (player.id === playerIdInScope) {
                    updateFieldForPlayer(player, fieldnameInScope, valueInScope);
                }
            });
            setState({
                ...state,
                players: updatedPlayers
            })
        }
    }

    const updateFieldForPlayer = (player: Person, fieldname: string, value: string) => {
        if (fieldname === "firstname") {
            updateFirstname(player, value);
        } else if (fieldname === "lastname") {
            updateLastname(player, value);
        } else if (fieldname === "defense") {
            updateDefense(player, parseInt(value))
        } else if (fieldname === "offense") {
            updateOffense(player, parseInt(value))
        } else if (fieldname === "physical") {
            updatePhysical(player, parseInt(value))
        }
    }

    const updateFirstname = (player: Person, value: string) => {
        player.firstname = value;
    }

    const updateLastname = (player: Person, value: string) => {
        player.lastname = value;
    }

    const updateDefense = (player: Person, value: number) => {
        player.defense = value;
    }

    const updateOffense = (player: Person, value: number) => {
        player.offense = value;
    }

    const updatePhysical = (player: Person, value: number) => {
        player.physical = value;
    }

    return (
        state.players === undefined ?
            <>
                Es müssen zuerst Teammitglieder/Spieler hochgeladen oder simuliert werden. Bitte gehe auf Recalc.
            </>
            :
            <div style={{height: 1200, width: '100%'}}>
                <DataGrid
                    rows={state.players}
                    columns={columns}
                    pageSize={20}
                    checkboxSelection
                    disableSelectionOnClick
                    onEditCellPropsChange={handleCellValueChange}
                    onCellEditCommit={handleCellValueCommit}
                />
            </div>
    );
}
