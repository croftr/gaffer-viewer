import React from 'react';
import ArrangeIcon from '@material-ui/icons/Transform';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import { changeLayout } from "./visGraph.js"

export default function VisGraph({ graphData, network }) {

    const arrange = () => {
        changeLayout(graphData)
        console.log(network.offsetWidth);
    }

    return (
        <React.Fragment>
            <div style={{ position: "absolute", top: 0, marginTop: 185, marginLeft: 4, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "space-between" }} id="graphTools">

                <div id="tools" style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="re-arrange">
                        <IconButton onClick={arrange}>
                            <ArrangeIcon />
                        </IconButton>
                    </Tooltip>

                </div>

            </div>

            <Typography style={{position: "absolute", bottom: 0, marginBottom: 30, marginLeft: 16 }} id="graphInfo"></Typography>
        </React.Fragment>

    )
}

