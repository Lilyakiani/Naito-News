'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { DynamicBreadcrump } from '@/components/Breadcrump';
import { News } from '../news/page';
import CreateNews from '../create/page';

export default function DashboardPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [activeTab, setActiveTab] = useState('overview');

  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
    });
  }, []);

  const handleEditNews = (id: string) => {
    setEditingNewsId(id);
    setActiveTab('Create News');
  };

  const handleAddNew = () => {
    setEditingNewsId(null);
    setActiveTab('Create News');
  };

  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'News':
        return <News onEdit={handleEditNews} />;
      case 'Create News':
        return <CreateNews newsId={editingNewsId} />;
      default:
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        onTabChange={(tab) => {
          if (tab === 'Create News') setEditingNewsId(null);
          setActiveTab(tab);
        }}
        activeTab={activeTab}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrump />
          </div>
        </header>
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  );
}
