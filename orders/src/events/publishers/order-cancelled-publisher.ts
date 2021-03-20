import { Subjects, Publisher, OrderCancelledEvent } from '@ticket-store/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
