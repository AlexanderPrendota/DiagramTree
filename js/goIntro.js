const go = require('./js/go.js');
var nrc = require('node-run-cmd');


function goIntro(data) {

    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center,
                "undoManager.isEnabled": true,
                layout: $(go.TreeLayout,
                    { angle: 90, layerSpacing: 35 })
            });
    myDiagram.nodeTemplate =
        $(go.Node, "Horizontal",
            { background: "#44CCFF" },
            $(go.TextBlock, "Text",
                { margin: 12, stroke: "black", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
             
        );

    var model = $(go.TreeModel);

    for (var i = 0; i < data.length; i++) {
        model.addNodeData(data[i]);
    }
    myDiagram.model = model;

    myDiagram.addDiagramListener("ObjectDoubleClicked",
    function(e) {
    var part = e.subject.part;
    if (!(part instanceof go.Link)) {
        nrc.run('open ' + part.data.name)
    }
    });

}
