import {PostgresDb} from "@fastify/postgres";
import {PaginatedResult, Pagination, Speaker} from "../../applications/models";
import {SpeakerRepository} from "../../applications/repositories/SpeakerRepository";

export type SpeakerTable = {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export class SpeakerDao implements SpeakerRepository {

  constructor(
    private readonly db: PostgresDb
  ) {}

  async getSpeakers({limit, offset}: Pagination): Promise<PaginatedResult<Speaker>> {
    const [{ rows: data }, { rows: [{ count }] }] = await Promise.all([
      this.db.query<SpeakerTable>('SELECT * FROM speakers LIMIT $1 OFFSET $2', [limit, offset]),
      this.db.query<{ count: number }>('SELECT count(*) as count FROM speakers')
    ]);
    return {
      count,
      data
    };
  }

  async getSpeakerById(id: number): Promise<Speaker | null> {
    const {
      rows: [speaker]
    } = await this.db.query<SpeakerTable>('SELECT * FROM speakers WHERE id = $1', [id]);
    return speaker;
  }

  async createSpeaker(speaker: Omit<Speaker, "id">): Promise<Speaker> {
    const { rows: [newSpeaker] } = await this.db.query<SpeakerTable>(
      'INSERT INTO speakers (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [speaker.name, speaker.email, speaker.bio]
    );
    return newSpeaker;
  }

  async updateSpeaker(id: number, speaker: Partial<Omit<Speaker, "id">>): Promise<Speaker | null> {
    const { columns, values } = Object.entries(speaker).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc.columns.push(key);
        acc.values.push(value);
      }
      return acc;
    }, {
      columns: [] as string[],
      values: [] as unknown[]
    });
    const {
      rows: [updatedSpeaker]
    } = await this.db.query<Speaker>(
      `UPDATE speakers SET ${columns.map((c, idx) => `${c} = $${idx + 2}`)} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return updatedSpeaker;
  }
  async deleteSpeaker(id: number): Promise<Speaker | null> {
    const {
      rows: [speaker]
    } = await this.db.query('DELETE FROM speakers WHERE id = $1 RETURNING *', [id]);

    return speaker;
  }

}