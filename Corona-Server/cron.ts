import * as cron from 'node-cron';
import axios from 'axios';

cron.schedule("*/20 * * * *", () => {
    console.log('started cron job');
    axios.get('https://api-covid-il.herokuapp.com/statistics/runCron');
})