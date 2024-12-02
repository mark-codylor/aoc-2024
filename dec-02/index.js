import * as fs from "node:fs";

export const assignment2Start = async () => {

    // Retrieve file
    const inputFile = loadInput();

    const reports = inputFile.replace("\r","").split("\n");

    const safeReports = reports.map(findListItems).filter((report)=>isReportSafe(report));

    console.log("Safe Reports", safeReports.length);

    const almostSafeReports = reports.map(findListItems).filter((report)=>isReportAlmostSafe(report));

    console.log("Almost Safe Reports", almostSafeReports.length);

}

const findListItems = (itemLine) => {
    return itemLine.split(' ').filter((item) => item !== "");
}

const isReportAlmostSafe = (scores) =>
{
    const reportVariations = [];
    for(let j=0; j<scores.length;j++)
    {
        reportVariations.push(scores.toSpliced(j, 1));
    }

    return isReportSafe(scores) || reportVariations.some(isReportSafe);
}

const isReportSafe= (scores) => {

    let increasing = false;

    for(let i=0; i< scores.length; i++)
    {
        if(i === 0)
        {
            increasing =  parseInt(scores[0]) < parseInt(scores[1]);
        }
        else
        {
            const lastScore = parseInt(scores[i]);
            const thisScore = parseInt(scores[i-1]);

            const variances = Math.max(lastScore, thisScore) - Math.min(lastScore, thisScore);
            if (variances <= 0 || variances > 3) {
                return false;
            }

            const nowincreasing = parseInt(scores[i - 1]) < parseInt(scores[i]);
            if (nowincreasing !== increasing) {
                return false;
            }

            if ((thisScore > lastScore && !increasing) && (thisScore < lastScore && increasing)) {
                return false;
            }
        }
    }

    return true;

}

const loadInput = ()=>
{
    const fileContents = fs.readFileSync("./input.txt", "utf8");
    return fileContents;
}

assignment2Start();