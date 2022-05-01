import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    // this.getDetails();
  }

  database: any = {
    1000: { acno: 1000, name: "Arshid", password: 1000, balance: 5000, transactions: [] },
    1001: { acno: 1001, name: "Diyan", password: 1001, balance: 6000, transactions: [] },
    1002: { acno: 1002, name: "Asmin", password: 1002, balance: 9000, transactions: [] },
  }

  userName: any;

  currentAcno: any;

  //Putting values to local storage
  saveDetails() {
    if (this.database) {
      localStorage.setItem("Database", JSON.stringify(this.database));
    }
    if (this.userName) {
      localStorage.setItem("CurrentUser", this.userName);
    }

    if (this.currentAcno) {
      localStorage.setItem("currentAcno", this.currentAcno);
    }
  }

  //Getting values from local storage
  getDetails() {
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database") || "")
    }
    if (localStorage.getItem("CurrentUser")) {
      this.userName = localStorage.getItem("CurrentUser");
    }
  }

  getTransaction(acno: any) {
    const data = {
      acno
    }
    return this.http.post("http://localhost:3000/transaction", data, this.getOption())
  }

  register(acno: any, name: any, password: any) {
    const data = {
      acno,
      name,
      password
    }
    return this.http.post("http://localhost:3000/register", data)
  }

  login(acno: any, password: any) {

    const data = {
      acno,
      password
    }

    return this.http.post("http://localhost:3000/login", data)
  }

  deposit(acno: any, password: any, amt: any) {
    const data = {
      acno,
      password,
      amt
    }


    return this.http.post("http://localhost:3000/deposit", data,this.getOption())
  }

  //Function to pass token
  getOption(){
    const token = JSON.parse(localStorage.getItem("token")||'')

    let headers = new HttpHeaders();
    
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers = headers;
    }
    return options
  }


  withdraw(acno: any, password: any, amt: any) {

    const data = {
      acno,
      password,
      amt
    }

    return this.http.post("http://localhost:3000/withdraw", data,this.getOption())
  }

  deleteAccount(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }

}
