import './config/env.js';
import users from './data/users.js';
import products from './data/products.js';
import userModel from './models/userModel.js';
import productModel from './models/productModel.js';
import orderModel from './models/orderModel.js';
import './database/db.js';

const importData = async () => {
    try {
        await orderModel.deleteMany()
        await productModel.deleteMany()
        await userModel.deleteMany()

        const createdUsers = await userModel.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        await productModel.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await orderModel.deleteMany()
        await productModel.deleteMany()
        await userModel.deleteMany()

        console.log(`Data Destroyed!`)
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}