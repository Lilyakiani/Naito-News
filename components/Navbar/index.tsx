'use client';

import {
  Menu,
  ChessKnight,
  Cpu,
  Trophy,
  Siren,
  Drama,
  Handshake,
  LayoutGrid,
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
import { categories } from '@/lib/categories';

/* ---------------- types ---------------- */

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

/* ---------------- component ---------------- */
const iconMap: Record<string, React.ReactNode> = {
  all: <LayoutGrid className="size-5 shrink-0" />,
  business: <Handshake className="size-5 shrink-0" />,
  politics: <Siren className="size-5 shrink-0" />,
  sports: <Trophy className="size-5 shrink-0" />,
  technology: <Cpu className="size-5 shrink-0" />,
  entertainment: <Drama className="size-5 shrink-0" />,
};
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
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-dashed border-neutral-800/50 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto border-x border-dashed border-neutral-800/50 px-4">
          {/* Desktop Navigation */}
          <nav className="hidden h-16 items-center justify-between lg:flex">
            <div className="flex items-center gap-8">
              {/* Logo Section */}
              <Link href="/" className="flex items-center gap-2 group">
                <ChessKnight className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <span className="text-2xl font-black tracking-tighter hover:text-primary transition-colors">
                  NAITO
                </span>
              </Link>

              {/* Menu Items  */}
              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList className="flex items-center gap-1">
                    {menu.map((item) => renderMenuItem(item))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <ModeToggle />
              {!user ? (
                <Button asChild size="sm" className="h-9 font-semibold">
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-9"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </nav>
          {/* ================= Mobile ================= */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2 group">
              <ChessKnight className="h-7 w-7 text-primary" />
              <span className="text-xl font-black tracking-tighter">NAITO</span>
            </Link>

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
      </header>
    </section>
  );
};

/* ---------------- helpers ---------------- */

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150 border border-neutral-800/50 bg-background/60 backdrop-blur-xl rounded-md shadow-2xl">
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
        className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50"
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
    // تغییر: حذف hover:bg-muted و استفاده از یک استایل ظریف‌تر
    className="flex flex-col gap-1 rounded-md p-3 transition-colors hover:bg-white/5 group"
  >
    <div className="flex items-center gap-2">
      {item.icon && <div className="text-primary">{item.icon}</div>}
      <div className="text-sm font-bold leading-none">{item.title}</div>
    </div>
    {item.description && (
      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
        {item.description}
      </p>
    )}
  </a>
);
export { Navbar };
