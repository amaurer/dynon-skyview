
import fs from "fs"
import path from "path"


(async () => {

  
  const bigFilepath = path.resolve("./Mooney-1964-M20D.source");
  const checklistSource = await fs.promises.readFile(bigFilepath)
  const checklistString = checklistSource.toString("utf-8")
  const lines = checklistString.split("\n")

  const writeRows = []
  // Starts at 2, blank line after title
  let checklistNum = -1
  let lineNum = 2
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Remove Comments
    if(line.substr(0,1) === "#") continue;

    // Blank
    if(line.charCodeAt(0) === 13){
      writeRows.push(`\n`)

    // Title
    } else if(i !== 0 && lines[i-1].charCodeAt(0) === 13){
      ++checklistNum
      writeRows.push(`CHKLST${checklistNum}.TITLE, ${line}\n`)
      writeRows.push(`CHKLST${checklistNum}.LINE1,\n`)
      lineNum = 2

    // Line
    } else {
      writeRows.push(`CHKLST${checklistNum}.LINE${lineNum}, ${line}\n`)
      lineNum++
      
    }
    
  }

  // console.log(writeRows.join(""))
  await fs.promises.writeFile("./Checklist-Mooney-1964-M20D.txt", writeRows.join(""))

  
})()

