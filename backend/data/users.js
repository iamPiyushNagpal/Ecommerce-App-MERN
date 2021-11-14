import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Piyush',
        email: 'piyush@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Aman',
        email: 'aman@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;