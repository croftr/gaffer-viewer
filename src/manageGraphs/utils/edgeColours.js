const colors = [
    "green",
    '#E38627',
    '#C13C37',
    '#6A2135',
    "DarkCyan",
    "DarkBlue",
    "DarkGoldenRod",
    "LightCoral",
    "LightSeaGreen",
    "LightSalmon",
    "Olive",
    "PaleGreen",
    "Tomato",
    "YellowGreen",
    "red",
    "MediumPurple"
]

const categoryColours = {
    alternative: "orange",
    communication: "purple",
    index: "black"
}

export const edgeColour = (type, index) => {

    let category;
    const desc = type.toLowerCase();

    if (desc.includes("alternative") || desc.includes("aka") || desc.includes("alias")) {
        category = categoryColours["alternative"];
    } else if (desc.startsWith("comm")) {
        category = categoryColours["communication"];
    } else if (desc.startsWith("seen")) {
        category =categoryColours["index"];
    }
    
    return category || colors[index || 0]

}

