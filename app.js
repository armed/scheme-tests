var svg = d3.select('body')
  .append('svg')
    .attr('width', '100%')
    .attr('height', '100%');

d3.json('data.json', function(error, graph) {
  var g = new dagreD3.Digraph();

  graph.links.forEach(function (l) {
    var left = graph.nodes[l.left],
        right = graph.nodes[l.right];

    left.label = left.description;
    right.label = right.description;

    if (!g.hasNode(l.left)) {
      g.addNode(l.left, left);
    }
    if (!g.hasNode(l.right)) {
      g.addNode(l.right, right);
    }
    // l.label = l.description;
    g.addEdge(null, l.left, l.right, l);
  });

  var renderer = new dagreD3.Renderer();
  var layout = renderer.run(g, svg.append('g'));

  // Add zoom behavior
  d3.select("svg").call(d3.behavior.zoom().on("zoom", function() {
    var ev = d3.event;
    svg.select("g")
      .attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
  }));
});
