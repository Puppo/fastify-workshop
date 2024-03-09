import {NotFoundError} from "../errors/NotFoundError";
import {PaginatedResult, Pagination, Speaker, Workshop} from "../models";
import {WorkshopRepository} from "../repositories/WorkshopRepository";
import {SpeakerService} from "./SpeakerServices";

export class WorkshopService {

  constructor(
    private readonly workshopRepository: WorkshopRepository,
    private readonly speakerService: SpeakerService
  ) {}

  async getWorkshops(
    speakerId: Speaker['id'],
    pagination: Pagination
  ): Promise<PaginatedResult<Workshop>> {
    return this.workshopRepository.getWorkshops(
      await this.speakerService.getSpeakerById(speakerId),
      pagination
    );
  }

  async createWorkshop(speakerId: Speaker['id'], workshop: Omit<Workshop, 'id'>): Promise<Workshop> {
    return this.workshopRepository.createWorkshop(
      await this.speakerService.getSpeakerById(speakerId),
      workshop
    );
  }

  async deleteWorkshop(speakerId: Speaker['id'], id: Workshop['id']): Promise<Workshop> {
    const deletedWorkshop = await this.workshopRepository.deleteWorkshop(
      await this.speakerService.getSpeakerById(speakerId),
      id
    );

    this.assertWorkshopExists(deletedWorkshop, id);

    return deletedWorkshop;
  }

  private assertWorkshopExists(workshop: Workshop | null, id: Workshop['id']): asserts workshop is Workshop {
    if (!workshop) {
      throw new NotFoundError(`Workshop with id ${id} not found`);
    }
  }
}