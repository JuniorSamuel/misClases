export class Util {

    /**
     * getCurrentWeek
     * 
     */
    public static getCurrentWeek():number {

        let currentdate = new Date();
        let oneJan = new Date(currentdate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor((currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
        return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    }

    /**
     * ToDate
     */
    public static ToDate(string: string): Date {
        return new Date(string);
    }

    public static addDaysToDate(date:Date, days:number){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
}