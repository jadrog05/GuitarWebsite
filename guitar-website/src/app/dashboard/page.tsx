'use client'

import { useEffect } from "react";
import Navbar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserData } from "@/hooks/useUserData";
import { redirect } from 'next/navigation';
import { ScaleLoader } from "react-spinners";
import { useUser } from "../context/UserProvider";

export default function DashboardPage() {
  const { data: userData, isLoading, error } = useUserData();


  // Redirect to onboarding if user not found
  useEffect(() => {
    if (!isLoading && error) {
      redirect('/onboarding');
    }
  }, [isLoading, error]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ScaleLoader color="#4F46E5" />
        </div>
      ) : (
        <div className="min-h-screen bg-background text-foreground pt-24 px-4 grid grid-cols-3 gap-4">
          <div className="rounded-xl shadow h-[calc(100vh-6rem)] grid grid-rows-[auto_1fr] overflow-hidden p-4">
            <div className="flex items-center justify-center py-4">
              <h2 className="text-muted-foreground text-center">Your History</h2>
            </div>
            <ScrollArea className="h-full w-full">
              {/* You can map session cards here */}
            </ScrollArea>
          </div>

          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
}
