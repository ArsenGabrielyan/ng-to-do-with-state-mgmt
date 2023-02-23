import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
  constructor(private store: Store,private rend: Renderer2, private fbuilder: FormBuilder){}
  ngOnInit(): void {
    this.checklistForm = this.fbuilder.group({
      item: ["", [Validators.required, ChecklistValidator.hasSpaces]]
    })
    this.checklist$.pipe(map((v:any)=>{
      this.completed = v.completed;
      this.pending = v.pending
    })).subscribe();
    this.store.dispatch(new ChecklistActions.FetchItem())
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
    this.checklistForm.reset({item: ""})
  }
  handleCheckBox(e:any, i:number){
    if(e.target.checked === undefined) return;
    const parent = e.target.parentNode.parentElement;
    this.pending[i].checked = !this.pending[i].checked;
    this.completed.push(this.pending[i]);
    if(e.target.checked === this.pending[i].checked) this.removeItem(parent,i);
  }
  editToDo(i:number){
    const newVal = prompt('Enter a new Value'); 
    if(newVal?.trim() === "") alert("It's Required");
    else{
      this.pending[i].item = newVal!;
      this.pending[i].dateCreated = new Date(Date.now()).toUTCString();
    }
    this.store.dispatch(new ChecklistActions.EditItem(this.pending[i]));
  }
  deleteToDo(i:number){
    const sure = confirm("Are you sure to delete this task (item)?");
    if(sure) this.store.dispatch(new ChecklistActions.DeleteItem(this.completed[i]))
  }
  markAll(){
    if(!this.pending.length) {
      alert("There is No Pending Tasks"); 
      return;
    }
    this.store.dispatch(new ChecklistActions.MarkItems(this.pending));
  }
  removeItem(parent: any, i:number){
    this.rend.addClass(parent, "hide");
    timer(500).pipe(map(()=>{
      parent.remove();
      this.store.dispatch(new ChecklistActions.MoveItemToCompleted(this.pending[i]))
    }),takeUntil(this.destr)).subscribe();
  }
  clearAll(){
    if(!this.completed.length) {
      alert("There is No Completed Tasks"); 
      return;
    }
    this.store.dispatch(new ChecklistActions.ClearItems(this.completed))
  }
}