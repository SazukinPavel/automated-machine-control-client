export default interface AddMachineDto {
  name: string;
  description: string;

  isActive?: boolean;
  departamentId?: string;
}
