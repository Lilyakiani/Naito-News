'use client';

import * as React from 'react';
import { BookOpen, Bot, Plus, Sparkles, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/ui/nav-main';
import { NavUser } from '@/components/ui/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@/hooks/use-user';
const data = {
  navMain: [
    {
      title: 'News',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Create News',
      url: '#',
      icon: Plus,
      isActive: true,
    },
    {
      title: 'News Categories',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Business',
          url: '#',
        },
        {
          title: 'Politics',
          url: '#',
        },
        {
          title: 'Sports',
          url: '#',
        },
        {
          title: 'Technology',
          url: '#',
        },
        {
          title: 'Entertainment',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
      ],
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onTabChange: (tab: string) => void;
  activeTab: string;
}
export function AppSidebar({
  onTabChange,
  activeTab,
  ...props
}: AppSidebarProps) {
  const user = useUser();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => onTabChange('overview')}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Sparkles className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Dashboard</span>
                <span className="truncate text-xs">
                  Welcome Back {user?.name}👾
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onItemClick={onTabChange} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
