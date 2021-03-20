import { Publisher, Subjects, TicketUpdatedEvent } from '@ticket-store/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
