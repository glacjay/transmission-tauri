let xTransmissionSessionId = "";

export async function callTransmissionRpc(
  method: string,
  args: Record<string, any>
) {
  const response = await fetch("http://127.0.0.1:9091/transmission/rpc", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-Transmission-Session-Id": xTransmissionSessionId,
    },
    body: JSON.stringify({ method, arguments: args }),
  });
  if (response.status === 409) {
    xTransmissionSessionId =
      response.headers.get("X-Transmission-Session-Id") ?? "";
    return callTransmissionRpc(method, args);
  }
  return await response.json();
}
