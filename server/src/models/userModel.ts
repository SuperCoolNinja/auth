import { pool } from '../config/database';
import { IUser } from '../interfaces/IUser';
import { QueryOptions, RowDataPacket } from 'mysql2/promise'; // Import RowDataPacket

export const UserModel = {
  async findUserByPseudo(pseudo: string): Promise<IUser | null> {
    const query: QueryOptions = {
      sql: 'SELECT * FROM users WHERE pseudo = ? LIMIT 1',
      values: [pseudo],
    };

    const [rows] = await pool.query<RowDataPacket[]>(query); // Use RowDataPacket[] instead of IUser[]
    const userRows: IUser[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        pseudo: row.pseudo,
        email: row.email,
        password: row.password,
        created_at: row.created_at,
        is_admin : row.is_admin
      };
    });

    return userRows.length ? userRows[0] : null;
  },

  async findUserByEmail(email: string): Promise<IUser | null> {
    const query: QueryOptions = {
      sql: 'SELECT * FROM users WHERE email = ? LIMIT 1',
      values: [email],
    };

    const [rows] = await pool.query<RowDataPacket[]>(query); 
    const userRows: IUser[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        pseudo: row.pseudo,
        email: row.email,
        password: row.password,
        created_at: row.created_at,
        is_admin : row.is_admin
      };
    });

    return userRows.length ? userRows[0] : null;
  },

  async findAllUsers(): Promise<IUser[]> {
    const query: QueryOptions = { sql: 'SELECT * FROM users' };

    const [rows] = await pool.query<RowDataPacket[]>(query); 
    const userRows: IUser[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        pseudo: row.pseudo,
        email: row.email,
        password: row.password,
        created_at: row.created_at,
        is_admin : row.is_admin,
      };
    });

    return userRows;
  },


  async createUserInDatabase(user : IUser) : Promise<void> 
  {
    const query : QueryOptions = {
      sql: 'INSERT INTO users (pseudo, email, password, created_at, is_admin) VALUES (?, ?, ?, ?, ?)',
      values : [user.pseudo, user.email, user.password, user.created_at, user.is_admin],
    };

    await pool.query(query);
  }
};
