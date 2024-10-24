import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LogOut } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <header className="border-b border-purple-300">
        <div className="flex gap-4 justify-between items-center p-5">
          <h2 className="text-violet-900 text-3xl">JMAN Gallery</h2>
          <p className="text-pink-400 text-base">
            Creating Technologies Building Memories Together
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src="/profile.jpg?height=32&width=32"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{"User"}</DropdownMenuItem>
              <DropdownMenuItem>
                {"Designation"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {"example@gmail.com"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="mt-2 font-bold"
              >
                <LogOut className="mr-4" /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </header>
      <div className="mt-6 px-5 flex">
        <Tabs defaultValue="awayDay" className="w-full">
          <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="awayDay"  className="text-violet-900">Away Day</TabsTrigger>
            <TabsTrigger value="teamOuting" className="text-violet-900">Team Outing</TabsTrigger>
            <TabsTrigger value="celebrations" className="text-violet-900">Celebrations</TabsTrigger>
          </TabsList>

          <div>
            Add Button 
            Dropdown 
          </div>
          </div>
          <TabsContent value="awayDay">Away Day....</TabsContent>
          <TabsContent value="teamOuting">Team Outings.</TabsContent>
          <TabsContent value="celebrations">Celebrations</TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
