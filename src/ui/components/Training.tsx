import {useGlobalState} from "../globalstate/GlobalStateProvider";
import {Select} from "@material-ui/core";
import React from "react";
import TrainingSelector from "./TrainingSelector";


export default function Training() {

    const {state, setState} = useGlobalState();

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setState({
            ...state,
            currentPlayerId: event.target.value as number,
            currentPlayerAvailable: true
        })
    };

    return (
        state.players === undefined || state.pairs === undefined
            ?
            <>
                Es müssen zunächst Spieler und Paarungen hochgeladen oder simuliert werden.
            </>
            :
            <div>

                <Select native  onChange={handleChange} defaultValue={""}>
                    <option value="" disabled key={-99} >Spieler wählen</option>
                    {state.players.map(player =>
                        <option key={player.id} value={player.id}>{player.firstname} {player.lastname}</option>
                    )}
                </Select>

                {state.currentPlayerAvailable ?
                    <TrainingSelector/>
                    :
                    <></>
                }


            </div>

    );

}