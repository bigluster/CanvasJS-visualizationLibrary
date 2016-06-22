var Gapp=null;

function singleDimension(layout,dimensionLabels,measureLabels,app) {
	// body...

	var newMatrix = [];
	var newMatrix = [];
	Gapp = app;


		// I'm going to loop over the first dimension
		var colors=[];
		colors = layout.vars.bar.fillColor.split(",");

        var data = makeSingleDimension (layout.qHyperCube.qDataPages[0].qMatrix, 
        	                            layout.qHyperCube.qDimensionInfo[0].qFallbackTitle, 
        	                            colors[0],
        	                            dimensionLabels.length, 
        	                            measureLabels.length,
        	                            layout.chart,
        	                            app,
        	                            0,
        	                            dimensionLabels.length-1
        	                            );



		newMatrix.push(data);


	return newMatrix;
}


function doubleDimension (layout,dimensionLabels,measureLabels,app) {

	console.log("Sono nella doubleDimension"); 
    var pair = [];
    var tmpRow = [];
    var newMatrix = [];
    var data={};

    var cont=0;

	var colors=[];
	colors = layout.vars.bar.fillColor.split(",");


    // I need to know which is the first dimension to organize the data. 
    // layout.qHyperCube.qEffectiveInterColumnSortOrder is an array with the right order of dimension and measure
    // I check if the first field is a measure, I get the second field, the real first dimension
    if(layout.qHyperCube.qEffectiveInterColumnSortOrder[0] == dimensionLabels.length)
    	var orderDim = layout.qHyperCube.qEffectiveInterColumnSortOrder[1];
    else
    	var orderDim = layout.qHyperCube.qEffectiveInterColumnSortOrder[0];


    $.each(layout.qHyperCube.qDataPages[0].qMatrix, function(key, row){

    	if(data[row[orderDim].qText] == undefined)
    		data[row[orderDim].qText] = [];

    	if(orderDim == 1)
    	    tmpRow.push(row[0]);
    	else
    	    tmpRow.push(row[1]);

    	tmpRow.push(row[2]);  

    	data[row[orderDim].qText].push(tmpRow);
    	tmpRow=[];

    });

     $.each(data, function(key, row){

		    var SingleData = makeSingleDimension (row, 
		        	                            key, 
		        	                            colors[cont++],
		        	                            1, 
		        	                            1,
		        	                            layout.chart,
		        	                            app,
		        	                            0,
		        	                            0
		        	                            );
		    newMatrix.push(SingleData);

     });



    //console.log(data);
    return newMatrix;
}


function doubleMeasure(layout,dimensionLabels,measureLabels,app){

	var newMatrix = [];
	Gapp = app;

		// I'm going to loop over the first dimension
		var colors=[];
		colors = layout.vars.bar.fillColor.split(",");

        var data = makeSingleDimension (layout.qHyperCube.qDataPages[0].qMatrix, 
        	                            layout.qHyperCube.qMeasureInfo[0].qFallbackTitle, 
        	                            colors[0],
        	                            dimensionLabels.length, 
        	                            measureLabels.length,
        	                            layout.chart,
        	                            app,
        	                            0,0
        	                            );


        var secondAxix = makeSingleDimension (layout.qHyperCube.qDataPages[0].qMatrix, 
        	                            layout.qHyperCube.qMeasureInfo[1].qFallbackTitle, 
        	                            colors[4],
        	                            dimensionLabels.length, 
        	                            measureLabels.length,
        	                            layout.chart,
        	                            app,
        	                            1,0
        	                            );


        secondAxix['axisYType']="secondary";

		newMatrix.push(data);
		newMatrix.push(secondAxix);


	return newMatrix;	 

}


function makeSingleDimension (ArrayValue, dimName, color,numDim, numMes, chartType,app,mesOrd,ordDim) {

	//console.log(ArrayValue);
	
	var data={};

		if((chartType == 'pie') || (chartType=='doughnut'))
			var data = {
				type: chartType,
				dataPoints: []
			};
		else
			var data = {
				type: chartType,
				name: dimName,
				toolTipContent: "<strong>{name}</strong> {y} ({label})",
				showInLegend: true,
				color: color,
				dataPoints: []
			};


		$.each(ArrayValue, function(key, row){

			// I'm going to read all dimension fields
			var dim=[];
			for(var i=0; i<numDim; i++) {
				dim.push(row[i].qText);
			}

			// I'm going to read all measures. Note, measures are just after all dimensions.
			var mes=[];
			for(var i=numDim; i<numDim+numMes; i++){
				mes.push(row[i].qText);
			}

			if((chartType == 'pie') || (chartType=='doughnut')) {
				var myData = {y: mes[mesOrd]/1, indexLabel : dim[ordDim], legendText:dim[ordDim]};
			}
			else
			{
				var myData = {y: mes[mesOrd]/1, label : dim[ordDim], name : dimName};
			}

			data.dataPoints.push(myData);
		});

	return data;
}

/*

	function onClick(e) {
		//alert(  e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
		//me.app.backendApi.selectValues(0, [0,1], false);
		//Gapp.clearAll();
		console.log(e);
		console.log(e.dataPoint.x);
		Gapp.backendApi.selectValues(0, [3-e.dataPoint.x], true);
	}
	*/