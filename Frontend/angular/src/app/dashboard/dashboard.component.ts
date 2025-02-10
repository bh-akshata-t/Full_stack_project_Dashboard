import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  issues: any[]=[];
  risks: any[]=[];
  hazards: any[]=[];

  isPopupOpen=false;
  isConfirmDeletePopupOpen=false;
  newEntry={type:'',name:''};

  private API_URL='http://localhost:8000/api/records';
  deleteRowData: {type: string;value: string} | null=null;
  averageRiskScore: string | number | undefined;
  averageIssueScore: string | number | undefined;
  averageHazardscore: string | number | undefined;


  constructor(private http: HttpClient){

  }
  
  ngOnInit(){          //ngOnInit() is used to call service to fetch initial data needed by the component.
    this.fetchAllRecords();        
  }

  //Function to fetch all records from the backend
async fetchAllRecords(){
  try{
    const records=await firstValueFrom(this.http.get<any[]>(this.API_URL));
    this.issues=records.filter((record)=>record.type==='issues');    //Returns the elements of an array that meet the condition specified in a callback function.
    this.risks=records.filter((record)=>record.type==='risks');
    this.hazards=records.filter((record)=>record.type==='hazards');

    //calculate Averages
    this.averageIssueScore=this.getAverageScore(this.issues);
    this.averageRiskScore=this.getAverageScore(this.risks);
    this.averageHazardscore=this.getAverageScore(this.hazards);
    
  } catch(error){
    console.error('Error fetching records:',error);
  };
}

  openCreatePopup(){
    this.isPopupOpen=true;
  }

  closePopup(){
    this.isPopupOpen=false;
  }


  toggleRowSelection(record: any){
    record.isSelected= !record.isSelected;
  }

  //To post or create the new entryy in the respective columns
  async addEntry(){
    const{ type,name }=this.newEntry;

    if(!type||!name){
      alert('Please select a type and enter a name.');
      return;
    }
   
    try{
      await firstValueFrom(this.http.post(`${this.API_URL}/create`, {type, value: name}));
      console.log('Record updated successfully:');
      this.fetchAllRecords();
      this.closePopup();
    }catch(error){
      console.error('Error adding/updating record',error)
    }
  }

//Function to increment the count
  async incrementCount(type: string,value: string){
    try{
      await firstValueFrom(this.http.post(`${this.API_URL}/create`, {type,value}));
      console.log("count incremented");
      await this.fetchAllRecords();
    }catch(error){
      console.error('Error creating record:',error)
    }
  }


  //Function to decrement the count
  async deleteRecord(type: string,name: string){
    try{
      await firstValueFrom(this.http.delete(`${this.API_URL}/delete`,{body: { type,value: name}}));
      console.log('Record deleted Successfully:');
      this.fetchAllRecords();
    }catch(error){
      console.error('Error deleting record:',error)
    }
  }


//Function to delete the entire row
  // async deleteRow(type: string,name: string){
  //   try{
  //     await firstValueFrom(this.http.delete(`${this.API_URL}/delete-row`,{body:{type,value: name}}));
  //     console.log("row deleted");
  //     this.fetchAllRecords();

  //   }catch(error){
  //     console.error('Error deleting record:',error)
  //   }

  // }
  openConfirmDeletePopup(type: string,value: string){
    this.deleteRowData={type,value};
    this.isConfirmDeletePopupOpen=true;
  }

  cancelDelete(){
    this.isConfirmDeletePopupOpen=false;
    this.deleteRowData=null;
  }

  async confirmDelete(){
    if(this.deleteRowData){
      const{type,value}=this.deleteRowData;
      try{
            await firstValueFrom(this.http.delete(`${this.API_URL}/delete-row`,{body:{type,value}}));
            console.log("row deleted");
            this.fetchAllRecords();
            this.cancelDelete();
      
          }catch(error){
            console.error('Error deleting record:',error)
          }
        }
  }


//Function for averaging the issues count  
  getAverageScore(records: any[]){
    const total=records.reduce((sum,record)=> sum+record.count,0);
    return total>0?(total/records.length).toFixed(2):0;
  }
}



  // issues=[
  //   { name: 'Sensor offline',count: 2, percentage:  4.4},
  //   { name: 'Compressor failure',count: 1, percentage:  4.4},
  //   { name: 'Pressure out of range',count: 1, percentage:  4.4},
  //   { name: 'Methane detection',count: 1, percentage:  4.4},
  //   { name: 'Caplock integrity',count: 1, percentage:  4.4},
  // ];
  // risks=[
  //   { name: 'Potential leak',count: 2, percentage: 4.4},
  //   { name: 'Engineering',count: 1, percentage: 4.4},
  //   { name: 'NPT',count: 0, percentage: 4.4},
  //   { name: 'Shutdowns',count: 1, percentage: 4.4},
  //   { name: 'Lorem',count: 1, percentage: 4.4},
  // ];
  // hazards=[
  //   { name: 'Casing damage',count: 2, percentage: 4.4},
  //   { name: 'Tuning damage',count: 1, percentage: 4.4},
  //   { name: 'Packing damage',count: 0, percentage: 4.4},
  //   { name: 'Mud/fluid',count: 1, percentage: 4.4},
  //   { name: 'Lorem',count: 1, percentage: 4.4},
  // ];

  // isPopupOpen=false;
  // newEntry={type: '',name: ''};

  // openCreatePopup(){
  //   this.isPopupOpen=true;
  // }

  // closePopup(){
  //   this.isPopupOpen=false;
  // }

  // addEntry(){
  //   const entry={name: this.newEntry.name, count:1, percentage: 4.4};
  //   if(this.newEntry.type ==='issue'){
  //     this.issues.push(entry);
  //   }else if(this.newEntry.type ==='risk'){
  //     this.issues.push(entry);
  //   }else if(this.newEntry.type ==='hazard'){
  //     this.issues.push(entry);
  //   }
  //   this.newEntry={type:'',name: ''}
  //   this.closePopup();
  // }
