import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RefreshIcon from '@material-ui/icons/Refresh';
import GroupIcon from '@material-ui/icons/Group';
import SportsHockeyIcon from '@material-ui/icons/SportsHockey';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Players from "./team/Players";
import Teams from "./team/Teams";
import Training from "./training/Training";
import Reload from "./Reload";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

export default function Menu() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (

        <div className={'invisibleBackground'}>
            <AppBar position="sticky" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Recalc" icon={<RefreshIcon/>} {...a11yProps(0)} />
                    <Tab label="Teams" icon={<GroupIcon/>} {...a11yProps(1)} />
                    <Tab label="Players" icon={<AccessibilityNewIcon/>} {...a11yProps(2)} />
                    <Tab label="Training" icon={<SportsHockeyIcon/>} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Reload/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Teams />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Players/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Training />
            </TabPanel>

        </div>

    );
}
