// src/renderer/components/LaunchPanel.ts
import { LitElement, html } from 'lit';

class LaunchPanel extends LitElement {
  private selectedId: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('select-connection', ((e: Event) => {
      const id = (e as CustomEvent).detail.id;
      this.selectedId = id;
      this.requestUpdate();
    }) as EventListener);
  }

  render() {
    return html`
      <h3>启动会话</h3>
      ${this.selectedId
        ? html`
          <p>已选择：${this.selectedId}</p>
          <button @click=${()=>this.launch()}>启动</button>
          <button @click=${()=>this.close()}>关闭</button>
        `
        : html`<p>未选择连接。</p>`}
    `;
  }

  async launch() {
    if (!this.selectedId) return;
    await (window as any).api.launchSession(this.selectedId);
  }

  close() {
    (window as any).api.closeSession();
  }
}
customElements.define('launch-panel', LaunchPanel);
export {};
