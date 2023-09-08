export interface ExistsModel<M = undefined> {
  exists: boolean;
  id: string | number;
  model?: M;
  eid?: string;
}
