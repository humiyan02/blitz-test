import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteMemo = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteMemo), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const memo = await db.memo.deleteMany({ where: { id } })

  return memo
})
