export interface BotInfo {
  author: string;
  avatarURL: string;
  uptime: number;
  status: number;
  username: string;
  description: string;
}

export interface Notification {
  id?: number;
  label: string;
  creator: string;
  active: boolean;
  activeOnHolidays: boolean;
  minute: string;
  hour: string;
  date: string;
  month: string;
  dayOfWeek: string;
}

export interface Message {
  id?: number;
  author: string;
  message: string;
  notificationId?: number;
}

export interface JanuszNotificationDialogData {
  isCreating: boolean;
  notification?: Notification;
}

export interface JanuszMessageDialogData {
  isAdding: boolean;
  message?: Message;
  notificationId?: number;
}
