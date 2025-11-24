// src/renderer/components/ConnectionForm.ts
import { LitElement, html } from 'lit';

class ConnectionForm extends LitElement {
  private model = {
    name: '',
    signalingUrl: '',
    token: '',
    useHttps: true,
    video_bitrate: 2500,
    fps: 30
  };

  render() {
    return html`
      <h3>创建/编辑连接</h3>
      <label>名称 <input @input=${(e:any)=>this.model.name=e.target.value}></label>
      <label>信令地址 <input @input=${(e:any)=>this.model.signalingUrl=e.target.value}></label>
      <label>Token <input @input=${(e:any)=>this.model.token=e.target.value}></label>
      <label>启用HTTPS <input type="checkbox" .checked=${this.model.useHttps} @change=${(e:any)=>this.model.useHttps=e.target.checked}></label>
      <label>码率(kbps) <input type="number" .value=${this.model.video_bitrate} @input=${(e:any)=>this.model.video_bitrate=Number(e.target.value)}></label>
      <label>FPS <input type="number" .value=${this.model.fps} @input=${(e:any)=>this.model.fps=Number(e.target.value)}></label>
      <button @click=${()=>this.save()}>保存</button>
    `;
  }

  async save() {
    const id = crypto.randomUUID();
    const conn = {
      id,
      name: this.model.name,
      signalingUrl: this.model.signalingUrl,
      token: this.model.token || undefined,
      useHttps: this.model.useHttps,
      video: { bitrateKbps: this.model.video_bitrate, fps: this.model.fps, resolution: '1080p' },
      audio: { enabled: true },
      input: { captureKeyboard: true, captureMouse: true, clipboardSync: true },
      reconnect: { enabled: true, maxRetries: 10, backoffMs: 1000 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await (window as any).api.saveConfig(conn);
    this.dispatchEvent(new CustomEvent('saved', { bubbles: true, composed: true }));
  }
}
customElements.define('connection-form', ConnectionForm);
export {};
