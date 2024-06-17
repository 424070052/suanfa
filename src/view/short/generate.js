// generate.js

export function generateGraph(nodeCount) {
  const graph = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(Infinity));

  for (let i = 0; i < nodeCount; i++) {
    let connections = 0;
    const potentialConnections = Array.from({ length: nodeCount }, (_, index) => index).filter(index => index !== i);

    while (connections < 1 || (connections < 3 && Math.random() > 0.5)) {
      if (potentialConnections.length === 0) break;
      const j = potentialConnections.splice(Math.floor(Math.random() * potentialConnections.length), 1)[0];
      const weight = Math.floor(Math.random() * 10) + 1;
      graph[i][j] = weight;
      graph[j][i] = weight;
      connections++;
    }
  }

  return graph;
}
