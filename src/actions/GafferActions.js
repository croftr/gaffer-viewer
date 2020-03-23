export const execute = async (body) => {
    let response = await fetch("http://localhost:8080/rest/v2/graph/operations/execute", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    });

    console.log("response ", response);
    return response.json();

}

export const getOperations = async () => {
    let response = await fetch("http://localhost:8080/rest/v2/graph/operations", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    console.log("response ", response);
    return response.json();

}

