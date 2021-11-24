import TabPanel from "./TabPanel";
import {AppBar, Button, Grid, Tab, Tabs} from "@material-ui/core";
import React from "react";
import {useGlobalState} from "../globalstate/GlobalStateProvider";
import {createTestPairs, createTestPersonSet} from "../../testdata/testdataCreator";
import {importPlayers} from "../../datahandling/importPlayers";
import {importPairs} from "../../datahandling/importPairs";
import LoadPlayerDialog from "./LoadPlayerDialog";
import LoadTrainingDialog from "./LoadTrainingDialog";


function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DataSelection() {
    const {state, setState} = useGlobalState();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    const handleImportPlayers = () => {
        setState({
            ...state,
            isOpenLoadPlayerDialog: true,
        })
    }


    const handleImportPairs = () => {
        setState({
            ...state,
            isOpenLoadTrainingDialog: true,
        })
    }


    const createTestdataForPlayers = () => {
        setState({
            ...state,
            players: createTestPersonSet(),
        })
    }

    const [value, setValue] = React.useState(0);

    const createTestdataForPairs = () => {
        setState({
            ...state,
            pairs: createTestPairs(state.players),
        })
    }


    const importPlayersFromBackend = async () => {
        const players = await importPlayers();
        setState({
            ...state,
            players
        })
    }

    const importTrainingFromBackend = async () => {
        const pairs = await importPairs(state.players);
        setState({
            ...state,
            pairs
        })
    }


    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Daten Import" {...a11yProps(0)} />
                    <Tab label="Simulation/Testing" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary"
                                onClick={() => handleImportPlayers()}>Open Players from Txt </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary"
                                onClick={() => handleImportPairs()}>Import Pairs from Txt </Button>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                                onClick={createTestdataForPlayers}>
                            Create Simulation Data for Players
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                                onClick={createTestdataForPairs}>
                            Create Simulation Data for Training
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary"
                                onClick={importPlayersFromBackend}>
                            Import Players from fixed file
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary"
                                onClick={importTrainingFromBackend}>
                            Import Training from fixed file
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>

            <LoadPlayerDialog />
            <LoadTrainingDialog />
        </div>
    );
}