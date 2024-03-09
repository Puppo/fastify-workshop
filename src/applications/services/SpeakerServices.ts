import {NotFoundError} from "../errors/NotFoundError";
import {PaginatedResult, Pagination, Speaker} from "../models";
import {SpeakerRepository} from "../repositories/SpeakerRepository";

export class SpeakerService {
  constructor(
    private readonly speakerRepository: SpeakerRepository
  ) {}

  getSpeakers(pagination: Pagination): Promise<PaginatedResult<Speaker>> {
    return this.speakerRepository.getSpeakers(pagination);
  }

  async getSpeakerById(id: Speaker['id']): Promise<Speaker> {
    const speaker = await this.speakerRepository.getSpeakerById(id);

    this.assertSpeakerExists(speaker, id);

    return speaker;
  }

  createSpeaker(speaker: Omit<Speaker, 'id'>): Promise<Speaker> {
    return this.speakerRepository.createSpeaker(speaker);
  }

  async updateSpeaker(id: Speaker['id'], speaker: Partial<Omit<Speaker, 'id'>>): Promise<Speaker> {
    const updatedSpeaker = await this.speakerRepository.updateSpeaker(id, speaker);

    this.assertSpeakerExists(updatedSpeaker, id);

    return updatedSpeaker;
  }

  async deleteSpeaker(id: Speaker['id']): Promise<Speaker> {
    const deletedSpeaker = await this.speakerRepository.deleteSpeaker(id);

    this.assertSpeakerExists(deletedSpeaker, id);

    return deletedSpeaker;
  }

  private assertSpeakerExists(speaker: Speaker | null, id: Speaker['id']): asserts speaker is Speaker {
    if (!speaker) {
      throw new NotFoundError(`Speaker with id ${id} not found`);
    }
  }
}