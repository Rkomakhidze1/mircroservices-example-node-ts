import { Publisher, Subjects, TicketCreatedEvent } from '@ticket-store/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
