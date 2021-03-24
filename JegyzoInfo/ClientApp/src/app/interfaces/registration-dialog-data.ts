import { Diak } from './diak';

export class RegistrationDialogData{
  itsme = false;
  diakMe = new Diak();
  diakOthers: Diak[] = [];
}
