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
  workingDay: boolean;
  second: string;
  minute: string;
  hour: string;
  date: string;
  month: string;
  year: string;
  dayOfWeek: string;
}

interface Message {
  id?: number;
  author: string;
  message: string;
  notificationId?: number;
}

export { BotInfo, Notification, Message };
