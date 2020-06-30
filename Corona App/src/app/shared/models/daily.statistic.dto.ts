export class DailyStatisticDto {
    id: number;
    name: string;
    series: {
        name: string,
        value: number
    }[];
}