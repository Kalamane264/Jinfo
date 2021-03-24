export class User{
  felhasznaloID?: number = 0;
  email?: string = "";
  nev?: string = "";

  constructor(felhasznaloID?: number, email?: string, nev?: string){
    this.felhasznaloID = felhasznaloID;
    this.email = email;
    this.nev = nev;
  }
}
