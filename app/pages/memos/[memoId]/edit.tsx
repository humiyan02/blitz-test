import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMemo from "app/memos/queries/getMemo"
import updateMemo from "app/memos/mutations/updateMemo"
import { MemoForm, FORM_ERROR } from "app/memos/components/MemoForm"

export const EditMemo = () => {
  const router = useRouter()
  const memoId = useParam("memoId", "number")
  const [memo, { setQueryData }] = useQuery(getMemo, { id: memoId })
  const [updateMemoMutation] = useMutation(updateMemo)

  return (
    <>
      <Head>
        <title>Edit Memo {memo.id}</title>
      </Head>

      <div>
        <h1>Edit Memo {memo.id}</h1>
        <pre>{JSON.stringify(memo)}</pre>

        <MemoForm
          submitText="Update Memo"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateMemo}
          initialValues={memo}
          onSubmit={async (values) => {
            try {
              const updated = await updateMemoMutation({
                id: memo.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/memos/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditMemoPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMemo />
      </Suspense>

      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>
    </div>
  )
}

EditMemoPage.authenticate = true
EditMemoPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditMemoPage
