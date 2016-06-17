function singleDimension(layout,dimensionLabels,measureLabels) {
	// body...

	var newMatrix = [];


		// I'm going to loop over the first dimension
		var colors=[];
		colors = layout.vars.bar.fillColor.split(",");

        var data = makeSingleDimension (layout.qHyperCube.qDataPages[0].qMatrix, 
        	                            layout.qHyperCube.qDimensionInfo[0].qFallbackTitle, 
        	                            colors[0],
        	                            dimensionLabels.length, 
        	                            measureLabels.length,
        	                            layout.chart
        	                            );



		newMatrix.push(data);

	return newMatrix;
}


function doubleDimension (layout,dimensionLabels,measureLabels) {
    

    var data = [];
    var tmpRow = [];
    var newMatrix = [];

    console.log(layout);

		// I'm going to loop over the first dimension
	var colors=[];
	colors = layout.vars.bar.fillColor.split(",");
	var dimNum=0;


    var dimPre = '';
    var orderDim = layout.qHyperCube.qEffectiveInterColumnSortOrder[0];


    $.each(layout.qHyperCube.qDataPages[0].qMatrix, function(key, row){



    	if(row[orderDim].qText != dimPre) {

    		if(dimPre != '') {
		        var SingleData = makeSingleDimension (data, 
		        	                            dimPre, 
		        	                            colors[dimNum++],
		        	                            1, 
		        	                            1,
		        	                            layout.chart
		        	                            );
		        newMatrix.push(SingleData);
	        }


    		dimPre = row[orderDim].qText;  
    		data = [];	
    	}
    	tmpRow = [];
    	if(orderDim == 1)
    	    tmpRow.push(row[0]);
    	else
    	    tmpRow.push(row[1]);

    	tmpRow.push(row[2]);  
    	data.push(tmpRow);
    	//dimNum++;

    });

	return newMatrix;
}


function makeSingleDimension (ArrayValue, dimName, color,numDim, numMes, chartType) {

	//console.log(dimName);
	console.log(chartType);

	var data={};


		var data = {
			type: chartType,
			name: dimName,
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

			var myData = {y: mes[0]/1, label : dim[numDim-1]};
				data.dataPoints.push(myData);
		});

	return data;
}

