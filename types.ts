
export enum WebFramework {
  FLASK = 'Flask',
  DJANGO = 'Django'
}

export enum DatabaseType {
  POSTGRES = 'PostgreSQL',
  MYSQL = 'MySQL',
  SQLITE = 'SQLite',
  NONE = 'None'
}

export interface ProjectConfig {
  framework: WebFramework;
  database: DatabaseType;
  useNginx: boolean;
  useRedis: boolean;
  pythonVersion: string;
  entryPoint: string;
  projectName: string;
}

export interface GeneratedFile {
  name: string;
  content: string;
  language: string;
}

export interface DockerizationResult {
  files: GeneratedFile[];
  explanation: string;
}
