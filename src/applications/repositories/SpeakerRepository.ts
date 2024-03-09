import {PaginatedResult, Pagination, Speaker} from "../models";

export interface SpeakerRepository {
  getSpeakers(
    pagination: Pagination
  ): Promise<PaginatedResult<Speaker>>;
  getSpeakerById(id: Speaker['id']): Promise<Speaker | null>;
  createSpeaker(speaker: Omit<Speaker, 'id'>): Promise<Speaker>;
  updateSpeaker(id: Speaker['id'], speaker: Partial<Omit<Speaker, 'id'>>): Promise<Speaker | null>;
  deleteSpeaker(id: Speaker['id']): Promise<Speaker | null>;
}