// src/renderer/app.ts
import './components/ConnectionList.js';
import './components/ConnectionForm.js';
import './components/LaunchPanel.js';

const app = document.getElementById('app')!;
app.innerHTML = `
  <div style="display:flex; height:100vh;">
    <div style="width:300px; border-right:1px solid #ddd; padding:12px;">
      <connection-list></connection-list>
      <hr/>
      <connection-form></connection-form>
    </div>
    <div style="flex:1; padding:12px;">
      <launch-panel></launch-panel>
    </div>
  </div>
`;
