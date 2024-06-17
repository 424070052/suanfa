// answer.js

export function dijkstra(graph, startNode) {
  const distances = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  distances[startNode] = 0;

  for (let i = 0; i < graph.length - 1; i++) {
    let minDistance = Infinity;
    let minIndex = -1;

    for (let j = 0; j < graph.length; j++) {
      if (!visited[j] && distances[j] <= minDistance) {
        minDistance = distances[j];
        minIndex = j;
      }
    }

    visited[minIndex] = true;

    for (let k = 0; k < graph.length; k++) {
      if (!visited[k] && graph[minIndex][k] !== Infinity && distances[minIndex] + graph[minIndex][k] < distances[k]) {
        distances[k] = distances[minIndex] + graph[minIndex][k];
      }
    }
  }

  return distances;
}

export function findPathNodes(graph, startNode, endNode, distances) {
  const path = [];
  let currentNode = endNode;
  while (currentNode !== startNode) {
    let minDistance = Infinity;
    let minNode = null;
    for (let i = 0; i < graph.length; i++) {
      if (graph[currentNode][i] !== Infinity && distances[i] < minDistance) {
        minDistance = distances[i];
        minNode = i;
      }
    }
    if (minNode !== null) {
      path.unshift(minNode);
      currentNode = minNode;
    } else {
      break;
    }
  }
  return path;
}
