import moment from "moment";

export default function useDateFormater() {
  const formatDateTime = (time: any) => {
    return moment(time).local().format("YYYY/MM/DD HH:mm:ss");
  };

  const formatToInput = (time: any) => {
    return moment(time).utc().format("YYYY-MM-DDTHH:mm:ss");
  };

  return { formatDateTime, formatToInput };
}
