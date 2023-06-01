import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";

function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf); //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}

function formatToXlsxDate(date) {
  return moment(date).local().format("YYYY/MM/DD HH:mm:ss");
}
export default class XlsxService {
  static headers = [
    "Название дефекта",
    "Дата поломки",
    "Ответственные",
    "Материалы",
    "Инвентарные номера материалов",
    "Решена",
    "Дата решения",
  ];
  static downloadXlsx(defects) {
    const wb = this.createBook("Неисправности");

    this.generatePageByHeaderAndItems(wb, {
      items: defects,
      name: "Неисправности",
      headers: this.headers,
      getter: (item, i) => this.getRow(item, i),
    });

    return this.downloadSheets(wb);
  }

  static createBook(name) {
    var wb = utils.book_new();
    wb.Props = {
      Title: name,
      Subject: name,
      Author: "Pavel",
      CreatedDate: new Date(Date.now()),
    };
    return wb;
  }

  static addTosheet(wb, name, mat) {
    wb.SheetNames.push(name);
    var ws_data = mat;
    var ws = utils.aoa_to_sheet(ws_data);
    wb.Sheets[name] = ws;
  }

  static download(name, wbout) {
    return saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
  }

  static downloadSheets(wb) {
    var wbout = write(wb, { bookType: "xlsx", type: "binary" });

    return this.download("отчёт", wbout);
  }

  static getRow(item) {
    return [
      item.name.defectName,
      formatToXlsxDate(item.createdAt),
      item.responsible.map((r) => r.login).join(", "),
      item.consumables.map((r) => r.name).join(", "),
      item.consumables.map((r) => r.number).join(", "),
      item.isResolved ? "Да" : "Нет",
      item.isResolved && formatToXlsxDate(item.updatedAt),
    ];
  }
  static generatePageByHeaderAndItems(wb, { items, headers, name, getter }) {
    const mat = [];

    mat[0] = headers;
    items.forEach((item, i) => {
      mat.push(getter(item, i));
    });

    this.addTosheet(wb, name, mat);
  }
}
