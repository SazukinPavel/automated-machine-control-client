import { utils, WorkBook, write } from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import Defect from "@/types/busnes/Defect";

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  const view = new Uint8Array(buf); //create uint8array as viewer
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}

function formatToXlsxDate(date?: Date) {
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
  static downloadXlsx(defects: Defect[]) {
    const wb = this.createBook("Неисправности");

    this.generatePageByHeaderAndItems(wb, {
      items: defects,
      name: "Неисправности",
      headers: this.headers,
      getter: (item: Defect) => this.getRow(item),
    });

    return this.downloadSheets(wb);
  }

  static createBook(name: string) {
    const wb = utils.book_new();
    wb.Props = {
      Title: name,
      Subject: name,
      Author: "Pavel",
      CreatedDate: new Date(Date.now()),
    };
    return wb;
  }

  static addTosheet(wb: WorkBook, name: string, mat: any[][]) {
    wb.SheetNames.push(name);
    const ws_data = mat;
    const ws = utils.aoa_to_sheet(ws_data);
    wb.Sheets[name] = ws;
  }

  static download(name: string, wbout: string) {
    return saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
  }

  static downloadSheets(wb: WorkBook) {
    const wbout: string = write(wb, { bookType: "xlsx", type: "binary" });

    return this.download("отчёт", wbout);
  }

  static getRow(item: Defect) {
    return [
      item?.name?.defectName,
      formatToXlsxDate(item?.createdAt),
      item.responsible?.map((r) => r.login).join(", "),
      item.consumables?.map((r) => r.name).join(", "),
      item.consumables?.map((r) => r.number).join(", "),
      item.isResolved ? "Да" : "Нет",
      (item.isResolved && formatToXlsxDate(item?.updateAt)) || "",
    ];
  }
  static generatePageByHeaderAndItems(
    wb: WorkBook,
    {
      items,
      headers,
      name,
      getter,
    }: { items: Defect[]; headers: string[]; name: string; getter: Function }
  ) {
    const mat = [];

    mat[0] = headers;
    items.forEach((item, i) => {
      mat.push(getter(item, i));
    });

    this.addTosheet(wb, name, mat);
  }
}
