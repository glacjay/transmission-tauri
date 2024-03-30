'use client';

import { callTransmissionRpc } from '@/utils/api';
import { Torrent } from './Torrent';
import { RevealingButton } from './RevealingButton';
import useSWR from 'swr';
import { useMemo } from 'react';

export default function Page() {
  const { data, error } = useSWR(
    [
      'torrent-get',
      { fields: ['id', 'name', 'addedDate', 'percentDone', 'status', 'downloadDir', 'files'] },
    ],
    ([url, args]) => callTransmissionRpc(url, args),
    { refreshInterval: 2000 },
  );
  const torrents = useMemo(
    () => (data?.arguments.torrents as Torrent[])?.sort((a, b) => b.addedDate - a.addedDate),
    [data],
  );

  if (error) throw new Error(error);
  if (data && data.result !== 'success') throw new Error(data.result);

  return (
    <main style={{}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {torrents?.map((torrent: Torrent, i: number) => (
          <TorrentItem key={torrent.id} torrent={torrent} index={i} />
        ))}
      </div>
    </main>
  );
}

function TorrentItem({ torrent, index }: { torrent: Torrent; index: number }) {
  return (
    <div
      className="flex-row align-center"
      style={{ background: index % 2 === 0 ? '#f7f7f7' : 'white', padding: 8 }}
    >
      <TorrentStatus status={torrent.status} />

      <div className="flex-column" style={{ flex: 1 }}>
        <div>{torrent.name}</div>
        <div style={{ height: 16, border: '1px solid lightgray' }}>
          <div
            style={{
              width: `${torrent.percentDone * 100}%`,
              height: '100%',
              background: 'lightgreen',
            }}
          ></div>
        </div>
        <div>files count: {torrent.files.length}</div>
        <div>
          path: {torrent.downloadDir}/{torrent.files[0]?.name.replace(/\/.*/, '')}
        </div>
      </div>
      <RevealingButton
        path={`${torrent.downloadDir}/${torrent.files[0]?.name.replace(/\/.*/, '')}`}
      />
    </div>
  );
}

function TorrentStatus({ status }: { status: number }) {
  return (
    <div style={{ padding: 8 }}>
      {
        // convert status number to TorrentStatus text
        status === 0
          ? 'STOPPED'
          : status === 1
          ? 'CHECK_WAIT'
          : status === 2
          ? 'CHECK'
          : status === 3
          ? 'DOWNLOAD_WAIT'
          : status === 4
          ? 'DOWNLOAD'
          : status === 5
          ? 'SEED_WAIT'
          : status === 6
          ? 'SEED'
          : 'ISOLATED'
      }
    </div>
  );
}
