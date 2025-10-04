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
