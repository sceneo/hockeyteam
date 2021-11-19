import {useGlobalState} from "../GlobalStateProvider";
import {createTestPairs, createTestPersonSet} from "../../testdata/testdataCreator";
import {calculateTeams} from "../../matchmaking/teamCreator";
import {Button, Grid, styled} from "@material-ui/core";

const Input = styled('input')({
    display: 'none',
});


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
    const handleChange = (selectorFiles: FileList) => {
        console.log(selectorFiles);
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                            onClick={createTestdataForPlayers}>
                        Create Test Data for Players
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                            onClick={createTestdataForPairs}>
                        Create Test Data for Training
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                            onClick={triggerTeamCalculation}>
                        Calculate Teams
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file"/>
                    <Button style={{minWidth: '30%'}} variant="contained" component="span">
                        Upload Training Sheet
                    </Button>
                </Grid>
            </Grid>
        </div>

    );
}