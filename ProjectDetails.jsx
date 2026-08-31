import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import IssueList from "./IssueList"
import ChatBox from "./ChatBox"
import InviteUserForm from "./InviteUserForm"

export default function ProjectDetails() {
  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 justify-between pb-4">
        <ScrollArea className="h-screen lg:w-[69%] pr-2">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5 text-white">Create Ecommerce Website Using React</h1>
            <p className="text-sm text-gray-400 pb-8">
              Full-stack project building an e-commerce platform with React.js & Spring Boot microservices.
            </p>

            <div className="space-y-3 pb-8 text-sm">
              <div className="flex items-center">
                <p className="w-36 text-gray-400">Project Lead:</p>
                <p className="text-white">Zosh</p>
              </div>
              <div className="flex items-center">
                <p className="w-36 text-gray-400">Members:</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="cursor-pointer">
                      <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="ml-2 gap-1">
                      <span>Invite</span>
                      <PlusIcon className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite User</DialogTitle>
                    </DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center">
                <p className="w-36 text-gray-400">Category:</p>
                <p className="text-white">Fullstack</p>
              </div>
              <div className="flex items-center">
                <p className="w-36 text-gray-400">Status:</p>
                <Badge variant="outline">In Progress</Badge>
              </div>
            </div>

            {/* Tasks Kanban Board */}
            <section>
              <p className="py-5 border-b text-lg tracking-wider text-white">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="in_progress" title="In Progress" />
                <IssueList status="done" title="Done" />
              </div>
            </section>
          </div>
        </ScrollArea>

        {/* Live Chat Box */}
        <div className="lg:w-[30%] rounded-md sticky right-5 top-0">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}
