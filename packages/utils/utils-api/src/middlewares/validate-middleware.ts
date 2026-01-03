import type { ZodType, ZodRecord, ZodString, ZodCoercedString } from "zod";
import { BlockHandler } from "../classes/controllers/blockHandler.js";
import { stringObjUtils } from "../utils-fns/string-obj.js";

interface Schema {
  body?: ZodType | ZodRecord<ZodString, ZodCoercedString<unknown>>
  query?: ZodType,
  params?: ZodType,
}


export interface ValidReq extends Express.Request {
  ValidQuery?: unknown
}

export class Validator {
  constructor(private block: BlockHandler) { }
  validator = (schema: Schema) => this.block.createMiddleware((async (req) => {
    if (schema.body) {
      req.body = await schema.body.parseAsync(req.body || {});
    }
    if (schema.query) {
      const nestedQuery = stringObjUtils(req.query);
      (req as ValidReq).ValidQuery = await schema.query.parseAsync(nestedQuery || {});
    }
    if (schema.params) {
      req.params = await schema.params.parseAsync(req.params || {}) as typeof req.params;
    }
  }), "Validation Error");
}



