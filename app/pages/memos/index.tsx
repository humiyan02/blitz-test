import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMemos from "app/memos/queries/getMemos"

const ITEMS_PER_PAGE = 100

export const MemosList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ memos, hasMore }] = usePaginatedQuery(getMemos, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <Link href={`/memos/${memo.id}`}>
              <a>{memo.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MemosPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Memos</title>
      </Head>

      <div>
        <p>
          <Link href="/memos/new">
            <a>Create Memo</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MemosList />
        </Suspense>
      </div>
    </>
  )
}

MemosPage.authenticate = true
MemosPage.getLayout = (page) => <Layout>{page}</Layout>

export default MemosPage
