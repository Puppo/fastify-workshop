import {Type} from "@sinclair/typebox";
import {PaginatedResult} from "./commons";

export const SpeakerDTO = Type.Object({
  id: Type.Number(),
  name: Type.String({minLength: 1}),
  email: Type.String({format: 'email'}),
  bio: Type.String()
});

export const SpeakerIdParam = Type.Object({
  speakerId: Type.Number()
});
export const SpeakerInsertBody = Type.Omit(SpeakerDTO, ['id']);
export const SpeakerUpdateBody = Type.Partial(SpeakerDTO);
export const SpeakerPaginatedResult = PaginatedResult(SpeakerDTO);