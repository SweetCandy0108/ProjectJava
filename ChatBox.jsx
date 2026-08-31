import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

export default function ChatBox() {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    console.log("Send:", message)
    setMessage("")
  }

  return (
    <div className="sticky border rounded-lg">
      <h1 className="border-b p-5 font-semibold">Chat Box</h1>
      <ScrollArea className="h-[32rem] w-full p-5 flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={item}
            className={`flex gap-2 mb-2 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            {index % 2 === 0 && (
              <Avatar>
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            )}
            <div className={`space-y-2 py-2 px-5 border rounded-2xl ${index % 2 === 0 ? "rounded-ss-none" : "rounded-ee-none"}`}>
              <p className="font-medium text-xs text-gray-400">{index % 2 === 0 ? "Ram" : "You"}</p>
              <p className="text-sm">How is the project development going?</p>
            </div>
            {index % 2 !== 0 && (
              <Avatar>
                <AvatarFallback>Z</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>
      <div className="relative p-0">
        <Input
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="py-7 border-t rounded-none border-b-0 border-x-0 outline-none focus-visible:ring-0"
        />
        <Button onClick={handleSendMessage} variant="ghost" size="icon" className="absolute right-2 top-3 rounded-full">
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  )
}
