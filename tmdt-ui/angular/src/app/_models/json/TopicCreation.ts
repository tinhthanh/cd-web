export class TopicCreation {
  topicName: string;
  topicDescription: string;
  topicStatus: number;
  constructor(
    topicName: string,
    topicDescription: string,
    topicStatus: number
  ) {
    this.topicName = topicName;
    this.topicDescription = topicDescription;
    this.topicStatus = topicStatus;
  }
}
