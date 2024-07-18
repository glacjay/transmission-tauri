export type Torrent = {
  id: number;
  name: string;
  addedDate: number;
  percentDone: number;
  status: number;
  downloadDir: string;
  files: { name: string }[];
  rateDownload: number;
};

export enum TorrentStatus {
  STOPPED = 0,
  QUEUED_TO_VERIFY = 1,
  VERIFYING = 2,
  QUEUED_TO_DOWNLOAD = 3,
  DOWNLOADING = 4,
  QUEUED_TO_SEED = 5,
  SEEDING = 6,
}
