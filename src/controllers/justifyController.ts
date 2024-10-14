import { removeExtraNewlines, justifyParagraph } from "@/utils/justifyUtils";
import { Request, Response } from "express";

export default {
  async justifyText(req: Request, res: Response) {
    const text = req.body;
    const maxLineLength = 80;

    const paragraphs = text.split(/\n\n/);
    let justifiedText = paragraphs.map((paragraph: string) => {
      return justifyParagraph(paragraph, maxLineLength);
    }).join("\n");

    // Clean up any redundant newlines or blank spaces
    justifiedText = removeExtraNewlines(justifiedText);

    res.status(200).send(justifiedText.trim());
  },
};
