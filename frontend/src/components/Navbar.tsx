import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-200 bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Food Rescue</span>
        </a>
        
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <ul className="grid gap-3 p-4">
                    <li>Home</li>
                    <li>Donate Food</li>
                    <li>About Us</li>
                    <li>Contact</li>
                  </ul>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}

        <Button>Donate Now</Button>
      </div>
    </nav>
  );
};

export default Navbar;