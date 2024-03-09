import {PostgresDb} from "@fastify/postgres";
import {PaginatedResult, Pagination, Speaker, Workshop} from "../../applications/models";
import {WorkshopRepository} from "../../applications/repositories/WorkshopRepository";

export type WorkshopTable = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  speaker_id: number;
}

export class WorkshopDao implements WorkshopRepository {

  constructor(
    private readonly db: PostgresDb
  ) {}

  async getWorkshops(speaker: Speaker, { limit, offset }: Pagination): Promise<PaginatedResult<Workshop>> {
    const [{
      rows: data,
    }, {
      rows: [{count}]
    }] = await Promise.all([
      this.db.query<WorkshopTable>(`SELECT * FROM workshops WHERE speaker_id = $1 LIMIT $2 OFFSET $3`, [speaker.id, limit, offset]),
      this.db.query<{count: number}>('SELECT COUNT(*) FROM workshops WHERE "speaker_id" = $1', [speaker.id])
    ]);

    return {
      count,
      data: data.map(this.mapToWorkshop, this)
    };
  }

  async createWorkshop(speaker: Speaker, workshop: Omit<Workshop, "id">): Promise<Workshop> {
    const {
      rows: [newWorkshop]
    } = await this.db.query<WorkshopTable>(
      `INSERT INTO workshops
        (title, description, start_time, end_time, speaker_id)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        workshop.title,
        workshop.description,
        new Date(workshop.startTime),
        new Date(workshop.endTime),
        speaker.id
      ]
    );

    return this.mapToWorkshop(newWorkshop)
  }
  async deleteWorkshop(speaker: Speaker, workshopId: Workshop['id']): Promise<Workshop | null> {
    const {
      rows: [workshop]
    } = await this.db.query<WorkshopTable>(
      'DELETE FROM workshops WHERE id = $1 AND speaker_id = $2 RETURNING *',
      [workshopId, speaker.id]
    );

    return workshop ? this.mapToWorkshop(workshop) : null;
  }

  private mapToWorkshop(workshop: WorkshopTable): Workshop {
    return {
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      startTime: workshop.start_time,
      endTime: workshop.end_time
    };
  }

}