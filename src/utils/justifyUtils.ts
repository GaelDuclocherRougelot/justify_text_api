export function cleanWord(word: string): string {
  const tempWord = word.replace(/\n\n/g, "<DOUBLE_NEWLINE>");
  const cleanedWord = tempWord.replace(/\n/g, "");
  return cleanedWord.replace(/<DOUBLE_NEWLINE>/g, "\n");
}

export function removeExtraNewlines(text: string): string {
  return text.replace(/\n{2,}/g, '\n');
}

export function justifyParagraph(paragraph: string, maxLineLength: number): string {
  const words = paragraph.split(/\s+/);
  let line = "";
  let justifiedParagraph = "";

  words.forEach((word) => {
    const finalWord = cleanWord(word);

    if (line.length + finalWord.length + 1 > maxLineLength) {
      if (line.trim()) {
        justifiedParagraph += justifyLine(line.trim(), maxLineLength) + "\n";
      }
      line = finalWord;
    } else {
      line += (line ? " " : "") + finalWord;
    }
  });

  if (line.trim()) {
    justifiedParagraph += justifyLine(line.trim(), maxLineLength) + "\n";
  }

  return justifiedParagraph.trim();
}

export function justifyLine(line: string, maxLineLength: number) {
  const lineWords = line.split(" ");
  const extraSpaces = maxLineLength - line.length;

  if (lineWords.length === 1) return line;

  let i = 0;

  while (i < extraSpaces) {
    lineWords[i % (lineWords.length - 1)] += " ";
    i++;
  }

  return lineWords.join(" ");
}
