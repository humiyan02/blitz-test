import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateMemo = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateMemo),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const memo = await db.memo.update({ where: { id }, data })

    return memo
  }
)
