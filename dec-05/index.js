import * as fs from "node:fs";


export const assignment5Start = async () => {

    // Retrieve file
    const inputFile = loadInput();

    const rows = inputFile.split("\n");

    const pairs = [];
    const instructions = [];

    rows.forEach(row => {

        if(row.includes("|"))
        {
            pairs.push({from: row.split("|")[0], to: row.split("|")[1]});
        }
        else if(row.includes(","))
        {
            instructions.push(row.split(","));
        }
        return row.split("")
    });

    const correctInstructions = instructions.filter(instruction => isInstructionCorrect(instruction, pairs));
    console.log("How many correct?", correctInstructions.length);

    let totals = correctInstructions.reduce((totals, instruction) => totals + parseInt(instruction[(instruction.length -1)/2]),0);
    console.log("Totals",totals);

    const incorrectInstructions = instructions.filter(instruction => !isInstructionCorrect(instruction, pairs));

    const corrected = incorrectInstructions.map(instruction => correctInstruction(instruction,pairs));
    console.log("Correct",corrected);

    let correctedTotals = corrected.reduce((totals, instruction) => totals + parseInt(instruction[(instruction.length -1)/2]),0);
    console.log("Corrected Totals:",correctedTotals);

}

function correctInstruction(instruction, pairs)
{
    for(let i = 0; i < instruction.length; i++)
    {
        let okWithAll = true;
        for(let j = 0; j < instruction.length; j++)
        {
            if(!checkTwoNumbers(instruction[i], instruction[j], pairs))
            {
                okWithAll = false;
                break;
            }
        }

        if(okWithAll)
        {
            let clonedArray = [...instruction];
            clonedArray.splice(i,1);
            return [instruction[i], ...correctInstruction(clonedArray, pairs)];
        }
    }

    return [];
}

function isInstructionCorrect(instruction,pairs)
{
    let initialNumber = instruction[0];
    instruction = instruction.slice(1);
    while(instruction.length)
    {

        for(let i = 0; i < instruction.length; i++)
        {
            let twoNumberCheck = checkTwoNumbers(initialNumber, instruction[i], pairs);
            if(!twoNumberCheck)
            {
                return false;
            }

        }

        initialNumber = instruction[0];
        instruction = instruction.slice(1);
    }

    return true;
}

function checkTwoNumbers(number1, number2, pairs)
{
    return !pairs.some(pair => pair.from === number2 && pair.to === number1);
}



const loadInput = ()=>
{
    return fs.readFileSync("./input.txt", "utf8");
}

assignment5Start();