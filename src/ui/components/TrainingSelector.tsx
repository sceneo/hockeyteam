import {DataGrid, GridColDef} from "@material-ui/data-grid";
import {useGlobalState} from "../GlobalStateProvider";
import * as React from "react";
import {Pair} from "../../matchmaking/pair";
import {Person} from "../../person/person";

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
        headerName: 'Vollständiger Name',
        sortable: false,
        width: 220,
    },
    {
        field: 'matchingFactor',
        headerName: 'Matching Factor ',
        sortable: false,
        width: 200,
    },
];

const getPartnerFromPair = (pair: Pair, currentId: number): Person => {
    return pair.person1.id == currentId ? pair.person2 : pair.person1;
}

const isCurrentIdInPair = (currentId: number, pair: Pair) => {
    return pair.person1.id == currentId || pair.person2.id == currentId;
}

const filterPairsForCurrentPlayer = (pairs: Pair[] | undefined, currentPlayerId: number | undefined): Partner[] => {
    if (pairs === undefined || currentPlayerId === undefined) {
        return [];
    }

    return pairs
        .filter(pair => isCurrentIdInPair(currentPlayerId, pair))
        .map(pair => {
        return {
            id: 1000*pair.person1.id + pair.person2.id,
            currentPlayerId: currentPlayerId,
            matchingFactor: pair.matchingFactor,
            partnerFullName: getPartnerFromPair(pair, currentPlayerId).firstname + " " + getPartnerFromPair(pair, currentPlayerId).lastname,
            partnerId: getPartnerFromPair(pair, currentPlayerId).id
        }
    });
}

export default function TrainingSelector() {
    const {state} = useGlobalState();
    return (
        <div style={{height: 1200, width: '100%'}}>
            <DataGrid
                rows={filterPairsForCurrentPlayer(state.pairs, state.currentPlayerId)}
                columns={columns}
                pageSize={15}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
