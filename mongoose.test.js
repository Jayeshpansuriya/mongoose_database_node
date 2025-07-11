import mongoose from "mongoose";

//?step 1 to connect to the database
try {

    await mongoose.connect("mongodb://localhost:27017/mongoose_database", {
        useNewUrlParser: true,
        useUnifiedTopology: true
        mongoose.set("debug", true);
    });

} catch (error) {

    console.error(error);
    process.exit();
}