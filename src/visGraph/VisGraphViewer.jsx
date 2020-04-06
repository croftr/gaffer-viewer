import React from 'react';
import ArrangeIcon from '@material-ui/icons/Transform';
import PathIcon from '@material-ui/icons/DirectionsWalk';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import { changeLayout } from "./visGraph.js"
import { useShortestPath } from "../customHooks/hooks"
import { fetchShortestPath } from "../actions/GafferActions"

export default function VisGraph({ graphData, network, height }) {

    React.useEffect(() => {        
    }, []);

    const arrange = () => {
        changeLayout(graphData)        
    }

    const [shortestPath, setShortestPath] = useShortestPath();

    const getShortestPath = async () => {

    const graphInfo = document.getElementById("graphInfo");

    if (graphInfo) {
        const nodes = graphInfo.innerHTML;
        console.log("got nodes ", nodes);
        const parts = nodes.split(" ");

        const node1 = parts[2];
        const node2 = parts[6];

        console.log("node1 ", node1); 
        console.log("node2 ", node2); 

        const result = await fetchShortestPath(node1, node2);        
        
        setShortestPath(result)
    }

    
    }
    
    return (
        <React.Fragment>
            <div id="loadingBar" style={{ position: "absolute ", left: "50%", bottom: "50%", display: graphData ? "none" : "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography style={{ marginBottom: 16 }}>Loading Graph</Typography>
                <div className="loader"></div>
            </div>
            <div style={{ position: "absolute", top: 0, marginTop: 134 + network.offsetHeight, marginLeft: 4, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "space-between" }} id="graphTools">
                <div id="tools" style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="re-arrange">
                        <IconButton onClick={arrange}>
                            <ArrangeIcon />
                        </IconButton>
                    </Tooltip>                    

                    <Tooltip title="shortest path">
                        <IconButton onClick={getShortestPath}>
                            <PathIcon />
                        </IconButton>                        
                    </Tooltip>       
                    {shortestPath && shortestPath.join( " >>> " )}             
                    
                </div>                
            </div>

            <Typography style={{position: "absolute", bottom: 0, marginBottom: 30, marginLeft: 16 }} id="graphInfo"></Typography>
        </React.Fragment>

    )
}

