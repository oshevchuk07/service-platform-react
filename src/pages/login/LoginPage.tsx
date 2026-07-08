import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../../features/auth/login/loginSchema';
import { useLogin } from '../../features/auth/login/useLogin';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Login</h1>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>

      {login.isError && <span className="text-xs text-red-600">Wrong password or login</span>}

      <Button type="submit" disabled={login.isPending}>
        {login.isPending ? 'Logining..' : 'Login'}
      </Button>
    </form>
  );
}
