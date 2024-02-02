import { Message } from '../Message';

export default class RestAPIResponceMessage extends Message {
  public static id = 'RestAPIResponceMessage';

  public responce: Response;

  public data: any;

  constructor(responce: Response) {
    super(RestAPIResponceMessage.id);
    this.responce = responce;
    this.data = responce.json;
  }
}
