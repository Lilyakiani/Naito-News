import { createSupabaseServerClient } from '@/lib/supabase/server-client';
import LoginForm from './login';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <LoginForm user={null} />;
}
// admin@naito.com
// 123456789
