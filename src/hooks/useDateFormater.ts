import moment from "moment";

export default function useDateFormater() {
  const formatDateTime = (time: any) => {
    return moment(time).utc().format("YYYY/MM/DD hh:mm:ss");
  };

  return { formatDateTime };
}
