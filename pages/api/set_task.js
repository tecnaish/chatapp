import { connectMongoDb } from "@/libs/MongoConnect";
import Username from "@/models/TaskModel";

export default async function handler(req, res) {
    
  if (req.method !== "POST") {
   
   res.status(405).send({ msg: "only POST requests are allowed" });
    return;
   }

  const { username, secret } = req.body;

  try {
    await connectMongoDb();
    Username.create({ username, secret }).then((data) => {
      console.log(data);
       res.status(201).send(data);
   });
  } catch (err) {
     console.log(err);
    res.status(400).send({err,msg:"something went wrong"});
 }
}
