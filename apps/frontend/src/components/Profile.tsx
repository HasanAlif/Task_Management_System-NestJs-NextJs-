import { SessionUser } from "@/lib/session";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  user: SessionUser;
};
const Profile = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            className="rounded-full w-14 border-2 border-white"
            src={user.avatar}
          />
          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-center items-center gap-3">
          <UserIcon className="w-4" />
          <p>{user.name}</p>
        </div>
        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end ">
          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>
          <Link href="/user/create-task">
            <PencilSquareIcon className="w-4 " />
            <span>Create New Task</span>
          </Link>
          <Link href="/user/tasks">
            <ListBulletIcon className="w-4" />
            <span>Tasks</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;