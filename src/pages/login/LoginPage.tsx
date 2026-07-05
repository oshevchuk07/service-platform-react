import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../../features/auth/login/loginSchema';
import { useLogin } from '../../features/auth/login/useLogin';

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

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input id="email" type="email" {...register('email')} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
        {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input id="password" type="password" {...register('password')} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
        {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>

      {login.isError && <span className="text-xs text-red-600">Incorrect login or passwor</span>}

      <button
        type="submit"
        disabled={login.isPending}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {login.isPending ? 'waiting..' : 'Enter'}
      </button>
    </form>
  );
}
