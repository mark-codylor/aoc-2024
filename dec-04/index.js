import * as fs from "node:fs";


export const assignment4Start = async () => {

    // Retrieve file
    const inputFile = loadInput();

    const rows = inputFile.split("\r\n");
    const grid = rows.map(row => {

        return row.split("")

    });

    // Count xmas
    let foundCount = 0;
    for(let i=0;i<grid.length;i++)
    {
        for(let j=0;j<grid[i].length;j++)
        {
            if(grid[i][j] === "X")
            {
                const permutations = buildPermutations(grid, i, j, "XMAS");
                foundCount += permutations.filter((item)=> item === "XMAS").length
            }
        }
    }

    // count mas
    let masXCount = 0;
    for(let i=0;i<grid.length;i++)
    {
        for(let j=0;j<grid[i].length;j++)
        {
            const masFind = buildMasPermutations(grid, i, j, "MAS");
            if(masFind.filter((item)=> item === "MAS").length === 2)
                masXCount++;
        }
    }

    console.log("Count", foundCount);
    console.log("Mas Count", masXCount);

}

function buildMasPermutations(grid, i, j, word) {
    return [
        buildWord(grid, word, i-1, j-1, (i)=>++i, (j)=>++j),
        buildWord(grid, word, i+1, j-1, (i)=>--i, (j)=>++j),
        buildWord(grid, word, i-1, j+1, (i)=>++i, (j)=>--j),
        buildWord(grid, word, i+1, j+1, (i)=>--i, (j)=>--j),
    ]
}

function buildPermutations(grid, i, j, word, diagonal = false) {

    if(diagonal)
    {
        return [
            buildWord(grid, word, i, j, (i)=>++i, (j)=>++j),
            buildWord(grid, word, i, j, (i)=>--i, (j)=>++j),
            buildWord(grid, word, i, j, (i)=>++i, (j)=>--j),
            buildWord(grid, word, i, j, (i)=>--i, (j)=>--j),
        ]
    }

    return [
        buildWord(grid, word, i, j, (i)=>++i, (j)=>++j),
        buildWord(grid, word, i, j, (i)=>i, (j)=>++j),
        buildWord(grid, word, i, j, (i)=>--i, (j)=>++j),
        buildWord(grid, word, i, j, (i)=>++i, (j)=>--j),
        buildWord(grid, word, i, j, (i)=>i, (j)=>--j),
        buildWord(grid, word, i, j, (i)=>--i, (j)=>--j),
        buildWord(grid, word, i, j, (i)=>++i, (j)=>j),
        buildWord(grid, word, i, j, (i)=>--i, (j)=>j),
    ]
}

function buildWord(grid, word, i, j, iDirection, jDirection) {

    let newWord = "";

    while(grid[i] && grid[i][j] && newWord.length < word.length)
    {
        newWord = newWord + grid[i][j];

        i = iDirection(i);
        j = jDirection(j);

    }
    return newWord;
}



const loadInput = ()=>
{
    const fileContents = fs.readFileSync("./input.txt", "utf8");
    return fileContents;
}

assignment4Start();