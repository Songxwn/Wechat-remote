async function loadConnections() {
  const connections = await window.electronAPI.getConnections();
  const list = document.getElementById('connection-list');
  list.innerHTML = '';
  connections.forEach(conn => {
    const li = document.createElement('li');
    li.textContent = `${conn.name} (${conn.url})`;
    li.onclick = () => window.open(conn.url + `?user=${conn.username}&pass=${conn.password}`);
    list.appendChild(li);
  });
}

async function addConnection() {
  const name = prompt("连接名称：");
  const url = prompt("URL：");
  const username = prompt("账号：");
  const password = prompt("密码：");
  let connections = await window.electronAPI.getConnections();
  connections.push({ name, url, username, password });
  await window.electronAPI.saveConnections(connections);
  loadConnections();
}

loadConnections();
