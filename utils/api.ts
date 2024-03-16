let xTransmissionSessionId = "";

export async function callTransmissionRpc(
  method: string,
  args: Record<string, any>
) {
  const response = await fetch("http://192.168.50.33:9091/transmission/rpc", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${btoa("username:password")}`,
      "X-Transmission-Session-Id": xTransmissionSessionId,
    },
    body: JSON.stringify({ method, arguments: args }),
  });
  if (response.status === 409) {
    xTransmissionSessionId =
      response.headers.get("X-Transmission-Session-Id") ?? "";
    return callTransmissionRpc(method, args);
  }
  const text = await response.text();
  console.log("POST", method, args, text);
  return JSON.parse(text);
}
