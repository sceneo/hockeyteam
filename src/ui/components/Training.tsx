import {useGlobalState} from "../GlobalStateProvider";
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
        console.log("change: " + event.target.value + " registered as " + state.currentPlayerId)
    };

    return (
        state.players === undefined || state.pairs === undefined
            ?
            <>
                Hömma, schau zu, dass Player definiert sind.
            </>
            :
            <div>

                <Select native  onChange={handleChange}>
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