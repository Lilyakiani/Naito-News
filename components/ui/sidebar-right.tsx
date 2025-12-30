import * as React from 'react';
import { Plus } from 'lucide-react';

import { Calendars } from './calandars';
import { DatePicker } from './date-picker';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from './sidebar';
import { useUser } from '@/hooks/use-user';
import { categories } from '@/lib/categories';

const data = {
  newsdata: [
    {
      name: 'My categories',
      items: ['Personal', 'Work', 'Family'],
    },
    {
      name: 'status',
      items: ['Published', 'Drafted', 'Archived'],
    },
  ],
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarContent>
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.newsdata} />
      </SidebarContent>
    </Sidebar>
  );
}
