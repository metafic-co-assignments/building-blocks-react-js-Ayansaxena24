import { Message } from '../Message';

export default class NavigationMessage extends Message {
  public static id = 'NavigationMessage';

  public navigation: any = null;

  public target = '';

  public raise: any = null;

  constructor(navigation: any, target: string, raise: any = null) {
    super(NavigationMessage.id);
    this.navigation = navigation;
    this.target = target;
    this.raise = raise;
  }
}
