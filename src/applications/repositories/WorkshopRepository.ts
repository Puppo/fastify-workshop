import {PaginatedResult, Pagination, Speaker, Workshop} from "../models";

export interface WorkshopRepository {
  getWorkshops(
    speaker: Speaker,
    pagination: Pagination
  ): Promise<PaginatedResult<Workshop>>;
  createWorkshop(speaker: Speaker, workshop: Omit<Workshop, 'id'>): Promise<Workshop>;
  deleteWorkshop(speaker: Speaker, id: Workshop['id']): Promise<Workshop | null>;
}