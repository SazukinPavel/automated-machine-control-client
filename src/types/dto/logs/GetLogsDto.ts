export default interface GetLogsDto {
  page: number;
  limit: number;
  startDate?: Date;
  endDate?: Date;
}
