import { Diak } from './diak';

export class RegistrationDialogData{
  kepzesId = 0;
  itsme = false;
  diakMe = new Diak();
  diakOthers: Diak[] = [];
}
