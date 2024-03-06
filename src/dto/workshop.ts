import {PaginatedResult} from "./commons";

export type WorkshopDTO = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

export type WorkshopIdParam = {
  workshopId: WorkshopDTO['id'];
};
export type WorkshopInsertBody = Omit<WorkshopDTO, 'id'>
export type WorkshopUpdateBody = Partial<Omit<WorkshopDTO, 'id'>>
export type WorkshopPaginatedResult = PaginatedResult<WorkshopDTO>
