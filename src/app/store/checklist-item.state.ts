import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { IChecklistItem } from "../interfaces/checklist-item";
import { ChecklistActions } from "./checklist-item.actions";

export interface ChecklistModel{
     pending: IChecklistItem[],
     completed: IChecklistItem[]
}

@State<ChecklistModel>({
     name: "checklist",
     defaults: {
          pending: [],
          completed: []
     }
})
@Injectable()
export class ChecklistState{
     @Action(ChecklistActions.AddItem) 
     addToDo(ctx: StateContext<ChecklistModel>, action: ChecklistActions.AddItem){
          const state = ctx.getState();
          state.pending.push(action.item);
          ctx.setState({...state, pending: [...state.pending]})
     }
     @Action(ChecklistActions.EditItem) 
     editToDo(ctx: StateContext<ChecklistModel>){
          const state = ctx.getState();
          ctx.setState({...state, pending: [...state.pending]})
     }
     @Action(ChecklistActions.MoveItemToCompleted) 
     removeToDo(ctx: StateContext<ChecklistModel>, action: ChecklistActions.MoveItemToCompleted){
          const state = ctx.getState();
          const i = state.pending.indexOf(action.item);
          state.pending.splice(i,1);
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
          if(sure) state.completed.splice(0,state.completed.length);
          ctx.setState({...state, completed: [...state.completed]})
     }
}