interface INotificationModel {
  id: number;
  name: string;
  location: string;
  type: string;
  date: string;
  finish: string;
  link: string;
  text_link: string;
  is_fan_id: boolean;
  event: IEventNotificationModel
}

interface IEventNotificationModel {
  date: string,
  finish: string,
  id: number,
  is_fan_id: boolean,
  link: string,
  location: string,
  name: string,
  text_link: string,
  type: string
}

export interface INotificationData {
  message: string;
  model: INotificationModel;
}

export interface INotification {
  id: string;
  data: INotificationData;
  read_at: string | null;
}

export interface GetNotificationsArgs {
  data: INotification[];
}
