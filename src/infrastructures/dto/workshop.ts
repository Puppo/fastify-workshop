import {Type} from '@sinclair/typebox';
import {PaginatedResult} from './commons';
import {SpeakerIdParam} from './speaker';

export const WorkshopDTO = Type.Object({
  id: Type.Number(),
  title: Type.String({minLength: 1}),
  description: Type.String(),
  startTime: Type.String({format: 'date-time'}),
  endTime: Type.String({format: 'date-time'}),
});

export const WorkshopIdParam = Type.Intersect([
  SpeakerIdParam,
  Type.Object({
    workshopId: Type.Number()
  }),
]);
export const WorkshopInsertBody = Type.Omit(WorkshopDTO, ['id']);
export const WorkshopUpdateBody = Type.Partial(WorkshopDTO);
export const WorkshopPaginatedResult = PaginatedResult(WorkshopDTO);
