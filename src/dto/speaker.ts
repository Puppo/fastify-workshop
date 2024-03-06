import {PaginatedResult} from "./commons";

export type SpeakerDTO = {
  id: string;
  name: string;
  email: string;
  bio: string;
}
export type SpeakerIdParam = {
  speakerId: SpeakerDTO['id'];
};
export type SpeakerInsertBody = Omit<SpeakerDTO, 'id'>
export type SpeakerUpdateBody = Partial<Omit<SpeakerDTO, 'id'>>
export type SpeakerPaginatedResult = PaginatedResult<SpeakerDTO>