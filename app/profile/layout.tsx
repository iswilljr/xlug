import Link from "components/link";
import { PlusIcon } from "@heroicons/react/24/outline";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <>
      <div className="border-b-2 border-light mt-1">
        <div className="container px-4 mx-auto pb-3 flex items-center justify-between">
          <h1 className="text-2xl">Dashboard</h1>
          <Link href="/new">
            <PlusIcon className="mr-2 w-4 h-4" />
            Create new link
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4">{props.children}</div>
    </>
  );
}
