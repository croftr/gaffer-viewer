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

    if (type.toLowerCase().includes("alternative")) {
        category = categoryColours["alternative"];
    } else if (type.toLowerCase().startsWith("comm")) {
        category = categoryColours["communication"];
    } else if (type.toLowerCase().startsWith("seen")) {
        category =categoryColours["index"];
    }
    
    return category || colors[index || 0]

}

