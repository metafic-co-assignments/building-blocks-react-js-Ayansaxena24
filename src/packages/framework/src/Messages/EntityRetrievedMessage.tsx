import { Message } from '../Message';

export default class EntityRetrievedMessage<Entity> extends Message {
  public static id = 'EntityRetrievedMessage';

  entity: Entity;

  constructor(entity: Entity) {
    super(EntityRetrievedMessage.id);
    this.entity = entity;
  }
}
