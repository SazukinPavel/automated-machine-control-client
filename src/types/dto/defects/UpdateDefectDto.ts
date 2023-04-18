export default interface UpdateDefectDto {
  id?: string;
  isResolved?: boolean;
  name?: string;
  description?: string;
  consumable?: string;
  responsibleId?: string;
  decisionDate?: Date;
  type?: string;
}
