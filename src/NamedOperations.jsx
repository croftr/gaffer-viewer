import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NamedOperationIcon from '@material-ui/icons/Group';
import { Typography, Select } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'

import { commonEdgesTemplate } from "./customOperations/commonEdgesTemplate.js"

import {
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    Chip
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const edgeTyoes = [
    "A",
    "B",
    "C",
    "D",
    "E"
]

const styles = {
    securityStep: {
        display: "flex",
        flexDirection: "column"
    },
    marginTop: {
        marginTop: 16
    },
    chip: {        
        margin: 4
    },
    input: {
        minWidth: 300
    },
    applyButton: {
        width: 100, 
        alignSelf: "flex-end"
    }
}


const NamedOperations = ({ classes }) => {

    const [namedOperations, setNamedOperations] = React.useState([]);
    const [selectedOperation, setSelectedOperation] = React.useState();
    const [edges, setEdges] = React.useState([]);

    const uiOperations = [
        { operationName: "commonEdges ", description: "Find nodes with common edges" }
    ]

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await execute(
                {
                    "class": "uk.gov.gchq.gaffer.named.operation.GetAllNamedOperations"
                }
            );
            setNamedOperations(ops);

        }

        fetchData();

    }, []);



    const onChangeEdges = (e) => {
        console.log("change ", e);
        setEdges(e.target.value)
        
    }


    return (
        <div style={{ display: "flex" }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 320, marginRight: 8 }}>
                {uiOperations.concat(namedOperations).map(op => (
                    <ListItem button onClick={() => setSelectedOperation(op)} alignItems="flex-start" key={op.operationName}>
                        <ListItemAvatar>
                            <Avatar>
                                <NamedOperationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={op.operationName} secondary={op.description} />
                    </ListItem>
                ))}
            </List>
            <div style={{}}>
                {selectedOperation && <Typography style={{ paddingLeft: 8, paddingTop: 8 }} variant="h6">{selectedOperation.operationName}</Typography>}
                {selectedOperation && (
                    <FormControl className={classes.marginTop} >
                        <InputLabel id="authGroupsLabel">Edges</InputLabel>
                        <Select
                            labelId="edges"
                            id="selectEdges"
                            multiple
                            value={edges}
                            onChange={onChangeEdges}
                            input={<Input id="selectAuthChip" className={classes.input} />}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value}  />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {edgeTyoes.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                
            </div>

            {edges.length > 0 && <JSONPretty style={{ marginLeft: 8, border: "1px solid lightGrey"}}  id="json-pretty" data={commonEdgesTemplate(edges)} ></JSONPretty>}

        </div>
    );
}

NamedOperations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NamedOperations);