import React from 'react';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NamedOperationIcon from '@material-ui/icons/Group';
import { Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';

export default function Data() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await execute(
                {
                    "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
                    "limit": 1000
                }
            );
            setData(data);

        }

        fetchData();

    }, []);


    return (
        <Paper style={{ display: "flex" }}>

            <div style={{}}>
                {data && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
            </div>

        </Paper>
    );
}