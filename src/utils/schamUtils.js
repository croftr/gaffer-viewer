const allColors = [    
    "#009900",
    "#cc0000",    
    "#0066ff",
    "#ff00bf",
    "#4d2600",
    "#ff4000",
    "#ff8000",
    "#ffbf00",
    "#ffff00",
    "#bfff00",
    "#80ff00",
    "#40ff00",    
    "#00ff40",
    "#00ff80",
    "#00ffbf",
    "#00ffff",
    "#00bfff",
    "#0080ff",
    "#0040ff",    
    "#4000ff",
    "#8000ff",
    "#bf00ff",
    "#ff00ff",    
    "#ff0080",
    "#ff0040",
    "#ff0000",
]

export const edgeColors = {};

export const setEdgeColours = (edges) => {
    
    edges.forEach( (edge, index) => {
        edgeColors[edge] = allColors[index];
    })

    return edgeColors;

}

export const generateEdgeTypes = (schema ={}) => {
    const edgeTypes = [];

    if (!schema.edges) {
        return edgeTypes;
    }

    Object.keys(schema.edges).forEach(edge => {
        edgeTypes.push(edge);
    });

    return edgeTypes;
}

export const getEdgeColor = (group) => {        
    return edgeColors[group];
}