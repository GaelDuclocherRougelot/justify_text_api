export default function justifyLine(line: string, maxLineLength: number) {
  const lineWords = line.split(" ");
  const extraSpaces = maxLineLength - line.length;
  
  if (lineWords.length === 1) return line;

  console.log(lineWords);
  

  let i = 0;

  while (i < extraSpaces) {    
    lineWords[i % (lineWords.length - 1)] += " ";
    i++;
  }

  return lineWords.join(" ");
}
