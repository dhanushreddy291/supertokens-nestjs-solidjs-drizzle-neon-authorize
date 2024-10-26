/* eslint-disable */
// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { desc, eq, sql, not } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { todos } from './schema';

const getDb = (authToken) => {
  const db = drizzle(
    neon(process.env.DATABASE_AUTHENTICATED_URL, {
      authToken,
    }),
    { schema: todos },
  );
  return db;
};

@Injectable()
export class AppService {
  async getTodos(session: SessionContainer) {
    const db = getDb(session.getAccessToken());
    const rows = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, sql`auth.user_id()`))
      .orderBy(todos.isComplete, desc(todos.insertedAt));
    return { todos: rows };
  }

  async addTodo(session: SessionContainer, todo: string) {
    const db = getDb(session.getAccessToken());
    await db.insert(todos).values({
      task: todo,
      isComplete: false,
    });
    return { status: 'ok' };
  }

  async deleteTodo(session: SessionContainer, id: number) {
    const db = getDb(session.getAccessToken());
    await db.delete(todos).where(eq(todos.id, id));
    return { status: 'ok' };
  }

  async toggleTodo(session: SessionContainer, id: number) {
    const db = getDb(session.getAccessToken());
    await db
      .update(todos)
      .set({ isComplete: not(todos.isComplete) })
      .where(eq(todos.id, id));
    return { status: 'ok' };
  }
}
