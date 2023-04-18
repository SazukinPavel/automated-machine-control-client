export default interface AddDefectDto {
  name?: string;

  description?: string;

  machineId?: string;

  consumable?: string;

  responsibleId?: string;

  decisionDate?: Date;
  type?: string;
}
