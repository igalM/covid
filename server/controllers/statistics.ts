import { JsonController, Get, UseBefore } from "routing-controllers";
import * as compression from 'compression';
import { StatisticsRepository } from "../repositories/statistics";
import { TotalStatisticItem } from "../models/total.statistic";
import { DailyStatisticItem } from "../models/daily.statistic";
import { redisSet, redisGet } from "../app";

@UseBefore(compression())
@JsonController('/statistics')
export class StudentsController {
    constructor(
        private readonly statisticsRepository: StatisticsRepository
    ) { }

    @Get('/total')
    async getDataFromYnet(): Promise<TotalStatisticItem[]> {
        const fromCache = await redisGet('total');
        if (fromCache) return JSON.parse(fromCache);
        return await this.statisticsRepository.getTotal();
    }

    @Get('/dailyByRange')
    async getDailyStatistics(): Promise<DailyStatisticItem[]> {
        const fromCache = await redisGet('dailyByRange');
        if (fromCache) return JSON.parse(fromCache);
        return await this.statisticsRepository.getNewDailyByRange();
    }

    @Get('/totalByRange')
    async getTotalStatistics(): Promise<DailyStatisticItem[]> {
        const fromCache = await redisGet('totalByRange');
        if (fromCache) return JSON.parse(fromCache);
        return await this.statisticsRepository.getTotalByRange();
    }


    @Get('/runCron')
    async runCronJob() {
        const data = await this.statisticsRepository.runCron();
        redisSet('total', JSON.stringify(data[0]));
        redisSet('dailyByRange', JSON.stringify(data[1]));
        redisSet('totalByRange', JSON.stringify(data[2]));
        console.log('Cached Data!');
        return 'Cached Data!';
    }

}