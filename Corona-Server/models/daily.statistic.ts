export interface DailyStatisticItem {
    id: number;
    name: string;
    series: {
        name: string,
        value: number
    }[];
}

export class DailyStatisticHelper {
    public static getAll(): DailyStatisticItem[] {
        return [
            {
                id: 0,
                name: 'Confirmed Cases',
                series: []
            },
            {
                id: 1,
                name: 'Recovered',
                series: []
            },
            {
                id: 2,
                name: 'Deceased',
                series: []
            }
        ];
    }
}