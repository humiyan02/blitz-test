import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetMemo = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetMemo), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const memo = await db.memo.findFirst({ where: { id } })

  if (!memo) throw new NotFoundError()

  return memo
})
