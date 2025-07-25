import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, type AuthResponse } from "@shared/schema";
import session from "express-session";

export async function registerRoutes(app: Express): Promise<Server> {
  const CORRECT_PASSWORD = "MJP-HHB1";

  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'hara-hachi-bu-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);

      if (password !== CORRECT_PASSWORD) {
        const response: AuthResponse = {
          success: false,
          message: "Contraseña incorrecta. Verifica tu clave de acceso."
        };
        return res.status(401).json(response);
      }

      // Create session
      const userSession = await storage.createSession(username);
      
      // Store session ID in express session
      (req.session as any).sessionId = userSession.id;

      const response: AuthResponse = {
        success: true,
        username: username,
        message: "Acceso concedido al área de miembros"
      };

      res.json(response);
    } catch (error) {
      const response: AuthResponse = {
        success: false,
        message: "Error en la validación de datos"
      };
      res.status(400).json(response);
    }
  });

  // Check auth status
  app.get("/api/auth/status", async (req, res) => {
    try {
      const sessionId = (req.session as any)?.sessionId;
      
      if (!sessionId) {
        return res.status(401).json({
          success: false,
          message: "No hay sesión activa"
        });
      }

      const userSession = await storage.getSession(sessionId);
      
      if (!userSession) {
        return res.status(401).json({
          success: false,
          message: "Sesión inválida"
        });
      }

      const response: AuthResponse = {
        success: true,
        username: userSession.username
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error del servidor"
      });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req, res) => {
    try {
      const sessionId = (req.session as any)?.sessionId;
      
      if (sessionId) {
        await storage.deleteSession(sessionId);
      }

      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
      });

      const response: AuthResponse = {
        success: true,
        message: "Sesión cerrada exitosamente"
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al cerrar sesión"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
