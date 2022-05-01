import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dacno = ""
  dpswd = ""
  damount = ""

  wacno = ""
  wpswd = ""
  wamount = ""

  currentUser = ""
  acno: any;
  lDate: any;

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUname") || '')
    this.lDate = new Date()
  }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("")
      alert("Please log in!")
    }
  }

  depositForm = this.fb.group({
    dacno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    dpswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    damount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  withdrawForm = this.fb.group({
    wacno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    wpswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    wamount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  deposit() {

    var dacno = this.depositForm.value.dacno;
    var dpswd = this.depositForm.value.dpswd;
    var damt = this.depositForm.value.damount;

    if (this.depositForm.valid) {
      this.ds.deposit(dacno, dpswd, damt).subscribe((result: any) => {
        if (result) {
          alert(result.message);
        }
      }, result => alert(result.error.message))
    } else {
      alert("Invalid credentials")
    }
  }

  withdraw() {
    var wacno = this.withdrawForm.value.wacno;
    var wpswd = this.withdrawForm.value.wpswd;
    var wamt = this.withdrawForm.value.wamount;

    if (this.withdrawForm.valid) {

      this.ds.withdraw(wacno, wpswd, wamt).subscribe((result: any) => {
        if (result) {
          alert(result.message)
        }
      }, result => result.error.message)
    } else {
      alert("Invalid credentials")
    }
  }

  logout() {
    localStorage.removeItem("currentAcno");
    localStorage.removeItem("currentUname");
    localStorage.removeItem("token");
    this.router.navigateByUrl("");
  }

  deleteAccount() {
    this.acno = localStorage.getItem("currentAcno");
  }

  deleteFromParent(event: any) {
    this.ds.deleteAccount(event).subscribe((result: any) => {
      if (result) {
        alert(result.message);
        localStorage.removeItem("currentAcno");
        localStorage.removeItem("currentUname");
        localStorage.removeItem("token");
        this.router.navigateByUrl("")
      }
    }, result => result.error.message)
  }

  cancelFromParent() {
    this.acno = "";
  }
}
