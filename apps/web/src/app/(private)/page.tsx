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
import { leadCount } from "@aksel/db";

export default async function HomePage() {
  const leadCounter = await leadCount();

  return (
    <main>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              Enrich new Lead {String(leadCounter)}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enrich new Lead </DialogTitle>
              <DialogDescription>
                Enrich lead for domain or company name.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Input here..." name="lead_name" />
            <Separator />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </main>
  );
}
