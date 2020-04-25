export const execute = async (body) => {
    let response = await fetch("http://localhost:8080/rest/v2/graph/operations/execute", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return response.json();

}

export const getOperations = async () => {
    let response = await fetch("http://localhost:8080/rest/v2/graph/operations", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    return response.json();

}


export const getOperationDetails = async (name) => {
    let response = await fetch(`http://localhost:8080/rest/v2/graph/operations/${name}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    return response.json();

}


export const fetchShortestPath = async (node1, node2) => {

    const response = await fetch(`http://localhost:8080/rest/shortestPath?node1=${node1}&node2=${node2}`);

    return response.json();

}

export const fetchUploadGraph = async (data, schemaName, auths, graphDescription) => {
    
    let response = await fetch(`http://localhost:8080/rest/loadCsv?name=${schemaName}&auths=${auths}&desc=${graphDescription}`, {
        method: "POST",        
        body: data
    });

    return response.json();
    
}

export const fetchUploadDataGraph = async (data, schemaName) => {
    
    let response = await fetch(`http://localhost:8080/rest/loadData?name=${schemaName}`, {
        method: "POST",        
        body: data
    });

    return response.json();
    
}

