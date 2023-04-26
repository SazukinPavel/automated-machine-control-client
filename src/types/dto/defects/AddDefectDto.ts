export default interface AddDefectDto {
  name?: string;

  description?: string;

  machineId?: string;

  consumable?: string;

  responsible?: string;

  decisionDate?: Date;
  type?: string;
}
