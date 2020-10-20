import * as cron from 'node-cron';
import axios from 'axios';

cron.schedule("0 */6 * * *", () => {
    console.log('started cron job');
    axios.get(`${process.env.CRON_URI}`);
});