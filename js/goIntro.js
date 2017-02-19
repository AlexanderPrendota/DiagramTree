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

}
/*
 model.nodeDataArray =
 [
 { key: "1",  parent: "0",  name: "Don Meow"},
 { key: "2", parent: "1", name: "Demeter"},
 { key: "3", parent: "1", name: "Copricat" },
 { key: "4", parent: "3", name: "Jellylorum" },
 { key: "5", parent: "3", name: "Alonzo" },
 { key: "6", parent: "2", name: "Munkustrap" }

 ];
 */