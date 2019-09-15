interface BotInfo {
  author: string;
  avatarURL: string;
  uptime: number;
  status: number;
  username: string;
  description: string;
}

interface Notification {
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

interface Message {
  id?: number;
  author: string;
  message: string;
  notificationId?: number;
}

export { BotInfo, Notification, Message };
