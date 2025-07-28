"use client";

import { newLeadAction, type NewLeadState } from "@/actions/lead";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useActionState } from "react";

const initialNewLeadState: NewLeadState = {
  success: true,
  message: "",
};

export default function HomePage() {
  const [state, action, pending] = useActionState(
    newLeadAction,
    initialNewLeadState,
  );

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Enrich new Lead</Button>
        </DialogTrigger>
        <DialogContent asChild className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Enrich new Lead </DialogTitle>
              <DialogDescription>
                Enrich lead for domain or company name.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Input here..." name="keyword" required />
            {state.message && (
              <p className="text-destructive">{state.message}</p>
            )}
            <Separator />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={pending}>
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
