import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accno="Enter your 4 digit Account number"
  pwd="Enter your Account password"
  aim="Your Perfect Banking Partner!!!"

  acno = ""
  pswd = ""


  loginForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
  })

  constructor(private router:Router, private db:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }


  getAccno(event: any){
    this.acno = event.target.value;
  }
  getPwd(event: any){  
    this.pswd = event.target.value;
  }
  login(){
    var acno = this.loginForm.value.acno;
    var pswd = this.loginForm.value.pswd;

    if(this.loginForm.valid){

      this.db.login(acno,pswd).subscribe((result:any)=>{

        if(result){
          localStorage.setItem("currentUname",JSON.stringify(result.userName))
          localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
          localStorage.setItem("token",JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl("dashboard")
        }

      },result=>alert(result.error.message))
  
    }else{
      alert("Invalid details entered")
    }
  }

  // login(a:any,p:any){
  //   console.log(a.value);
  //   console.log(p.value);
    
    
  //   var acno = a.value;
  //   var pswd = p.value;

  //   let db = this.database;
  //   if(acno in db){
  //     if(pswd == db[acno]["password"]){
  //       alert("Login success")
  //     }else{
  //       alert("Wrong password")
  //     }
  //   }else{
  //     alert("Invalid Account number")
  //   }
  // }
}
