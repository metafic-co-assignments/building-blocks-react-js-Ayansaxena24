import { Message } from '../Message';

export default class GetEntityMessage extends Message {
  public static id = 'GetEntityMessage';

  public endpoint: string;

  public headers: string;

  constructor(endpoint: string, headers: string) {
    super(GetEntityMessage.id);
    this.endpoint = endpoint;
    this.headers = headers;
  }
}
