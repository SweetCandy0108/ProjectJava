import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CreateCommentForm({ issueId }) {
  const form = useForm({
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Create Comment for Issue", issueId, ":", data)
    form.reset()
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Add comment here..."
                      className="w-[20rem] border border-gray-700"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}
