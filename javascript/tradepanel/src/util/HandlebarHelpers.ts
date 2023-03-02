import WidgetGlobals from "src/WidgetGlobals";

export default class HandlebarHelpers {
  public static registerHelpers() {
    WidgetGlobals.HandlebarsInstance.registerHelper(
      "perc",
      function (number: string) {
        return Math.round(parseFloat(number) * 10000) / 100 + "%";
      }
    );
    WidgetGlobals.HandlebarsInstance.registerHelper(
      "round",
      function (number: string) {
        return Math.round(parseFloat(number) * 100) / 100;
      }
    );

    WidgetGlobals.HandlebarsInstance.registerHelper(
      "round2",
      function (number: string) {
        return Math.round(parseFloat(number) * 10000) / 10000;
      }
    );
    WidgetGlobals.HandlebarsInstance.registerHelper(
      "classColor",
      function (number: number) {
        return number > 0 ? "green" : "red";
      }
    );
    WidgetGlobals.HandlebarsInstance.registerHelper(
      "dateTimeFormat",
      function (strDate: string) {
        let date = new Date(strDate);
        return date.toLocaleString();
      }
    );
    WidgetGlobals.HandlebarsInstance.registerHelper(
      "classByStatus",
      function (status: string) {
        return status == "QUEUED" || status == "APPROVAL_PENDING"
          ? ""
          : "hidden";
      }
    );
  }
}
