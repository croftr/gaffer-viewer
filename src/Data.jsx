import React from 'react';
import { execute } from "./actions/GafferActions"
import { Typography, Button } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';

export default function Data() {

    const [data, setData] = React.useState([]);

    const standard = async () => {

        const data = await execute(
            {
                "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
                "limit": 1000
            }
        );
        setData(data);

    }



    React.useEffect(() => {

        standard();

    }, []);

    const keylines = async () => {
        const data = await execute(
            {
                "class": "uk.gov.gchq.gaffer.operation.OperationChain",
                "operations": [
                    {
                        "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
                    },
                    {
                        "class": "uk.gov.gchq.gaffer.operation.impl.generate.GenerateObjects",
                        "elementGenerator": {
                            "class": "uk.gov.gchq.gaffer.keylines.KeylinesGenerator"
                        }
                    }
                ]
            }
        );
        setData(data);

    }


    return (
        <Paper>
            <div style={{ display: "flex", alignItems: "center", padding: 8 }}>
                <Typography>Convert to: </Typography>
                <Button style={{ marginLeft: 16 }} variant="contained" onClick={standard}>Default</Button>
                <Button style={{ marginLeft: 16 }} variant="contained" onClick={keylines}>Keylines</Button>
            </div>


            <div style={{}}>
                {data && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
            </div>

        </Paper>
    );
}