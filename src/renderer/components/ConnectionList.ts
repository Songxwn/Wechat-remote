// src/renderer/components/ConnectionList.ts
import { LitElement, html, css } from 'lit';

class ConnectionList extends LitElement {
  static styles = css`li{cursor:pointer} .name{font-weight:bold} ul{list-style:none;padding:0}`;
  private items: any[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this.items = await (window as any).api.listConfigs();
    this.requestUpdate();
  }

  render() {
    return html`
      <h3>连接列表</h3>
      <ul>
        ${this.items.map(i => html`
          <li @click=${() => this.select(i.id)}>
            <div class="name">${i.name}</div>
            <div>${i.signalingUrl}</div>
          </li>
        `)}
      </ul>
      <button @click=${() => this.refresh()}>刷新</button>
    `;
  }

  select(id: string) {
    this.dispatchEvent(new CustomEvent('select-connection', { detail: { id }, bubbles: true, composed: true }));
  }

  async refresh() {
    this.items = await (window as any).api.listConfigs();
    this.requestUpdate();
  }
}
customElements.define('connection-list', ConnectionList);
export {};
