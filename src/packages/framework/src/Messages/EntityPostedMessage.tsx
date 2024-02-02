import { Message } from '../Message';

export default class EntityPostedMessage extends Message {
  public static id = 'EntityPostedMessage';

  entityId: string;

  constructor(entityId: string) {
    super(EntityPostedMessage.id);
    this.entityId = entityId;
  }
}
