import TabPanel from "./TabPanel";
import {Box, Button, Grid, Tab, Tabs} from "@material-ui/core";
import React from "react";
import {useGlobalState} from "../globalstate/state/GlobalStateProvider";
import {createTestPairs, createTestPersonSet} from "../../testdata/testdataCreator";
import LoadPlayerDialog from "./import/LoadPlayerDialog";
import LoadTrainingDialog from "./import/LoadTrainingDialog";
import ExportPlayerDialog from "./export/ExportPlayerDialog";
import ExportTrainingDialog from "./export/ExportTrainingDialog";
import {isDeveloptment} from "../../testdata/isDeveloptment";


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

    const handleExportPlayers = () => {
        setState({
            ...state,
            isOpenExportPlayerDialog: true,
        })
    }

    const handleExportTraining = () => {
        setState({
            ...state,
            isOpenExportTrainingDialog: true,
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

    return (
        <div>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Import" {...a11yProps(0)} />
                    <Tab label="Export" {...a11yProps(1)} />
                    {isDeveloptment() ?
                        <Tab label="Simulation/Testing" {...a11yProps(2)} />
                        :
                        <></>
                    }
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                                onClick={() => handleImportPlayers()}>Spieler</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                                onClick={() => handleImportPairs()}>Training</Button>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                                onClick={() => handleExportPlayers()}>Spieler</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="outlined" color="primary"
                                onClick={() => handleExportTraining()}>Training</Button>
                    </Grid>
                </Grid>
            </TabPanel>
            {isDeveloptment() ?
                <TabPanel value={value} index={2}>
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
                    </Grid>
                </TabPanel>
                :
                <></>
            }
            <LoadPlayerDialog/>
            <LoadTrainingDialog/>
            <ExportPlayerDialog/>
            <ExportTrainingDialog/>
        </div>
    );
}