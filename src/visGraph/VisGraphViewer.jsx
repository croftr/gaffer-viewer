import React from 'react';
import ArrangeIcon from '@material-ui/icons/Transform';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import { changeLayout } from "./visGraph.js"

export default function VisGraph({ graphData, network, height }) {

    React.useEffect(() => {
        console.log("use effect go ");        
    }, []);

    const arrange = () => {
        changeLayout(graphData)        
    }

    return (
        <React.Fragment>
            <div id="loadingBar" style={{ position: "absolute ", left: "50%", bottom: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography style={{ marginBottom: 16 }}>Loading Graph</Typography>
                <div class="loader"></div>
            </div>
            <div style={{ position: "absolute", top: 0, marginTop: 134 + network.offsetHeight, marginLeft: 4, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "space-between" }} id="graphTools">
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

