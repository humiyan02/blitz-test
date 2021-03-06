import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateMemo = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateMemo), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const memo = await db.memo.create({ data: input })

  return memo
})
