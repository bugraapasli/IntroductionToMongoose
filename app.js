//require the Mongoose package (after running >npm i mongoose in Hyper to install it)
const { log } = require('console');
const mongoose = require('mongoose');
 
//connect to MongoDB by specifying port to access MongoDB server
main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/FruitsDB');
  }
 
//create a SCHEMA that sets out the fields each document will have and their datatypes
const fruitSchema = new mongoose.Schema ({
	name: {
        type: String,
        required: [true, "Please check your data entry, no name specified."]
    },
	rating: {
        type: Number,
        min: 1,
        max: 10
    },
	review: String
});
 
//create a MODEL
const Fruit = new mongoose.model ("Fruit", fruitSchema)

const banana = new Fruit ({ name: 'banana', rating: 8, review: "It is good!" });
const kiwi = new Fruit ({ name: 'kiwi', rating: 7, review: "It is good!" });
const orange = new Fruit ({ name: 'orange', rating: 6, review: "It is good!" });
const peach = new Fruit ({name: 'peach', rating: 5});

 // peach.save();
Fruit.insertMany([banana,kiwi,orange]).then(function () {
    console.log("Successfully saved defult items to DB");               //insertmany using
  }).catch(function (err) {
    console.log(err);
  });

const fruit = new Fruit ({ name: 'banana', rating: 8, review: "It is good!" });
// fruit.save();



Fruit.find().then((fruits)=>{
    // console.log(fruits);
    fruits.forEach((fruit)=>{
        console.log(fruit.name);
    });

    mongoose.connection.close();

}).catch((err)=>{                               //reading
    console.log(err);
});




Fruit.updateOne({_id: "643f31d0c45871f69c17aecc"}, {review: "Wonderful"}).then(()=>{           //updating
    console.log("Succesfully updated");
}).catch((err)=>{
    console.log(err);
});




Fruit.deleteOne({name:"peach"}).then(()=>{
    console.log("Suc deleted");                                      //deleting
}).catch((err)=>{ 
    console.log(err);
});



const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit!"
});

// pineapple.save();

const strawberry = new Fruit({
    name: "Strawberry",
    rating: 10,
    review: "Beautiful!"
});

// strawberry.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema          //establishing relationship between two collections.
});

const Person = new mongoose.model ("Person", peopleSchema);

const person = new Person ({ name: "amy", age: 37, favFruit: pineapple});

Person.updateOne({_id: "643dd60d8f12ee2875b88398"}, {favFruit: strawberry}).then(()=>{
    console.log("Suc updated!");
}).catch((err)=>{                                      // updating first data's fav fruit. Establishing relationship between two collections.
    console.log(err);
});

//person.save();

