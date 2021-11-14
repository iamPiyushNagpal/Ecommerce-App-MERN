import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log(`Connected to Database`))
    .catch((e) => console.log(e.message));