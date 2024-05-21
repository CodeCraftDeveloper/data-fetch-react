// src/App.js
import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

const App = () => {
  const [data, setData] = useState(null);
  const sampleID = "664afac3d495b03cdb1318a4"; // Provided document ID
  const realmAppId = "application-0-cocosmt"; // Provided Realm App ID

  useEffect(() => {
    const fetchData = async () => {
      const app = new Realm.App({ id: realmAppId });
      const credentials = Realm.Credentials.anonymous();

      try {
        const user = await app.logIn(credentials);
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongodb.db("ph-data").collection("values");
        const result = await collection.findOne({
          _id: new Realm.BSON.ObjectID(sampleID),
        });

        console.log("Fetched data:", result); // Debugging log
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sampleID, realmAppId]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{data.text}</h1>
    </div>
  );
};

export default App;
