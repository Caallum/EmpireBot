// import { Collection, MongoClient } from "mongodb";
// import "dotenv/config"
// const uri = process.env.MONGODB_URI

// const client = new MongoClient(uri!);

// var WorkspaceCollection: undefined | Collection
// var UsersCollection: undefined | Collection

// export async function GetProfile(SearchQuery: any) {
//     if (UsersCollection) {
//         var Document = await UsersCollection.findOne(SearchQuery)

//         return Document
//     }
// }

// export async function UpdateProfile(SearchQuery: any, Value: any, Ptd: any) {
//     if(UsersCollection) {
//         var Document = await UsersCollection.findOne(SearchQuery);

//         if(Document) {
//             UsersCollection.updateOne(SearchQuery, {
//                 $set: {
//                     [`${Value}`]: Ptd
//                 }
//             },
//             {
//                 upsert: false
//             }
//             ).then(() => {}).catch(() => {})
//         }
//     }
// }

// export async function GetWorkspace(SearchQuery: any) {
//     if (WorkspaceCollection) {
//         var Document = await WorkspaceCollection.findOne(SearchQuery)

//         return Document
//     }
// }

// export async function InitialiseDB() {
//     try {
//         await client.connect();
//         var DataBase = client.db("GameSync")
//         var UserDatabase = client.db("test")

//         var Users = UserDatabase.collection("users")
//         var Workspaces = DataBase.collection("Workspaces")

//         WorkspaceCollection = Workspaces
//         UsersCollection = Users

//         console.log("Connected to mongo correctly.")
//     } catch (e) {
//         await client.close()
//     }
// }