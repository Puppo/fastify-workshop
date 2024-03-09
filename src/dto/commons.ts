import {TSchema, Type} from "@sinclair/typebox";

export const Pagination = Type.Partial(Type.Object({
  limit: Type.Integer({minimum: 1, maximum: 100, default: 100}),
  offset: Type.Integer({minimum: 0, default: 0})
}));

export const PaginatedResult = <T extends TSchema>(data: T) => Type.Object({
  count: Type.Integer({minimum: 0}),
  data: Type.Array(data)
});