import {useGlobalState} from "../GlobalStateProvider";
import {createTestPairs, createTestPersonSet} from "../../testdata/testdataCreator";
import {calculateTeams} from "../../matchmaking/teamCreator";
import {AppBar, Box, Button, Grid, styled, Tab, Tabs, Typography} from "@material-ui/core";
import {processFileAndLoadPlayers} from "../../datahandling/processFileAndLoadPlayers";
import {processFileAndLoadPairs} from "../../datahandling/processFileAndLoadPairs";
import React from "react";


function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


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

    const handleFileInputForPlayers = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filename = event.target.value;
        const uploadedPlayers = processFileAndLoadPlayers(filename);
        setState({
            ...state,
            players: uploadedPlayers
        })
    }

    const handleFileInputForTraining = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filename = event.target.value;
        const uploadedPairs = processFileAndLoadPairs(filename);
        setState({
            ...state,
            pairs: uploadedPairs
        })
    }

    const exportTraining = () => {
        //TODO
    }

    const exportPlayers = () => {
        //TODO
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Daten Import" {...a11yProps(0)} />
                    <Tab label="Daten Export" {...a11yProps(1)} />
                    <Tab label="Simulation" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary">
                            Import Players
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary">
                            Import Training
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary">
                            Export Players
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{minWidth: '30%'}} variant="contained" color="primary">
                            Export Training
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>

            <TabPanel value={value} index={2}>
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
                </Grid>
            </TabPanel>


            <Grid item xs={12}>
                <Button style={{minWidth: '30%'}} variant="outlined" color="secondary"
                        onClick={triggerTeamCalculation}>
                    Calculate Teams
                </Button>
            </Grid>
        </div>

    )
        ;
}