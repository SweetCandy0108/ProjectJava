import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"

export default function CommentCard() {
  const handleDeleteComment = () => {
    console.log("Delete comment clicked")
  }

  return (
    <div className="flex justify-between items-center border border-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>Z</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="font-medium text-sm text-white">Code With Zosh</p>
          <p className="text-sm text-gray-400">How much work is pending on this task?</p>
        </div>
      </div>
      <Button
        onClick={handleDeleteComment}
        variant="ghost"
        size="icon"
        className="rounded-full text-red-500 hover:text-red-400 hover:bg-transparent"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
