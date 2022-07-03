import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiResponse, NextApiRequest } from "next";
import { withSession, contractAddress } from "./utils";
import { NftMetadata } from "@_types/nft";

export default withSession(async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { body } = req;
      const nft = body.nft as NftMetadata;

      if (!nft.name || !nft.description || !nft.attributes) {
        res.status(422).send({ message: "Some of the form data are missing!" });
      }

      res.status(200).send({ message: "Nft has been created!" });
    } catch {
      res.status(422).send({
        message: "Cannot create NFT",
      });
    }
  } else if (req.method === "GET") {
    try {
      const message = {
        contractAddress,
        id: uuidv4(),
      };
      req.session.set("message-session", message);
      await req.session.save();

      console.log(req.session.get("message-session"));

      res.json({ message });
      //
    } catch (e: any) {
      res.status(422).send({
        message: "Cannot generate a message!",
      });
    }
  } else {
    res.status(405).json({
      message: "Invalid api route.",
    });
  }
});
