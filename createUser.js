const { MongoClient } = require('mongodb');
const { hashPassword } = require('./server/services/password-service');
const { MONGO_URI, DB_NAME } = require('./constants');

const username = 'nextU';
const contraseña = 'password';

MongoClient.connect(MONGO_URI, function(err, client) {
    if(err) {
        console.log(err);
        return;
    }
    usersCollection = client.db(DB_NAME).collection('users');
    const { password, salt } =  hashPassword(contraseña);
    usersCollection.insertOne({ username, password, salt }, (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log('user created successfully');
        }
    });
    client.close();
});