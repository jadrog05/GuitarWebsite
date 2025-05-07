'use client';

import Link from 'next/link';
import { useUser } from '@/app/context/UserProvider';
import { Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarImage } from './ui/avatar';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <header className="shadow-md px-4 py-3 fixed 
                w-full top-0 left-0 bg-sidebar">
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-sidebar">
        <Link href="/" className="text-xl font-bold text-sidebar-foreground">
          🎸 GuitarPractice
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sidebar-foreground hover:text-sidebar-accent-foreground">
                Dashboard
              </Link>
              <Link href="/practice" className="text-sidebar-foreground hover:text-sidebar-accent-foreground">
                Practice
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Avatar className="w-10 h-10 bg-secondary hover:bg-sidebar-accent-foreground cursor-pointer rounded-full outline outline-border">
                    <AvatarImage
                      src={user.picture}
                      alt="User profile picture"
                      className="rounded-full object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-primary hover:bg-accent hover:text-accent-foreground text-primary-foreground rounded-full w-full h-full flex items-center justify-center">
                      JR
                    </AvatarFallback>
                  </Avatar>

                </SheetTrigger>
                <SheetContent className='bg-sidebar text-sidebar-foreground' side="right">
                  <SheetHeader className="">
                    <SheetTitle>Edit Settings</SheetTitle>
                  </SheetHeader>
                  <div className="">
                    <div className="grid grid-cols-1 items-center px-4">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className='px-2 hover:bg-sidebar-accent hover:no-underline focus:no-underline text-decoration-none'>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="">Toggle Light/Dark Mode</span>
                          </AccordionTrigger>
                          <AccordionContent onClick={() => setTheme("light")}>
                            <span>Light</span>
                          </AccordionContent>
                          <AccordionContent onClick={() => setTheme("dark")}>
                            Dark
                          </AccordionContent>
                          <AccordionContent onClick={() => setTheme("system")}>
                            System
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button variant={'destructive'}>
                      <Link href="/auth/logout">
                        Logout
                      </Link>
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            !isLoading && (
              <Button variant={'outline'}>
                <Link href="/auth/login">
                  Login
                </Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 px-4">
          {user ? (
            <>
              <Link href="/dashboard" className="block py-1 text-gray-700">
                Dashboard
              </Link>
              <Link href="/practice" className="block py-1 text-gray-700">
                Practice
              </Link>
              <a href="/auth/logout" className="block py-1 text-red-600">
                Logout
              </a>
            </>
          ) : (
            !isLoading && (
              <a href="/auth/login" className="block py-1 text-blue-600">
                Login
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}
