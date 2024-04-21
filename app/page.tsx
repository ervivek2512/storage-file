"use client";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { SignInButton, useSession } from "@clerk/nextjs";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const session = useSession()
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} 
      <SignedIn>
        <SignOutButton>
          <Button>
            SignOut
          </Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>
            SignIn
          </Button>
        </SignInButton>
      </SignedOut>
      <Button onClick={() => {
        createFile({
          name: 'Hello World'
        })
      }}>
        Add File
      </Button>
      {files?.map(({ _id, name }) => <div key={`file${_id}`}>{name}</div>)} 
    </main>
  );
}
