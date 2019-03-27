export class CardAction {
  constructor(
    public action: string,
    public icon: string,
    public color: string
  ) {}

  static readonly Edit = new CardAction('edit', 'marker', 'secondary');
  static readonly Delete = new CardAction('delete', 'trash', 'danger');
  static readonly View = new CardAction('view', 'eye', 'secondary');
}
