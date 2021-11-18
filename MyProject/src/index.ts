import "reflect-metadata";
import {User} from "./entity/User";

import * as lambda from 'aws-lambda'
import { Database} from './dbConnection';
import { Connection } from "typeorm";



export const handler = async (event) => {
    // database connection
    const database = new Database();
    const dbConn: Connection = await database.getConnection();
    const users = await dbConn.getRepository(User);

    const requestBody = JSON.parse(event.body);
    const {userId} = requestBody;
    const userData = users.findOne({user_id: userId});

    console.log('User Data', JSON.stringify(userData, null, 2));
}