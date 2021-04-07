import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMemosInput
  extends Pick<Prisma.MemoFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMemosInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: memos, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.memo.count({ where }),
      query: (paginateArgs) => db.memo.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      memos,
      nextPage,
      hasMore,
      count,
    }
  }
)
