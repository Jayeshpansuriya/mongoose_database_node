import mongoose from "mongoose";

mongoose.set("debug", true)

//?step 1 to connect to the database
try {

    await mongoose.connect("mongodb://localhost:27017/mongoose_database", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
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
    createdAt: { type: Date, default: Date.now }
});

//?step 3 to create a model

const Users = mongoose.model("User", userSchema);

await Users.create({ name: "John Doe", email: "john@example.com", age: 30 });
await mongoose.connection.close();

