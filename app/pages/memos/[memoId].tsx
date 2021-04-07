import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMemo from "app/memos/queries/getMemo"
import deleteMemo from "app/memos/mutations/deleteMemo"

export const Memo = () => {
  const router = useRouter()
  const memoId = useParam("memoId", "number")
  const [deleteMemoMutation] = useMutation(deleteMemo)
  const [memo] = useQuery(getMemo, { id: memoId })

  return (
    <>
      <Head>
        <title>Memo {memo.id}</title>
      </Head>

      <div>
        <h1>Memo {memo.id}</h1>
        <pre>{JSON.stringify(memo, null, 2)}</pre>

        <Link href={`/memos/${memo.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMemoMutation({ id: memo.id })
              router.push("/memos")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowMemoPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Memo />
      </Suspense>
    </div>
  )
}

ShowMemoPage.authenticate = true
ShowMemoPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMemoPage
