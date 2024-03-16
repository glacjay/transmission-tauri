export type Torrent = {
  id: number;
  name: string;
  percentDone: number;
  status: number;
  downloadDir: string;
  files: { name: string }[];
};
