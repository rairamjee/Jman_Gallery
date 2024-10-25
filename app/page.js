"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { LogOut, ImagePlus } from "lucide-react";

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
              <DropdownMenuItem>{"Designation"}</DropdownMenuItem>
              <DropdownMenuItem>{"example@gmail.com"}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="mt-2 font-bold">
                <LogOut className="mr-4" /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="mt-6 px-12 flex">
        <Tabs defaultValue="awayDay" className="w-full">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="awayDay" className="text-violet-900">
                Away Day
              </TabsTrigger>
              <TabsTrigger value="teamOuting" className="text-violet-900">
                Team Outing
              </TabsTrigger>
              <TabsTrigger value="celebrations" className="text-violet-900">
                Celebrations
              </TabsTrigger>
            </TabsList>

            <div className="gap-x-4 flex">
              <Button variant="secondary">
                <ImagePlus />
                Upload Images
              </Button>
              <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="text-purple-900">
                  <SelectValue placeholder="Select Event..."/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awayDay2024">Away Day 2024</SelectItem>
                  <SelectItem value="celebration2024">
                    Celebration 2024
                  </SelectItem>
                  <SelectItem value="teamOuting2024">
                    Team Outing 2024
                  </SelectItem>
                </SelectContent>
              </Select>
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
