<template>
  <div id="short">
    <h1>最短路径问题游戏</h1>
    <div class="graph-container">
      <svg ref="svgContainer" width="800" height="600"></svg>
    </div>
    <div class="controls">
      <button @click="generateGraph">生成图</button>
      <button @click="findShortestPath">找最短路径</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      svgContainer: null,
      graph: [],
      nodeCount: 7,
      nodes: []
    };
  },
  methods: {
    generateGraph() {
      this.graph = Array.from({ length: this.nodeCount }, () => Array(this.nodeCount).fill(Infinity));

      for (let i = 0; i < this.nodeCount; i++) {
        let connections = 0;
        const potentialConnections = Array.from({ length: this.nodeCount }, (_, index) => index).filter(index => index !== i && (i !== 0 || index !== 6) && (i !== 6 || index !== 0));

        while (connections < 1 || (connections < 3 && Math.random() > 0.5)) {
          if (potentialConnections.length === 0) break;
          const j = potentialConnections.splice(Math.floor(Math.random() * potentialConnections.length), 1)[0];
          const weight = Math.floor(Math.random() * 10) + 1;
          this.graph[i][j] = weight;
          this.graph[j][i] = weight;
          connections++;
        }
      }

      this.drawGraph();
    },
    drawGraph() {
      const svg = this.svgContainer;
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      this.nodes = Array.from({ length: this.nodeCount }, (_, i) => ({
        x: Math.random() * 780 + 10,
        y: Math.random() * 580 + 10,
      }));

      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = i + 1; j < this.nodeCount; j++) {
          if (this.graph[i][j] !== Infinity) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', this.nodes[i].x);
            line.setAttribute('y1', this.nodes[i].y);
            line.setAttribute('x2', this.nodes[j].x);
            line.setAttribute('y2', this.nodes[j].y);
            line.setAttribute('stroke', 'black');
            svg.appendChild(line);

            const weightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            weightText.setAttribute('x', (this.nodes[i].x + this.nodes[j].x) / 2);
            weightText.setAttribute('y', (this.nodes[i].y + this.nodes[j].y) / 2);
            weightText.setAttribute('font-size', '14px');
            weightText.setAttribute('fill', 'red');
            weightText.textContent = this.graph[i][j];
            svg.appendChild(weightText);
          }
        }
      }

      this.nodes.forEach((node, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 15);
        circle.setAttribute('fill', 'blue');
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '12px');
        text.setAttribute('font-weight', 'bold');
        text.textContent = index;
        svg.appendChild(text);
      });
    },
    dijkstra(graph, startNode) {
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
    },
    findShortestPath() {
      const startNode = 0;
      const endNode = this.nodeCount - 1;
      const distances = this.dijkstra(this.graph, startNode);

      this.drawShortestPath(startNode, endNode, distances);
    },
    drawShortestPath(startNode, endNode, distances) {
      const svg = this.svgContainer;

      const path = [startNode, ...this.findPathNodes(startNode, endNode, distances), endNode];

      path.forEach((node, index) => {
        if (index < path.length - 1) {
          const nextNode = path[index + 1];
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', this.nodes[node].x);
          line.setAttribute('y1', this.nodes[node].y);
          line.setAttribute('x2', this.nodes[nextNode].x);
          line.setAttribute('y2', this.nodes[nextNode].y);
          line.setAttribute('stroke', 'red');
          line.setAttribute('stroke-width', 2);
          svg.appendChild(line);
        }
      });
    },
    findPathNodes(startNode, endNode, distances) {
      const path = [];
      let currentNode = endNode;
      while (currentNode !== startNode) {
        let minDistance = Infinity;
        let minNode = null;
        for (let i = 0; i < this.nodeCount; i++) {
          if (this.graph[currentNode][i] !== Infinity && distances[i] < minDistance) {
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
  },
  mounted() {
    this.svgContainer = this.$refs.svgContainer;
  }
};
</script>

<style>
#short {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

.graph-container {
  margin: 20px auto;
  border: 1px solid #ccc;
  width: 800px;
  height: 600px;
  /* position: relative; */
}

.controls {
  margin: 20px;
}
</style>