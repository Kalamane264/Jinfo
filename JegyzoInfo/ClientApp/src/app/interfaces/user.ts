export class User{
  FelhasznaloID?: number = 0;
  Email?: string = "";
  Nev?: string = "";

  constructor(felhasznaloID?: number, email?: string, nev?: string){
    this.FelhasznaloID = felhasznaloID;
    this.Email = email;
    this.Nev = nev;
  }
}
