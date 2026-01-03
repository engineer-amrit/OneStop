import { conf } from '@/config/config'
import { toast } from 'sonner'

export function showSubmittedData(
  data: unknown,
  title: string = 'You submitted the following values:'
) {
  if (conf.node_env !== "production")
    toast.message(title, {
      description: (
        // w-[340px]
        <pre className='mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
}
