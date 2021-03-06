import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.patch((req, res) => {
  if (!req.user) return res.status(401).send("You need to be logged in.");
  const {  balance } = req.body;
//   let params = {name, bio, balance}
//   if (bio === undefined) 
//   params = { name, balance };
  return req.db
    .collection("users")
    .updateOne({ _id: req.user._id }, { $set: {balance} })
    .then(() =>
      res.json({
        message: "Balance updated successfully",
        data: {  balance }
      })
    )
    .catch(error =>
      res.send({
        status: "error",
        message: error.toString()
      })
    );
});

export default handler;
