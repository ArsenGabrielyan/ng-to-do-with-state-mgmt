import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IChecklistItem } from "../interfaces/checklist-item";
import { ChecklistActions } from "./checklist-item.actions";

export interface ChecklistModel{
     pending: IChecklistItem[],
     completed: IChecklistItem[]
}

@State<ChecklistModel>({
     name: "checklist",
     defaults: {
          pending: JSON.parse(localStorage.getItem("pending")!) || [],
          completed: JSON.parse(localStorage.getItem("completed")!) || []
     }
})
@Injectable()
export class ChecklistState{
     @Selector<ChecklistModel>()
     static getData(data: ChecklistState){
          return data;
     }
     @Action(ChecklistActions.AddItem) 
     addToDo(ctx: StateContext<ChecklistModel>, action: ChecklistActions.AddItem){
          const state = ctx.getState();
          state.pending.push(action.item);
          localStorage.setItem("pending", JSON.stringify(state.pending));
          ctx.setState({...state, pending: [...state.pending]})
     }
     @Action(ChecklistActions.EditItem) 
     editToDo(ctx: StateContext<ChecklistModel>){
          const state = ctx.getState();
          localStorage.setItem("pending", JSON.stringify(state.pending));
          ctx.setState({...state, pending: [...state.pending]})
     }
     @Action(ChecklistActions.MoveItemToCompleted) 
     removeToDo(ctx: StateContext<ChecklistModel>, action: ChecklistActions.MoveItemToCompleted){
          const state = ctx.getState();
          const i = state.pending.indexOf(action.item);
          state.pending.splice(i,1);
          localStorage.setItem("pending", JSON.stringify(state.pending))
          localStorage.setItem("completed", JSON.stringify(state.completed))
          ctx.setState({
               ...state, 
               pending: [...state.pending],
               completed: [...state.completed]
          })
     }
     @Action(ChecklistActions.DeleteItem) 
     deleteToDo(ctx: StateContext<ChecklistModel>, action: ChecklistActions.DeleteItem){
          const state = ctx.getState();
          const i = state.completed.indexOf(action.item);
          state.completed.splice(i,1);
          localStorage.setItem("completed", JSON.stringify(state.completed))
          ctx.setState({...state, completed: [...state.completed]})
     }
     @Action(ChecklistActions.MarkItems) 
     markToDoItems(ctx: StateContext<ChecklistModel>, action: ChecklistActions.MarkItems){
          const state = ctx.getState();
          action.items.map((_,i)=>{
               action.items[i].checked = true;
               if(action.items[i].checked) state.completed.push(action.items[i]);
          })
          state.pending.splice(0,action.items.length);
          localStorage.setItem("pending", JSON.stringify(state.pending))
          localStorage.setItem("completed", JSON.stringify(state.completed))
          ctx.setState({
               ...state, 
               pending: [...state.pending],
               completed: [...state.completed]
          })
     }
     @Action(ChecklistActions.ClearItems) 
     clearToDoItems(ctx: StateContext<ChecklistModel>){
          const state = ctx.getState();
          const sure = confirm("Are you sure to Clear all Completed Tasks?");
          if(sure) {
               state.completed.splice(0,state.completed.length);
               localStorage.setItem("completed", JSON.stringify(state.completed))
          }
          ctx.setState({...state, completed: [...state.completed]})
     }
}