'use client';

import {
  Menu,
  ChessKnight,
  Cpu,
  Trophy,
  Siren,
  Drama,
  Handshake,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { ModeToggle } from '../theme/themetoggle';

/* ---------------- types ---------------- */

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

/* ---------------- component ---------------- */

const Navbar = ({
  menu = [
    { title: 'Home', url: '/' },
    {
      title: 'News',
      url: '#',
      items: [
        {
          title: 'Business',
          description:
            'Latest market trends, stock updates, and economic insights',
          icon: <Handshake className="size-5 shrink-0" />,
          url: '/?category=business',
        },
        {
          title: 'Politics',
          description:
            'Global affairs, government policies, and breaking political news',
          icon: <Siren className="size-5 shrink-0" />,
          url: '/?category=politics',
        },
        {
          title: 'Sports',
          description:
            'Match scores, athlete highlights, and upcoming tournament coverage',
          icon: <Trophy className="size-5 shrink-0" />,
          url: '/?category=sports',
        },
        {
          title: 'Technology',
          description:
            'Future innovations, gadget reviews, and digital world updates',
          icon: <Cpu className="size-5 shrink-0" />,
          url: '/?category=technology',
        },
        {
          title: 'Entertainment',
          description: 'Movie releases, celebrity news, and pop culture trends',
          icon: <Drama className="size-5 shrink-0" />,
          url: '/?category=entertainment',
        },
      ],
    },
    { title: 'Blog', url: '#' },
  ],
}: {
  menu?: MenuItem[];
}) => {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  /* ---- listen auth state ---- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <section>
      <header className="sticky top-0 z-50 border-b border-dashed border-neutral-800 backdrop-blur-sm">
        <div className="container mx-auto border-x border-dashed border-neutral-800 px-3 py-3">
          {/* ================= Desktop ================= */}
          <nav className="hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <ChessKnight className="h-7 w-7" />
                <span className="font-bold">Naito</span>
              </Link>

              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menu.map((item) => renderMenuItem(item))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            <div className="flex gap-2">
              <ModeToggle />
              {!user ? (
                <Button asChild size="sm">
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* ================= Mobile ================= */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <ChessKnight />
                <span>Naito</span>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <ChessKnight />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 p-4">
                    <Accordion type="single" collapsible>
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <ModeToggle />

                    <div className="flex flex-col gap-3">
                      {!user ? (
                        <Button asChild>
                          <Link href="/login">Login</Link>
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => router.push('/dashboard')}
                          >
                            Dashboard
                          </Button>
                          <Button variant="destructive" onClick={handleLogout}>
                            Logout
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

/* ---------------- helpers ---------------- */

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150 bg-popover text-popover-foreground rounded-md shadow-md">
            {item.items.map((sub) => (
              <NavigationMenuLink asChild key={sub.title}>
                <li>
                  <SubMenuLink item={sub} />
                </li>
              </NavigationMenuLink>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>
          {item.items.map((sub) => (
            <SubMenuLink key={sub.title} item={sub} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <a
    href={item.url}
    className="flex gap-4 rounded-md p-3 transition-colors hover:bg-muted"
  >
    {item.icon}
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-sm text-muted-foreground">{item.description}</p>
      )}
    </div>
  </a>
);

export { Navbar };
