import {MongoClient} from 'mongodb';

const client =new MongoClient("mongodb://localhost:27017");

async function run(){
    await client.connect();
    const db=client.db("practiceDB")
    const users=db.collection("users")

// insertOne
//    await users.insertOne({name: "Aman",
//   age: 22,
//   city: "Delhi",})

// insertMany
// await users.insertMany([{ name: "Aman", age: 22, city: "Delhi" },
//     { name: "Rahul", age: 25, city: "Mumbai" },
//     { name: "Neha", age: 19, city: "Pune" }])
// // findOne

// const data=await users.findOne({name:"Neha"})
// console.log(data)

// await users.updateOne({name: 'Rahul'},{$set:{age:100}})

// await users.updateMany({name: 'Rahul'},{$set:{age:101}})

//  await users.deleteOne({ name: "Rahul" });

// await users.deleteMany({ city: "Pune" });
// const data= await users.find({age :{$gt:20}}).toArray()
// console.log(data)

//     const data= await users.find({age :{$lt:20}}).toArray()
//     console.log(data)

//    const data = await users.find({
//   city: { $in: ["Delhi", "Mumbai"] }
// }).toArray();

// console.log(data);

//  const data = await users.find({
//   city: { $nin: ["Delhi", "Mumbai"] }
// }).toArray();

// const data= await users.find({$or:[{age:{$gt:20}},{city:"delhi"}]}).toArray()

// console.log(data);

// const data = await users.find({
//   $and: [
//     { age: { $gt: 20 } },
//     { city: "Delhi" }
//   ]
// }).toArray();

// console.log(data);

// // Find all
// const allUsers=await users.find().toArray();
//   console.log("all users ", allUsers)


// advance queries
//1
const data1 = await users.find({
  city: { $in: ["Delhi", "Mumbai"] },
  age: { $gte: 20 }
})
.sort({ age: -1 })
.limit(3)
.toArray();

//2
const data2 = await users.find({
  $and: [
    { age: { $gt: 20 } },
    {
      $or: [
        { city: "Delhi" },
        { age: { $lt: 30 } }
      ]
    }
  ]
}).toArray();

//3
const data3 = await users.find(
  { age: { $gt: 18 } },
  { projection: { name: 1, age: 1, _id: 0 } }
).toArray();

//4
const data4 = await users.aggregate([
  {
    $group: {
      _id: "$city",
      totalUsers: { $sum: 1 }
    }
  }
]).toArray();

//5
const data5 = await users.find({
  name: { $regex: "^A" }
}).toArray();

console.log(data1);
console.log(data2);
console.log(data3);
console.log(data4);
console.log(data5);
}
run()

