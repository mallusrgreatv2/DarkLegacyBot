export default interface ClientConfig {
  TOKEN: string;
  MYSQL_DB: string;
  MYSQL_USERNAME: string;
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  CHANGELOG_CHANNEL: number;
  STAFF_ROLE: number;
  INACTIVITY_REQUEST_CHANNEL: number;
  // eslint-disable-next-line semi
}
