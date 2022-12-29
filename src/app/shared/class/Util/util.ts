export class Util {
    /**
     * getCurrentWeek
     * @returns number
     * @description get the number of the current week 
     */
    public static getCurrentWeek():number {

        let currentdate = new Date();
        let oneJan = new Date(currentdate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor((currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
        return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    }

    public static getWeek(date: Date):number {

        let oneJan = new Date(date.getFullYear(), 0, 1);
        let numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
        return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    }

    /**
     * ToDate
     * @param string: string 
     * @returns new Date()
     * @description convert from string to Date
     */
    public static ToDate(string: string): Date {
        return new Date(string);
    }

    /**
     * 
     * @param date 
     * @param days 
     * @returns 
     */
    public static addDaysToDate(date:Date, days:number){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
}
