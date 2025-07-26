import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut, Clock, FileText, Video, ChartLine, Download, Calculator, Calendar, Users, MessageCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { checkAuthStatus, logout } from "@/lib/auth";

export default function MemberArea() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const authQuery = useQuery({
    queryKey: ["/api/auth/status"],
    queryFn: checkAuthStatus,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/status"] });
      toast({
        title: "Sesión cerrada",
        description: "Has salido del área de miembros exitosamente.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error al cerrar sesión. Intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (authQuery.data && !authQuery.data.success) {
      setLocation("/");
    }
  }, [authQuery.data, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (authQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-[var(--primary-red)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!authQuery.data?.success) {
    return null; // Will redirect via useEffect
  }

  const username = authQuery.data.username || "Usuario";

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-[var(--primary-red)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">⛩️</span>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Hara Hachi Bu</h1>
                <p className="text-sm text-gray-600">Área de Miembros</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, <span className="font-medium text-[var(--primary-red)]">{username}</span>
              </span>
              <Button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                variant="outline"
                className="border-[var(--primary-red)] text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-[var(--light-red)] to-white mb-8 animate-slide-up">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌸</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Bienvenido al Método Japonés!</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Has accedido exitosamente al área exclusiva de miembros del libro electrónico "Hara Hachi Bu". 
                Aquí encontrarás todo el contenido premium para transformar tu relación con la alimentación.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chapter 1 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Los Fundamentos del Hara Hachi Bu</h3>
                    <p className="text-gray-600 mb-4">
                      Descubre los principios ancestrales japoneses que han mantenido a generaciones en un estado óptimo de salud y longevidad.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        15 min lectura
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        PDF disponible
                      </span>
                    </div>
                    <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                      <Play className="w-4 h-4 mr-1" />
                      Comenzar Capítulo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chapter 2 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">La Práctica Diaria</h3>
                    <p className="text-gray-600 mb-4">
                      Aprende cómo implementar el método del 80% en tu rutina diaria para alcanzar el equilibrio perfecto entre satisfacción y salud.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        20 min lectura
                      </span>
                      <span className="flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        Video guía incluido
                      </span>
                    </div>
                    <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                      <Play className="w-4 h-4 mr-1" />
                      Comenzar Capítulo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chapter 3 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Transformación y Resultados</h3>
                    <p className="text-gray-600 mb-4">
                      Casos de estudio reales y estrategias avanzadas para mantener los resultados a largo plazo y crear hábitos duraderos.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        25 min lectura
                      </span>
                      <span className="flex items-center">
                        <ChartLine className="w-4 h-4 mr-1" />
                        Herramientas de seguimiento
                      </span>
                    </div>
                    <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                      <Play className="w-4 h-4 mr-1" />
                      Comenzar Capítulo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="animate-slide-up">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ChartLine className="w-5 h-5 mr-2 text-[var(--primary-red)]" />
                  Tu Progreso
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completado</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 0 de 3 capítulos completados</p>
                    <p>• Tiempo estimado restante: 60 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources Card */}
            <Card className="animate-slide-up">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-[var(--primary-red)]" />
                  Recursos Adicionales
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg hover:bg-red-100 transition-colors duration-200">
                    <FileText className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">Guía de Inicio Rápido (PDF)</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg hover:bg-red-100 transition-colors duration-200">
                    <Calculator className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">Calculadora de Porciones</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg hover:bg-red-100 transition-colors duration-200">
                    <Calendar className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">Planificador Semanal</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </main>
    </div>
  );
}
