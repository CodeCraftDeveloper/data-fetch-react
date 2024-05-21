import * as Realm from "realm-web";

const app = new Realm.App({ id: "your-realm-app-id" });

async function loginAnonymous() {
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
    return null;
  }
}

async function fetchDocumentById(id) {
  const user = await loginAnonymous();
  if (user) {
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongodb.db("sample_mflix").collection("movies");
    try {
      const document = await collection.findOne({
        _id: new Realm.BSON.ObjectId(id),
      });
      return document;
    } catch (err) {
      console.error("Failed to fetch document", err);
      return null;
    }
  }
  return null;
}

export { app, loginAnonymous, fetchDocumentById };
