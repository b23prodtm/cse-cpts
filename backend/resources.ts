export const RESOURCE_NAMES = {
  database: "retool_db_or_postgres",
  storage: "retool_storage_private",
  googleDocs: "google_workspace_cse_docs",
} as const;

export interface BackendContext {
  actorEmail: string;
  now: string;
}
