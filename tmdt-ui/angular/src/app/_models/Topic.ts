export class Topic {
  private topicID: string;
  private topicName: string;
  private topicDescription: string;
  private topicStatus: number;

  constructor(
    topicID: string,
    topicName: string,
    topicDescription: string,
    topicStatus: number
  ) {
    this.topicID = topicID;
    this.topicName = topicName;
    this.topicDescription = topicDescription;
    this.topicStatus = topicStatus;
  }
  public get $topicID(): string {
    return this.topicID;
  }

  public set $topicID(value: string) {
    this.topicID = value;
  }

  public get $topicDescription(): string {
    return this.topicDescription;
  }

  public set $topicDescription(value: string) {
    this.topicDescription = value;
  }

  public get $topicStatus(): number {
    return this.topicStatus;
  }

  public set $topicStatus(value: number) {
    this.topicStatus = value;
  }

  public get $topicName(): string {
    return this.topicName;
  }

  public set $topicName(value: string) {
    this.topicName = value;
  }
}
