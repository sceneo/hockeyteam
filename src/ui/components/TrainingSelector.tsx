import {DataGrid,  GridColDef} from "@material-ui/data-grid";
import {useGlobalState} from "../globalstate/GlobalStateProvider";
import * as React from "react";
import {Pair} from "../../matchmaking/pair";
import {Person} from "../../matchmaking/person";

interface Partner {
    id: number,
    currentPlayerId: number,
    partnerId: number,
    partnerFullName: string,
    matchingFactor: number
}

const columns: GridColDef[] = [
    {
        field: 'partnerFullName',
        headerName: 'Partner',
        sortable: false,
        width: 220,
    },
    {
        field: 'matchingFactor',
        headerName: 'Matching Factor ',
        sortable: false,
        width: 200,
        editable: true,
    },
];

const getPartnerFromPair = (pair: Pair, currentId: number): number => {
    return pair.person1 == currentId ? pair.person2 : pair.person1;
}

const isCurrentIdInPair = (currentId: number, pair: Pair) => {
    return pair.person1 == currentId || pair.person2 == currentId;
}

const filterPairsForCurrentPlayer = (pairs: Pair[] | undefined, players: Person[] | undefined, currentPlayerId: number | undefined): Partner[] => {
    if (pairs === undefined || currentPlayerId === undefined || players === undefined) {
        return [];
    }

    return pairs
        .filter(pair => isCurrentIdInPair(currentPlayerId, pair))
        .map(pair => {
            const partnerId: number = getPartnerFromPair(pair, currentPlayerId);
            const partner: Person | undefined = getPersonById(players, partnerId);
            return {
                id: 1000 * pair.person1 + pair.person2,
                currentPlayerId: currentPlayerId,
                matchingFactor: pair.matchingFactor,
                partnerFullName: partner === undefined ? "Person nicht gefunden" : (partner.firstname + " " + partner.lastname),
                partnerId
            }
        });
}

const getPersonById = (players: Person[], playerId: number): Person | undefined => {
    console.log(players, playerId);
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === playerId) {
            return players[i];
        }
    }
    return undefined
}

export default function TrainingSelector() {
    const {state} = useGlobalState();

    return (
        <div style={{height: 1200, width: '100%'}}>
            <DataGrid
                rows={filterPairsForCurrentPlayer(state.pairs, state.players, state.currentPlayerId)}
                columns={columns}
                pageSize={15}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
