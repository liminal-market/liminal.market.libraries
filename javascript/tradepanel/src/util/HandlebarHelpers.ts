export default class HandlebarHelpers {

    public static registerHelpers() {
        Handlebars.registerHelper('perc', function (number: string) {
            return Math.round(parseFloat(number) * 10000) / 100 + '%';
        });
        Handlebars.registerHelper('round', function (number: string) {
            return Math.round(parseFloat(number) * 100) / 100;
        });

        Handlebars.registerHelper('round2', function (number: string) {
            return Math.round(parseFloat(number) * 10000) / 10000;
        });
        Handlebars.registerHelper('classColor', function (number: number) {
            return (number > 0) ? "green" : "red";
        });
        Handlebars.registerHelper('dateTimeFormat', function (strDate: string) {
            let date = new Date(strDate);
            return date.toLocaleString()
        });
        Handlebars.registerHelper('classByStatus', function (status: string) {
            return (status == 'QUEUED' || status == 'APPROVAL_PENDING') ? '' : 'hidden'
        });
    }
}