'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useRouter } from 'next/navigation';

type LoginProps = {
  user: User | null;
};

export default function LoginForm({ user }: LoginProps) {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(error.message);
    } else {
      router.push('/dashboard');
    }
  }

  if (user) {
    return <p className="text-center">You already logged in 👑</p>;
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-2">
      <div className={cn('flex w-full max-w-sm flex-col gap-6')}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            {status && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {status}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
