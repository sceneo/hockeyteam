import {useGlobalState} from "../globalstate/state/GlobalStateProvider";
import {calculateTeams, createRandomTeam} from "../../matchmaking/teamCreator";
import {Button, Grid} from "@material-ui/core";
import React from "react";
import DataSelection from "./DataSelection";
import {setInitialGlobalState} from "../globalstate/state/setInitialGlobalState";


export default function Reload() {
    const {state, setState} = useGlobalState();
    setInitialGlobalState(state, setState);

    const triggerTeamCalculation = (useOptimization: boolean) => {
        setState({
            ...state,
            teams: useOptimization ? calculateTeams(state.players, state.pairs) : createRandomTeam(state.players, state.pairs),
        })
    }

    return (
        <div>
            <DataSelection/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button style={{minWidth: '30%'}} variant="outlined" color="secondary"
                            onClick={() => triggerTeamCalculation(true)}>
                        Calculate Teams with optimization
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button style={{minWidth: '30%'}} variant="outlined" color="secondary"
                            onClick={() => triggerTeamCalculation(false)}>
                        Calculate Teams randomly
                    </Button>
                </Grid>
            </Grid>
        </div>

    );
}