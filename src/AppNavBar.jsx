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

import GraphIcon from '@material-ui/icons/DeviceHub';
import QueriesIcon from '@material-ui/icons/Search';
import DataIcon from '@material-ui/icons/Storage';

import Graphs from "./Graphs";
import Data from "./Data";
import Queries from "./Queries";

import ManageGraphsPage from "./manageGraphs/ManageGraphsPage";
import ManageGraphsIcon from '@material-ui/icons/Settings';

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
    "Schemas",
    "Data",
    "Operations",
    "Manage Graphs"
]

export default function AppNavBar() {

    const classes = useStyles();

    const [navItem, setNavItem] = React.useState(0);
    const [graphs, setGraphs] = React.useState([]);
    const [schema, setSchema] = React.useState();
    const [edgeTypes, setEdgeTypes] = React.useState([]);
    const [selectedSchemaName, setSelectedSchemaName] = React.useState();

    const loadGraph = async (graph = "All") => {

        const body = {
            "class": "uk.gov.gchq.gaffer.store.operation.GetSchema",
            "compact": false,
        }

        if (graph !== "All") {
            body.options = {
                "gaffer.federatedstore.operation.graphIds": graph
            }
        }

        const graphSchema = await execute(body);

        setSelectedSchemaName(graph);
        setEdgeColours(Object.keys(graphSchema.edges || {}))
        setSchema(graphSchema);
        setEdgeTypes(generateEdgeTypes(graphSchema));
    }


    const loadSchemas = async () => {
        const ops = await execute(
            {
                class: "uk.gov.gchq.gaffer.federatedstore.operation.GetAllGraphIds"
            }
        );
        setGraphs(ops);
    }

    React.useEffect(() => {
        loadSchemas();
    }, []);


    const listItem = (index) => {
        switch (index) {
            case 0: return <GraphIcon />
            case 1: return <DataIcon />
            case 2: return <QueriesIcon />
            case 3: return <ManageGraphsIcon />
            default:
        }
    }

    const loadPage = (index) => {

        setNavItem(index);
        if (index === 0 ){
            loadSchemas();                        
        }
        else if (index === 1 && !schema) {            
            loadGraph();
        }
    }

    const onDeleteGraph = async (graphId) => {
        await execute(
            {
                class: "uk.gov.gchq.gaffer.federatedstore.operation.RemoveGraph",
                graphId
            }
        );
        const ops = await execute(
            {
                class: "uk.gov.gchq.gaffer.federatedstore.operation.GetAllGraphIds"
            }
        );
        setGraphs(ops);
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
                    {navItem !== 2 && (
                        <React.Fragment>
                            <Arrow />
                            <Typography variant="h6" noWrap>
                                {selectedSchemaName || "All Schemas"}
                            </Typography>
                        </React.Fragment>
                    )}
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
                {navItem === 0 && <Graphs graphs={graphs} loadGraph={loadGraph} schema={schema} onDeleteGraph={onDeleteGraph} />}
                {navItem === 1 && <Data edgeTypes={edgeTypes} />}
                {navItem === 2 && <Queries />}
                {navItem === 3 && <ManageGraphsPage graphs={graphs} loadGraph={loadGraph} schema={schema} onDeleteGraph={onDeleteGraph} loadSchemas={loadSchemas} />}
            </main>
        </div>
    );
}