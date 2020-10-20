import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import * as dotenv from 'dotenv';
import * as redis from 'redis';

import './cron';
dotenv.config();

const { promisify } = require("util");
const client = redis.createClient(process.env.REDIS_URI, { password: process.env.REDIS_PASS });

client.on('connect', () => {
    console.log('Connected to redis server');
})
client.on("error", function (error) {
    console.error(error);
});

export const redisSet = promisify(client.set).bind(client);
export const redisGet = promisify(client.get).bind(client);


useContainer(Container);

const app = createExpressServer({
    cors: true,
    controllers: [__dirname + "/controllers/*.js"],
    classTransformer: false
});

const port = process.env.PORT || 3000;
app.listen(port);

