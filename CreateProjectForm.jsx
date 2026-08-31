import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cross1Icon } from "@radix-ui/react-icons"
import { tags } from "../ProjectList/ProjectList"

export default function CreateProjectForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "fullstack",
      tags: ["react", "springboot"],
    },
  })

  const handleTagsChange = (item) => {
    const currentTags = form.getValues("tags")
    const updatedTags = currentTags.includes(item)
      ? currentTags.filter((t) => t !== item)
      : [...currentTags, item]
    form.setValue("tags", updatedTags)
  }

  const onSubmit = (data) => {
    console.log("Create Project Data:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Project name..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Project description..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Multiselect Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormControl>
                <Select onValueChange={(val) => handleTagsChange(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="flex gap-1 flex-wrap pt-2">
                {form.watch("tags")?.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleTagsChange(item)}
                    className="cursor-pointer flex items-center border gap-2 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{item}</span>
                    <Cross1Icon className="h-3 w-3" />
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-5">Create Project</Button>
      </form>
    </Form>
  )
}
