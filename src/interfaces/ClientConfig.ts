export default interface ClientConfig {
  TOKEN: string;
  MYSQL_DB: string;
  MYSQL_USERNAME: string;
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  CHANGELOG_CHANNEL: string;
  STAFF_ROLE: string;
  INACTIVITY_REQUEST_CHANNEL: string;
  // eslint-disable-next-line semi
}
