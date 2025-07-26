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
            {/* Introducción */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                    📚
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Introducción al Método Hara Hachi Bu</h3>
                    <p className="text-gray-600 mb-4">
                      Descubre los secretos ancestrales de la longevidad japonesa y cómo transformar tu relación con la comida.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        30 min lectura
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        PDF completo
                      </span>
                    </div>
                    <a href="/pdfs/ebook-introducion_1753492157346.pdf" download="Introduccion-Hara-Hachi-Bu.pdf">
                      <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Introducción
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capítulo 1 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Alimentación Saludable y Consciente</h3>
                    <p className="text-gray-600 mb-4">
                      Fundamentos de una alimentación consciente con estrategias prácticas para transformar tus hábitos alimenticios.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        45 min lectura
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Guía completa
                      </span>
                    </div>
                    <a href="/pdfs/Capitulo-1_1753492157346.pdf" download="Capitulo-1-Alimentacion-Consciente.pdf">
                      <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Capítulo 1
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capítulo 2 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dominando la Saciedad</h3>
                    <p className="text-gray-600 mb-4">
                      Aprende a reconocer la saciedad del 80% y desarrolla una relación más consciente con tu cuerpo.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        25 min lectura
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Técnicas prácticas
                      </span>
                    </div>
                    <a href="/pdfs/capitulo-2_1753492157346.pdf" download="Capitulo-2-Domina-la-Saciedad.pdf">
                      <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Capítulo 2
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capítulo 3 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Arte de la Alimentación Consciente</h3>
                    <p className="text-gray-600 mb-4">
                      Estrategias avanzadas para el control de porciones y la presentación consciente de alimentos.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        30 min lectura
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Técnicas visuales
                      </span>
                    </div>
                    <a href="/pdfs/capitulo-3_1753492157345.pdf" download="Capitulo-3-Arte-Alimentacion.pdf">
                      <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Capítulo 3
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capítulo 4 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Alimentación Natural y Balanceada</h3>
                    <p className="text-gray-600 mb-4">
                      Guía completa para elegir alimentos de calidad y construir una dieta equilibrada y sostenible.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        35 min lectura
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Guía nutricional
                      </span>
                    </div>
                    <a href="/pdfs/capitulo-4_1753492157345.pdf" download="Capitulo-4-Alimentacion-Natural.pdf">
                      <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Capítulo 4
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capítulo 5 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[var(--primary-red)] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Redescubriendo el Método Hara Hachi Bu</h3>
                    <p className="text-gray-600 mb-4">
                      La presentación completa del método con implementación práctica y mentalidad japonesa.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        40 min lectura
                      </span>
                      <span className="flex items-center">
                        <ChartLine className="w-4 h-4 mr-1" />
                        Método completo
                      </span>
                    </div>
                    <a href="/pdfs/capitulo-5_1753492157345.pdf" download="Capitulo-5-Metodo-Completo.pdf">
                      <Button className="bg-[var(--primary-red)] hover:bg-[var(--secondary-red)]">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Capítulo 5
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bono 1 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up border-2 border-yellow-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                    🎁
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Bonus 1: Guía Detox Japonesa</h3>
                    <p className="text-gray-600 mb-4">
                      Programa completo de 7 días para desintoxicar tu cuerpo usando técnicas ancestrales japonesas.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Programa 7 días
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Guía paso a paso
                      </span>
                    </div>
                    <a href="/pdfs/bono-1_1753492157344.pdf" download="Bonus-1-Guia-Detox-Japonesa.pdf">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Bonus 1
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bono 2 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up border-2 border-yellow-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                    🍽️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Bonus 2: Recetario Secreto de Okinawa</h3>
                    <p className="text-gray-600 mb-4">
                      30 recetas tradicionales de la zona azul más longeva del mundo, adaptadas al Hara Hachi Bu.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        30 recetas
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Recetario completo
                      </span>
                    </div>
                    <a href="/pdfs/bono-2_1753492157344.pdf" download="Bonus-2-Recetario-Okinawa.pdf">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Bonus 2
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bono 3 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 animate-slide-up border-2 border-yellow-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                    🧘
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Bonus 3: Zen y Plenitud</h3>
                    <p className="text-gray-600 mb-4">
                      5 meditaciones guiadas para superar la ansiedad alimentaria con filosofía zen japonesa.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        5 meditaciones
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Guía zen
                      </span>
                    </div>
                    <a href="/pdfs/bono-3_1753492157338.pdf" download="Bonus-3-Zen-y-Plenitud.pdf">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar Bonus 3
                      </Button>
                    </a>
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
                    <p>• 0 de 9 módulos descargados</p>
                    <p>• Contenido completo disponible</p>
                    <p>• 5 capítulos + 3 bonus exclusivos</p>
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
                  <div className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg">
                    <FileText className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">📖 5 Capítulos Completos</span>
                  </div>
                  <div className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg">
                    <Calendar className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">🗾 Programa Detox 7 Días</span>
                  </div>
                  <div className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg">
                    <Calculator className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">🍱 30 Recetas de Okinawa</span>
                  </div>
                  <div className="w-full flex items-center space-x-3 p-3 bg-[var(--light-red)] rounded-lg">
                    <Download className="w-5 h-5 text-[var(--primary-red)]" />
                    <span className="text-sm">🧘 5 Meditaciones Zen</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </main>
    </div>
  );
}
