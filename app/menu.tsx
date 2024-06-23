
import { Bars3Icon } from '@heroicons/react/24/solid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Menu = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/marchocias' : ''

  return (
    <div className="ml-auto my-0 my-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bars3Icon className="size-7"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><a href={`${basePath}/about`}>About</a></DropdownMenuItem>
          <DropdownMenuItem><a href={`${basePath}/copy`}>Copy</a></DropdownMenuItem>
          <DropdownMenuItem><a href={`${basePath}/reset`}>Reset</a></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Menu
