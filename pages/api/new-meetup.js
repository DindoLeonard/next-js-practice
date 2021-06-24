import { MongoClient } from "mongodb";

// api/new-meetup
// POST /api/new-meetup

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const dbPassword = process.env.DB_PASS;

    try {
      const client = await MongoClient.connect(
        `mongodb://leonard:${dbPassword}@cluster0-shard-00-00.qutsm.mongodb.net:27017,cluster0-shard-00-01.qutsm.mongodb.net:27017,cluster0-shard-00-02.qutsm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-smk727-shard-0&authSource=admin&retryWrites=true&w=majority`
      );

      console.log("CLIENT***", client);

      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      console.log("RESULT***", result);

      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
