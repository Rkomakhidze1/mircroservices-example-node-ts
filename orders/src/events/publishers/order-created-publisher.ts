import { Publisher, OrderCreatedEvent, Subjects } from '@ticket-store/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
