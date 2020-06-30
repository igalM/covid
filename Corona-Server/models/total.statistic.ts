export interface TotalStatisticItem {
    id: number;
    name: string;
    value: number;
}

export class TotalStatisticHelper {
    public static getAll(): TotalStatisticItem[] {
        return [
            {
                id: 0,
                name: 'Confirmed Cases',
                value: null
            },
            {
                id: 1,
                name: 'Currently Sick',
                value: null
            },
            {
                id: 2,
                name: 'Critical Condition',
                value: null
            },
            {
                id: 3,
                name: 'Ventilated',
                value: null
            },
            {
                id: 4,
                name: 'Deceased In Israel',
                value: null
            },
            {
                id: 5,
                name: 'Recovered',
                value: null
            }
        ];
    }
}