import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { execute } from "./actions/GafferActions"
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GraphIcon from '@material-ui/icons/Storage';
import OperationIcon from '@material-ui/icons/Search';
import NamedOperationIcon from '@material-ui/icons/Group';
import NamedViewIcon from '@material-ui/icons/RemoveRedEye';
import DataIcon from '@material-ui/icons/LineWeight';

import Graphs from "./Graphs";
import Operations from "./Operations";
import NamedOperations from "./NamedOperations";
import NamedViews from "./NamedViews";
import Data from "./Data";

import Arrow from "@material-ui/icons/ArrowRight"

import { generateEdgeTypes, setEdgeColours } from "./utils/schamUtils"

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
        marginTop: 48,
        height: "calc(100vh - 48px)"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

const items = [
    "Graphs",
    "Operations",
    "Named Operations",
    "Named Views",
    "Data",
]

export default function AppNavBar() {

    const classes = useStyles();

    const [navItem, setNavItem] = React.useState(0);
    const [graphs, setGraphs] = React.useState([]);
    const [schema, setSchema] = React.useState();
    const [edgeTypes, setEdgeTypes] = React.useState([]);

    const loadGraph = async (graph) => {

        const body = {
            "class": "uk.gov.gchq.gaffer.store.operation.GetSchema",
            "compact": true,            
        }

        if (graph) {
            body.options = {
                "gaffer.federatedstore.operation.graphIds": graph
            }
        }

        const graphSchema = await execute(body);

        setEdgeColours(Object.keys(graphSchema.edges))
        setSchema(graphSchema);        
        setEdgeTypes(generateEdgeTypes(graphSchema));        
    }


    React.useEffect(() => {
        
        const fetchData = async () => {
            const ops = await execute(
                {
                    class: "uk.gov.gchq.gaffer.federatedstore.operation.GetAllGraphIds"
                }
            );
            setGraphs(ops);
        }

        fetchData();

    }, []);

    const listItem = (index) => {
        switch (index) {
            case 0: return <GraphIcon />
            case 1: return <OperationIcon />
            case 2: return <NamedOperationIcon />
            case 3: return <NamedViewIcon />
            case 4: return <DataIcon />            
            default: 
        }
    }

    const loadPage = (index) => {
        
        setNavItem(index);

        if (index === 4 && !schema) {            
            loadGraph();
        }
        
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar color="primary" position="fixed" className={classes.appBar}>
                <Toolbar variant="dense">
                    <Typography variant="h6" noWrap>
                        Gaffer Viewer
                    </Typography>
                    <Arrow />
                    <Typography variant="h6" noWrap>
                        {items[navItem]}
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
                        <ListItem button key={text} onClick={() => loadPage(index)}>
                            <ListItemIcon>
                                {listItem(index)}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <main className={classes.content}>

                {navItem === 0 && <Graphs graphs={graphs} loadGraph={loadGraph} schema={schema} />}
                {navItem === 1 && <Operations />}
                {navItem === 2 && <NamedOperations />}
                {navItem === 3 && <NamedViews />}
                {navItem === 4 && <Data edgeTypes={edgeTypes}/>}                

            </main>
        </div>
    );
}