import * as fs from "node:fs";


export const assignment7Start = async () => {

    // Retrieve file
    const inputFile = loadInput();

    const rows = inputFile.split("\n");
    const formulas = rows.map(row => {

        let rowSplit = row.split(": ");
        let rowTotal = rowSplit[0];
        let rowPossibles = rowSplit[1].split(" ");
        return [rowTotal, rowPossibles];
    });

    let total = 0;

    formulas.forEach(formula => {

        let firstNumber = parseInt(formula[1][0]);
        let newPossibles = formula[1].slice(1);

        if(addOrMultiply(parseInt(formula[0]), firstNumber, newPossibles)) {

            total += parseInt(formula[0]);
        }
    })

    console.log("Total",total);
}

function addOrMultiply(rowTotal, soFar, rowPossibles) {

    let thisNumber = parseInt(rowPossibles[0]);

    let newPossibles = rowPossibles.slice(1);

    let newTotalA = soFar * thisNumber;
    let newTotalB = soFar + thisNumber;
    let newTotalC = parseInt("" + soFar + thisNumber);

    if (newPossibles.length === 0)
    {
        if(newTotalA === rowTotal)
            return true;

        if(newTotalB === rowTotal)
            return true;

        if(newTotalC === rowTotal)
            return true;

        return false;
    }

    return addOrMultiply(rowTotal, newTotalA, newPossibles) || addOrMultiply(rowTotal, newTotalB, newPossibles) || addOrMultiply(rowTotal, newTotalC, newPossibles);

}


const loadInput = ()=>
{
    return fs.readFileSync("./input.txt", "utf8");
}

assignment7Start();