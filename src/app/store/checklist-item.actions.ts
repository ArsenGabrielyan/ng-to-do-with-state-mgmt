import { IChecklistItem } from "../interfaces/checklist-item";

export namespace ChecklistActions{
     export class AddItem{
          static readonly type = "[Checklist] AddItem";
          constructor(public item: IChecklistItem){}
     }
     export class EditItem{
          static readonly type = "[Checklist] EditItem";
          constructor(public item: IChecklistItem){}
     }
     export class MoveItemToCompleted{
          static readonly type = "[Checklist] MoveItemToCompleted";
          constructor(public item: IChecklistItem){}
     }
     export class DeleteItem{
          static readonly type = "[Checklist] DeleteItem";
          constructor(public item: IChecklistItem){}
     }
     export class FetchItem{
          static readonly type = "[Checklist] FetchItem";
     }     
     export class MarkItems{
          static readonly type = "[Checklist] MarkAllItems";
          constructor(public items: IChecklistItem[]){}
     }
     export class ClearItems{
          static readonly type = "[Checklist] ClearAllItems";
          constructor(public items: IChecklistItem[]){}
     }
}