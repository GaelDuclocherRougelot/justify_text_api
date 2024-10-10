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
      if (word.length + line.length + 1 < maxLineLength) {
        line += (line ? " " : "") + word.replace(/\n/g, "");
        continue;
      } else {
        justifiedText += justifyLine(line, maxLineLength) + "\n";
        line = word;
      }
    }

    justifiedText += justifyLine(line, maxLineLength) + "\n";

    res.status(200).send(justifiedText);
  },
};
