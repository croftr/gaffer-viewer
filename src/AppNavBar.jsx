import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GraphIcon from '@material-ui/icons/Storage';
import OperationIcon from '@material-ui/icons/Search';
import NamedOperationIcon from '@material-ui/icons/Group';

import Graphs from "./Graphs";
import Operations from "./Operations";
import NamedOperations from "./NamedOperations";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 64,
        height: "calc(100vh - 64px)"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

const items = [
    "Graphs",
    "Operations",
    "Named Operations"
]
    
export default function AppNavBar() {

    const classes = useStyles();

    const [navItem, setNavItem] = React.useState(0);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Gaffer Viewer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    {items.map((text, index) => (
                        <ListItem button key={text} onClick={() => setNavItem(index)}>
                            <ListItemIcon>
                                {index === 0 && <GraphIcon /> }
                                {index === 1 && <OperationIcon /> }
                                {index === 2 && <NamedOperationIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>                
            </Drawer>

            <main className={classes.content}>

                {navItem === 0 && <Graphs /> }
                {navItem === 1 && <Operations /> }
                {navItem === 2 && <NamedOperations /> }
                
            </main>
        </div>
    );
}