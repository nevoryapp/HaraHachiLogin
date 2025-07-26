import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/auth";
import { loginSchema, type LoginRequest } from "@shared/schema";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "¡Bienvenido!",
          description: `Acceso concedido. Hola, ${data.username}!`,
        });
        setLocation("/member-area");
      } else {
        toast({
          title: "Error de acceso",
          description: data.message || "Contraseña incorrecta",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error de conexión",
        description: `Error: ${error.message || "No se pudo conectar con el servidor"}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="mb-4">
            <div className="text-6xl animate-pulse-soft text-[var(--primary-red)]">
              ⛩️
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Método Japonés</h1>
          <h2 className="text-xl font-medium text-[var(--primary-red)] mb-4">Hara Hachi Bu</h2>
          <p className="text-gray-600 text-sm">Acceso al Área de Miembros</p>
        </div>

        {/* Login Form */}
        <Card className="japanese-border animate-slide-up">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2 text-[var(--primary-red)]" />
                  Nombre de Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingresa cualquier nombre de usuario"
                  className="transition-all duration-300 hover:border-[var(--secondary-red)] focus:ring-[var(--primary-red)]"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
                  <Lock className="w-4 h-4 mr-2 text-[var(--primary-red)]" />
                  Contraseña de Acceso
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña de miembro"
                    className="pr-12 transition-all duration-300 hover:border-[var(--secondary-red)] focus:ring-[var(--primary-red)]"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--primary-red)] transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {loginMutation.isError && (
                <Alert className="animate-bounce-soft border-red-200 bg-red-50">
                  <AlertDescription className="text-red-600">
                    ⚠️ Contraseña incorrecta. Verifica tu clave de acceso.
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-[var(--primary-red)] hover:bg-[var(--secondary-red)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loginMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verificando acceso...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Acceder al Área de Miembros
                  </>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                🛡️ Contenido exclusivo para miembros del Método Japonés
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
