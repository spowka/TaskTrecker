export class LogModel {
  constructor(
    public title: string,
    public difficulty: string,
    public subject: string,
    public paragraph: string,
    public level: string,
    public descriptionText: string,
    public interchange: Array<{ question: string, answer: string }>,
    public id: string
  ) {}
}
