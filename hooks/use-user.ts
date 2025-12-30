import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({
          name: user.user_metadata.full_name || user.email?.split('@')[0],
          email: user.email,
          avatar: user.user_metadata.avatar_url,
        });
      }
    };
    fetchUser();
  }, []);

  return user;
}
