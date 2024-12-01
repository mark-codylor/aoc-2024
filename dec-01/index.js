import * as fs from "node:fs";

export const assignment1Start = async () => {
    // Retrieve file
    const lists = retrieveLists();

    // Get two lists
    const leftList = lists.map(item => item[0]);
    const rightList = lists.map(item => item[1]);

    // Add distances
    const totalDistance = calculateTotalDistance(leftList, rightList);
    console.log("Total Distance:", totalDistance);

    const similarity = calculateSimilarity(leftList, rightList);
    console.log("Similarity:", similarity);

}

const retrieveLists = ()=>
{
    let fileContents = fs.readFileSync("./input.txt", "utf8");
    let listItems = fileContents.split('\n').map(line => line.trim());
    return listItems.map((item)=> findListItems(item));
}

const findListItems = (itemLine) => {
    return itemLine.split(' ').filter((item) => item !== "");
}

const calculateTotalDistance = (leftList, rightList) => {
    leftList.sort((a, b) => parseInt(a) - parseInt(b));
    rightList.sort((a, b) => parseInt(a) - parseInt(b));

    let totalDistances = leftList.map((leftItem, index)=> {
        return Math.max(leftItem, rightList[index]) - Math.min(leftItem, rightList[index]);
    });

    const initialValue = 0;
    return totalDistances.reduce((acc, curr) =>
        acc + curr
    , initialValue);
}

const calculateSimilarity = (leftList, rightList) => {

    let similarityScores = leftList.map((leftItem) => {

        const matches = rightList.filter((item) => item === leftItem);
        return parseInt(leftItem) * matches.length;
    })

    const initialValue = 0;
    return similarityScores.reduce((acc, curr) => acc + curr, initialValue);
}


await assignment1Start();