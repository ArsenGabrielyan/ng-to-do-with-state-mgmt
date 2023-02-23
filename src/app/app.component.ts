import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Subject, timer, map, takeUntil, Observable } from 'rxjs';
import { ChecklistValidator } from './classes/checklist-validator';
import { IChecklistItem } from './interfaces/checklist-item';
import { ChecklistActions } from './store/checklist-item.actions';
import { ChecklistState } from './store/checklist-item.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  id: string = localStorage.getItem("tab") || "pending";
  pending: IChecklistItem[] = [];
  completed: IChecklistItem[] = [];
  @Select(ChecklistState) checklist$!: Observable<IChecklistItem[]>
  checklistForm!: FormGroup;
  destr = new Subject<void>();
  constructor(private store: Store, private fbuilder: FormBuilder){}
  ngOnInit(): void {
    this.checklistForm = this.fbuilder.group({
      item: ["", [Validators.required, ChecklistValidator.hasSpaces]]
    })
  }
  ngOnDestroy(): void {
    this.destr.next();
  }
  tabChange(t:string){
    this.id = t;
    localStorage.setItem("tab", this.id)
  }
  addToDo(){
    let item: IChecklistItem = {
      item: this.checklistForm.get("item")?.value,
      checked: false,
      dateCreated: new Date(Date.now()).toUTCString()
    };
    this.store.dispatch(new ChecklistActions.AddItem(item))
    this.checklist$.pipe(map((v:any)=>this.pending = v.pending)).subscribe();
  }
  handleCheckBox(e:any, i:number){
    // if(e.target.checked === undefined) return;
    // const parent = e.target.parentNode.parentElement;
    // this.pending[i].checked = !this.pending[i].checked;
    // this.completed.push(this.pending[i]);
    // if(e.target.checked === this.pending[i].checked){
    //   this.removeItem(parent,i);
    // }
  }
  editToDo(i:number){
    // const newVal = prompt('Enter a new Value'); 
    // if(newVal?.trim() === "") alert("It's Required");
    // else{
    //   this.pending[i].item = newVal!;
    //   this.pending[i].dateCreated = new Date(Date.now()).toUTCString();
    // }
    // localStorage.setItem("pending", JSON.stringify(this.pending))
  }
  deleteToDo(i:number){
    // const sure = confirm("Are you sure to delete this task (item)?");
    // if(sure){
    //   this.completed.splice(i,1);
    //   localStorage.setItem("completed", JSON.stringify(this.completed));
    // }
  }
  markAll(){
    // if(!this.pending.length) {
    //   alert("There is No Pending Tasks"); 
    //   return;
    // }
    // this.pending.map((_,i)=>{
    //   this.pending[i].checked = true;this.completed.push(this.pending[i]);
    //   if(this.pending[i].checked) {
    //     this.removeItem(document.querySelectorAll(".toDo")[i], i, this.pending.length);
    //   }
    // })
  }
  removeItem(parent: any, i:number, count: number = 1){
    // this.rend.addClass(parent, "hide");
    // timer(500).pipe(map(()=>{
    //   parent.remove();
    //   this.pending.splice(i,count);
    //   localStorage.setItem("pending", JSON.stringify(this.pending))
    // }),takeUntil(this.destr)).subscribe();
    // localStorage.setItem("completed", JSON.stringify(this.completed))
  }
  clearAll(){
    // if(!this.completed.length) {
    //   alert("There is No Completed Tasks"); 
    //   return;
    // }
    // const sure = confirm("Are you sure to Clear all Completed Tasks?");
    // this.completed.map(()=>{
    //   if(sure){
    //     this.completed.splice(0,this.completed.length);
    //     localStorage.setItem("completed", JSON.stringify(this.completed))
    //   }
    // })
  }
}
