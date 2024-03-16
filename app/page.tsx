import { callTransmissionRpc } from "@/utils/api";
import { Torrent } from "./types";
import { RevealingButton } from "./RevealingButton";

export default async function HomePage() {
  const result = await callTransmissionRpc("torrent-get", {
    fields: ["id", "name", "percentDone", "status", "downloadDir", "files"],
  });

  if (result.result !== "success") {
    throw new Error(result.result);
  }

  return (
    <main style={{}}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {result.arguments.torrents.map((torrent: Torrent, i: number) => (
          <div
            key={torrent.id}
            style={{
              display: "flex",
              flexDirection: "column",
              background: i % 2 === 0 ? "#f7f7f7" : "white",
              padding: 8,
            }}
          >
            <div>{torrent.name}</div>
            <div>{torrent.percentDone}</div>
            <div>{torrent.status}</div>
            <div>{torrent.files.length}</div>
            <div>
              {torrent.downloadDir}/{torrent.files[0]?.name.replace(/\/.*/, "")}
            </div>
            <RevealingButton
              path={`${torrent.downloadDir}/${torrent.files[0]?.name.replace(
                /\/.*/,
                ""
              )}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
