import * as fs from "node:fs";

export const assignment3Start = async () => {

    // Retrieve file
    const inputFile = loadInput();

    const validNumbers = [];
    let shouldAdd = true;

    for (let i = 0; i < inputFile.length; i++)
    {
        if(inputFile.slice(i,i+4) === "mul(")
        {
            const result = getMultiplyParams(inputFile.slice(i+4));
            if(result != null && shouldAdd)
            {
                validNumbers.push(result);
            }
        }
        else if(inputFile.slice(i,i+7) === "don't()")
        {
            shouldAdd = false;
        }
        else if(inputFile.slice(i,i+4) === "do()")
        {
            shouldAdd = true;
        }
    }

    const initialValue = 0;
    const theSum = validNumbers.reduce(
        (accumulator, currentValue) => accumulator + (parseInt(currentValue[0]) * parseInt(currentValue[1])),
        initialValue,
    );

    console.log("Total:", theSum);
}

const loadInput = ()=>
{
    const fileContents = fs.readFileSync("./input.txt", "utf8");
    return fileContents;
}

function getMultiplyParams(inputStr)
{
    let firstNumber = null;
    let secondNumber = null;

    for(let j=0;j<inputStr.length;j++)
    {
        const thisCharacter = inputStr.slice(j,j+1);

        if(firstNumber == null)
        {
            if(isNaN(thisCharacter))
            {
                return null;
            }
            firstNumber = thisCharacter;
        }
        else if(secondNumber == null)
        {
            if(!isNaN(thisCharacter))
            {
                firstNumber += thisCharacter;
            }
            else
            {
                if(thisCharacter === ",")
                {
                    secondNumber = "";
                }
                else
                {
                    return null;
                }
            }
        }
        else
        {
            if(!isNaN(thisCharacter))
            {
                secondNumber += thisCharacter;
            }
            else if(thisCharacter === ")")
            {
                return [parseInt(firstNumber), parseInt(secondNumber)];
            }
            else
            {
                return null;
            }
        }
    }
}


assignment3Start();