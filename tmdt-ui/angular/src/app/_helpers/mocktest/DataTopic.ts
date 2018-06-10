import { element } from "protractor";
import { Topic } from "./../../_models/Topic";
import { TopicCreation } from "./../../_models/json/TopicCreation";
import { forEach } from "@angular/router/src/utils/collection";
export class DataTopic {
  public listTopic: Topic[] = [];
  constructor() {
    this.listTopic.push(
      new Topic(
        "CD" + (this.listTopic.length + 1),
        "Lập trình mạng",
        "Không có gì hết ...",
        1
      )
    );
    this.listTopic.push(
      new Topic(
        "CD" + (this.listTopic.length + 1),
        "C#",
        "Không có gì hết ...",
        1
      )
    );
    this.listTopic.push(
      new Topic(
        "CD" + (this.listTopic.length + 1),
        "PHP",
        "Không có gì hết ...",
        1
      )
    );
    this.listTopic.push(
      new Topic(
        "CD" + (this.listTopic.length + 1),
        "Mysql",
        "Không có gì hết ...",
        1
      )
    );
    this.listTopic.push(
      new Topic(
        "CD" + (this.listTopic.length + 1),
        "Oracle",
        "Không có gì hết ...",
        1
      )
    );
  }
  public addTopic(topic: TopicCreation): Topic {
    const topic_tmp = new Topic(
      "CD" + (this.listTopic.length + 1),
      topic.topicName,
      topic.topicDescription,
      topic.topicStatus
    );
    this.listTopic.push(topic_tmp);
    return topic_tmp;
  }
  public deleteTopic(topicId: string): boolean {
    for (let index = 0; index < this.listTopic.length; index++) {
      const element = this.listTopic[index];
      if (element.$topicID === topicId) {
        this.listTopic.slice(index, index + 1);
        return true;
      }
    }
    return false;
  }
  public getAllTopic(): Topic[] {
    return this.listTopic;
  }
  public getTopicByID(topicID: string): Topic {
    for (let index = 0; index < this.listTopic.length; index++) {
      const element = this.listTopic[index];
      if (element.$topicID === topicID) {
        return element;
      }
    }
    return null;
  }
  public updateTopic(topic: Topic): Topic {
    for (let index = 0; index < this.listTopic.length; index++) {
      const item = this.listTopic[index];
      if (item.$topicID === topic.$topicID) {
        item.$topicDescription = topic.$topicDescription;
        item.$topicName = topic.$topicName;
        item.$topicStatus = topic.$topicStatus;
        return item;
      }
    }
    return null;
  }
}
