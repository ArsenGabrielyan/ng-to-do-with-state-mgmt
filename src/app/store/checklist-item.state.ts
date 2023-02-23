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
          ctx.setState({
               ...state, 
               pending: [...state.pending, action.item]
          })
          console.log(state)
     }
}