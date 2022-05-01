import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  aim = "Your Perfect Banking Partner!!!"
  transactions: any;
  acno: any;


  constructor(private ds: DataService) {
    this.acno = localStorage.getItem("currentAcno");

    this.ds.getTransaction(this.acno).subscribe((result: any) => {
      
      this.transactions = result.transaction;
    },
      result => result.error.message)
  }



  ngOnInit(): void {
  }
}
