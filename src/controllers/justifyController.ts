import justifyLine from "@/utils/justifyLine";
import { Request, Response } from "express";

export default {
  async justifyText(req: Request, res: Response) {
    const text = req.body;
    const words = text.split(" ");
    const maxLineLength = 80;

    let line = "";
    let justifiedText = "";

    for (const word of words) {
      const tempWord = word.replace(/\n\n/g, '<DOUBLE_NEWLINE>');
      const cleanedWord = tempWord.replace(/\n/g, '');
      const finalWord = cleanedWord.replace(/<DOUBLE_NEWLINE>/g, '\n');

      if (finalWord.length + line.length + 1 < maxLineLength) {
        line += (line ? " " : "") + finalWord;
        continue;
      } else {
        justifiedText += justifyLine(line, maxLineLength) + "\n";
        line = finalWord;
      }
    }

    justifiedText += justifyLine(line, maxLineLength) + "\n";

    res.status(200).send(justifiedText);
  },
};
