// src/main/types.ts
export type SelkiesConnection = {
  id: string;
  name: string;
  signalingUrl: string;      // 如 https://host:3001 或 wss://host/signal
  token?: string;            // Bearer/Session Token
  username?: string;         // 可选基础认证
  password?: string;
  useHttps: boolean;
  stunServers?: string[];
  turnServers?: { urls: string[]; username?: string; credential?: string; }[];
  video: { bitrateKbps?: number; fps?: number; resolution?: '720p'|'1080p'|'1440p'|'4k'|'custom'; width?: number; height?: number; };
  audio: { enabled: boolean; bitrateKbps?: number; echoCancellation?: boolean; noiseSuppression?: boolean; };
  input: { captureKeyboard: boolean; captureMouse: boolean; clipboardSync: boolean; };
  reconnect: { enabled: boolean; maxRetries: number; backoffMs: number; };
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
