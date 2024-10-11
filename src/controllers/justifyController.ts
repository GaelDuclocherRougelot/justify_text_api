import justifyLine from "@/utils/justifyLine";
import { Request, Response } from "express";

export default {
  async justifyText(req: Request, res: Response) {
    const text = req.body;
    const maxLineLength = 80;
    const paragraphs = text.split(/\n\n/);

    let justifiedText = "";

    paragraphs.forEach((paragraph: string) => {
      const words = paragraph.split(/\s+/);
      let line = "";

      words.forEach((word) => {
        const tempWord = word.replace(/\n\n/g, "<DOUBLE_NEWLINE>");
        const cleanedWord = tempWord.replace(/\n/g, "");
        const finalWord = cleanedWord.replace(/<DOUBLE_NEWLINE>/g, "\n");

        if (line.length + finalWord.length + 1 > maxLineLength) {
          if (line.trim()) {
            justifiedText += justifyLine(line.trim(), maxLineLength) + "\n";
          }
          line = finalWord;
        } else {
          line += (line ? " " : "") + finalWord;
        }
      });

      if (line) {
        justifiedText += justifyLine(line.trim(), maxLineLength) + "\n";
      }

      justifiedText += "\n";
    });

    justifiedText = justifiedText.replace(/\n{2,}/g, '\n');
    res.status(200).send(justifiedText.trim());
  },
};
