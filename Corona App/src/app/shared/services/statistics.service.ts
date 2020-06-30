import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TotalStatisticDto } from '../models/total.statistic.dto';
import { DailyStatisticDto } from '../models/daily.statistic.dto';

@Injectable()
export class StatisticsService {

    private readonly api: string = environment.server.api;
    private readonly route: string = 'statistics';

    constructor(
        private readonly http: HttpClient
    ) { }

    public getTotal(): Observable<TotalStatisticDto[]> {
        return <Observable<TotalStatisticDto[]>>this.http.get(this.api + this.route + '/total');
    }

    public getDaily(): Observable<DailyStatisticDto[]> {
        return <Observable<DailyStatisticDto[]>>this.http.get(this.api + this.route + '/dailyByRange');
    }

    public getTotalDaily(): Observable<DailyStatisticDto[]> {
        return <Observable<DailyStatisticDto[]>>this.http.get(this.api + this.route + '/totalByRange');
    }

}