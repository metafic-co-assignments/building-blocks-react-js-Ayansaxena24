import { Message } from '../Message';

export default class MakeApiRequestMessage extends Message {
  public static id = 'MakeApiRequestMessage';

  public headers: string;

  constructor(endpoint: string, headers: string) {
    super(MakeApiRequestMessage.id);
    // this.endpoint = endpoint;
    // this.headers = headers;
  }
}
