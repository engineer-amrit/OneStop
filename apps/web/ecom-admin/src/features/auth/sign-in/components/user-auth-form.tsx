import { useForm } from 'react-hook-form'
import { Loader2, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Phone } from "@schema/ecom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { conf } from '@/config/config'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { userService } from '@/services/user'
import { fetchUserData } from '@/store/auth-store'
import { useAppDispatch } from '@/lib/reduxTypes'
import type { ApiError } from 'common'
import { mapFormErrors } from "@utils/shared"


type UserAuthFormProps = React.HTMLAttributes<HTMLFormElement> & {
  setFormState: React.Dispatch<React.SetStateAction<'SIGN_IN' | "OTP">>
}

export function UserAuthForm({
  className,
  setFormState,
  ...props
}: UserAuthFormProps) {

  const dispatch = useAppDispatch();
  const form = useForm<Phone>()
  const isLoading = form.formState.isSubmitting;
  function getAuthUser() {
    dispatch(fetchUserData()).then(() => {
      setFormState("OTP");
    });
  }

  function onSubmit(data: Phone) {
    showSubmittedData(data)
    userService.login(data, getAuthUser).catch((e: ApiError) => {
      if (e.errors)
        mapFormErrors(e.errors, form.setError);
      else {
        form.setError("phone", { message: e.message || "An unexpected error occurred" })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type='phone' placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {conf.node_env !== "production" && <Input  {...form.register('key')} type='password' placeholder='Enter key' />}
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Get OTP
        </Button>



      </form>
    </Form>
  )
}
