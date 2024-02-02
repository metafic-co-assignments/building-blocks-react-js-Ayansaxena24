import { Message } from '../Message';

export default class PostEntityMessage extends Message {
  public static id = 'PostEntityMessage';

  public endpoint: string;

  public headers: string;

  public body: string;

  constructor(endpoint: string, headers: string, body: string) {
    super(PostEntityMessage.id);
    this.endpoint = endpoint;
    this.headers = headers;
    this.body = body;
  }
}
