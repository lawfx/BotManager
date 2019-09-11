export interface BotInfo {
  author: string;
  avatarURL: string;
  uptime: number;
  status: number;
  username: string;
  description: string;
}

export interface Notification {
  id: number;
  name: string;
  author: string;
  workingDay: boolean;
  second: string;
  minute: string;
  hour: string;
  date: string;
  month: string;
  year: string;
  dayOfWeek: string;
}
