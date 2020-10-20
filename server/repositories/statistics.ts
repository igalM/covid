import { Service } from "typedi";
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import * as moment from 'moment';
import axios from 'axios';
import { TotalStatisticItem, TotalStatisticHelper } from "../models/total.statistic";
import { DailyStatisticItem, DailyStatisticHelper } from "../models/daily.statistic";
import { ApiDateObject } from "../models/api.date.object";

@Service()
export class StatisticsRepository {

    async getTotal(): Promise<TotalStatisticItem[]> {
        const totalStatistics: TotalStatisticItem[] = TotalStatisticHelper.getAll();
        const url = process.env.YNET_URI;
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url);
        const content = await page.content();
        cheerio('.main > .flex-con > .flex-box > .number', content)
            .each((i, el) => {
                let num = parseFloat(cheerio(el).text().replace(/,/g, ''));
                totalStatistics[i].value = num;
            });
        await page.close();
        browser.close();
        return Promise.resolve(totalStatistics);
    }

    async getNewDailyByRange(): Promise<DailyStatisticItem[]> {
        const dailyStatistics: DailyStatisticItem[] = DailyStatisticHelper.getAll();
        const endDate = moment().subtract(1, 'days').format('YYYY/MM/DD');
        const startDate = moment().subtract(9, 'days').format('YYYY/MM/DD');
        const url = `${process.env.COVID_URI_1}${startDate}&date_to=${endDate}`;
        const { data } = await axios.get(url);
        for (const dateObj of Object.values(data.dates as ApiDateObject)) {
            const value: ApiDateObject = dateObj;
            const shortcut = value.countries.Israel;
            dailyStatistics[0].series.push({ name: shortcut.date, value: shortcut.today_new_confirmed });
            dailyStatistics[1].series.push({ name: shortcut.date, value: shortcut.today_new_recovered });
            dailyStatistics[2].series.push({ name: shortcut.date, value: shortcut.today_new_deaths });
        }
        return Promise.resolve(dailyStatistics);
    }

    async getTotalByRange(): Promise<DailyStatisticItem[]> {
        const totalDailyStatistics: DailyStatisticItem[] = DailyStatisticHelper.getAll();
        const endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const startDate = moment().subtract(9, 'days').format('YYYY-MM-DD');
        const url = `${process.env.COVID_URI_2}${startDate}&to=${endDate}`;
        const { data } = await axios.get(url);
        data.forEach((object: any) => {
            let date = moment(object.Date).format('YYYY-MM-DD');
            totalDailyStatistics[0].series.push({ name: date, value: object.Confirmed });
            totalDailyStatistics[1].series.push({ name: date, value: object.Recovered });
            totalDailyStatistics[2].series.push({ name: date, value: object.Deaths });
        });
        return Promise.resolve(totalDailyStatistics);
    }

    async runCron(): Promise<any[]> {
        return await Promise.all(
            [
                this.getTotal(),
                this.getNewDailyByRange(),
                this.getTotalByRange()
            ]);
    }

}