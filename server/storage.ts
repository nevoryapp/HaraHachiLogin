import { type UserSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSession(username: string): Promise<UserSession>;
  getSession(sessionId: string): Promise<UserSession | undefined>;
  deleteSession(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, UserSession>;

  constructor() {
    this.sessions = new Map();
  }

  async createSession(username: string): Promise<UserSession> {
    const sessionId = randomUUID();
    const session: UserSession = {
      id: sessionId,
      username,
      loginTime: new Date(),
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  async getSession(sessionId: string): Promise<UserSession | undefined> {
    return this.sessions.get(sessionId);
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }
}

export const storage = new MemStorage();
