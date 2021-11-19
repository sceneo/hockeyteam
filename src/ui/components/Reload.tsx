import {useGlobalState} from "../GlobalStateProvider";
import {createTestPairs, createTestPersonSet} from "../../testdata/testdataCreator";
import {calculateTeams} from "../../matchmaking/teamCreator";
import {Button, Grid} from "@material-ui/core";


export default function Reload() {

    const {state, setState} = useGlobalState();
    const createTestdataForPlayers = () => {
        setState({
            pairs: state.pairs,
            teams: state.teams,
            players: createTestPersonSet(),
        })
    }

    const createTestdataForPairs = () => {
        setState({
            teams: state.teams,
            players: state.players,
            pairs: createTestPairs(state.players),
        })
    }

    const triggerTeamCalculation = () => {
        setState({
            pairs: state.pairs,
            players: state.players,
            teams: calculateTeams(state.players, state.pairs),
        })
    }
    const handleChange = (selectorFiles: FileList) =>
    {
        console.log(selectorFiles);
    }

    return (
        <div>
            <Grid container justifyContent="center">
                <Button variant="outlined" color="primary" onClick={createTestdataForPlayers}>
                    Create Test Data for Players
                </Button>

                <Button variant="outlined" color="primary" onClick={createTestdataForPairs}>
                    Create Test Data for Training
                </Button>
                <Button variant="outlined" color="primary" onClick={triggerTeamCalculation}>
                    Calculate Teams
                </Button>


                <input type="file" onChange={ (e) => handleChange } />

            </Grid>
        </div>

    );
}