import mongoose from "mongoose";

mongoose.set("debug", true)

//?step 1 to connect to the database
try {

    await mongoose.connect("mongodb://localhost:27017/mongoose_middleware", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

} catch (error) {

    console.error(error);
    process.exit();
}

//?step 2 to create a schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 5, max: 120 },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
},{
    timestamps: true,
});


//we will use middleware 
userSchema.pre(["updateOne","updateMany","findOneAndUpdate"],function(next){
     this.set({ updatedAt: Date.now() });
     next();
})

//?step 3 to create a model 
const Users = mongoose.model("User", userSchema);





//step 4 to create a middleware
// await Users.create({ name: "John Doe", email: "john@example.com", age: 100 });

await Users.updateOne({ email: "john@example.com"},{$set:{age:100}});


 

await mongoose.connection.close();
