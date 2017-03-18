/**
 * Created by aleksandrprendota on 18.03.17.
 */
const goes = require('gojs');
var nrc = require('node-run-cmd');
var smalltalk = require('smalltalk');

var goJsMake = goes.GraphObject.make;

var myDiagram = null;
var myPalette = null;


function cleanup() {
    if (myPalette) {
        myPalette.clear();
        myPalette.div = null;
    }

    if (myDiagram) {
        myDiagram.clear();
        myDiagram.div = null;
    }
    myPalette = null;
    myDiagram = null;
}

function goIntro(data) {
    cleanup();
    myDiagram =
        goJsMake(goes.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: goes.Spot.Center,
                "undoManager.isEnabled": true,

                layout: goJsMake(goes.TreeLayout,
                    { angle: 90, layerSpacing: 35 })
            });

    myDiagram.undoManager.isEnabled = true;

    myDiagram.nodeTemplate =
        goJsMake(goes.Node, "Horizontal",
            goJsMake(goes.Shape, "RoundedRectangle",
                {  width: 40, height: 40 ,fill: "#3498DB" },
                new goes.Binding("fill", "color"),
                { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
            goJsMake(goes.TextBlock, "Text",
                { margin: 12, stroke: "black", font: "bold 16px sans-serif" },
                new goes.Binding("text", "name"))
            ,
            {
                contextMenu:
                    goJsMake(goes.Adornment, "Vertical",
                        goJsMake("ContextMenuButton",
                            goJsMake(goes.TextBlock, "DELETE"),
                            { click: showProperties })

                    )
            }
        );

    myDiagram.allowDrop = true;
    myDiagram.allowDragOut = true;

    var model = goJsMake(goes.TreeModel);

    var main = [
        {key: 999, parent: 0, name: "CreateDiagram", color: "#82BF56" },
        {key: 1000, parent: 0, name: "MailSettings", color: "#82BF56" },
        {key: 1001, parent: 0, name: "MainRadar", color: "#82BF56" },
    ];
    model.addNodeData(main[0]);
    model.addNodeData(main[1]);
    model.addNodeData(main[2]);

    for (var i = 0; i < data.length; i++) {
        model.addNodeData(data[i]);
    }

    myDiagram.model = model;


    myPalette = goJsMake(goes.Palette, "myPaletteDiv");

    myPalette.nodeTemplate =
        goJsMake(goes.Node, "Horizontal",
            goJsMake(goes.Shape,
                { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" },
                { width: 40, height: 40, fill: "white" },
                new goes.Binding("fill", "color")),
            goJsMake(goes.TextBlock,
                new goes.Binding("text", "name"))
        );
    myPalette.allowDrop = true;
    myPalette.allowDragOut = true;
    myPalette.nodeTemplateMap = myDiagram.nodeTemplateMap;

    myPalette.model.nodeDataArray = [
        { name: "Join", color: "IndianRed" },
        { name: "Report-Tool", color: "IndianRed" },
        { name: "Concatinate", color: "IndianRed" },
        { name: "Count", color: "IndianRed" },
        { name: "Sub", color: "IndianRed" },
        { name: "Unite", color: "IndianRed" },
        { name: "Condition", color: "IndianRed" },
        { name: "My-project", color: "IndianRed" },
        { name: "GetMail", color: "IndianRed" },
        { name: "Merge", color: "IndianRed" },
        { name: "Consolidate", color: "IndianRed" }
    ];

    //myDiagram.model.undoManager = myPalette.model.undoManager;
    myDiagram.addDiagramListener("ObjectDoubleClicked",
        function(e) {
            var part = e.subject.part;
            var fileName = part.data.name;
            var color = part.data.color;
            var callback = runCallback,
                data = runDataCallback,
                error = runErrorCallback;

            if (!(part instanceof goes.Link) && fileName) {
                if (color === "IndianRed"){
                    smalltalk.prompt('Enter NEW file name', 'only .xml', fileName+".xml").then(function(value) {
                        if (value != null){
                            nrc.run("cp template/"+fileName+".xml conf/" + value);
                        }
                    },function() {
                        console.log('cancel');
                    });

                } else if(color === "#82BF56") {

                    nrc.run("open conf/" + fileName+".xml");


                } else {
                    console.log('open ' + fileName);
                    nrc.run('open ' + fileName,
                        { onDone: callback ,
                            onError: error,
                            onData: data,
                            detached: true,
                            shell: true})
                }

            }
        });
}

function showProperties(e, obj) {
    var node = obj.part.adornedPart;
    deleteFile(node.data.name, node);
}

function deleteFile(name, node) {
    nrc.run("rm " + name);
    myDiagram.remove(node);
}

function runCallback(code) {
    console.log('command executed. return code: ' + code);
}

function runDataCallback(data) {
    console.log('command returned following data: ' + data);
}

function runErrorCallback(err) {
    console.log('command returned following error: ' + err);
}


