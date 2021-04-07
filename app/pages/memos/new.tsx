import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMemo from "app/memos/mutations/createMemo"
import { MemoForm, FORM_ERROR } from "app/memos/components/MemoForm"

const NewMemoPage: BlitzPage = () => {
  const router = useRouter()
  const [createMemoMutation] = useMutation(createMemo)

  return (
    <div>
      <h1>Create New Memo</h1>

      <MemoForm
        submitText="Create Memo"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateMemo}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const memo = await createMemoMutation(values)
            router.push(`/memos/${memo.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>
    </div>
  )
}

NewMemoPage.authenticate = true
NewMemoPage.getLayout = (page) => <Layout title={"Create New Memo"}>{page}</Layout>

export default NewMemoPage
