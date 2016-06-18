define( [
			"qlik", 
			"text!./CanvasJS-visualizationLibrary.ng.html", 
			"css!./CanvasJS-visualizationLibrary.css",
			"./js/canvasjs.min",
			"./js/DataHelper",
			"./js/ChartList"
		], function ( qlik, template ) {
		"use strict";
		
	var me = 	
	{
		initialProperties: {
			version: 1.2,
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 4,
					qHeight: 500
				}]
			}
		},


		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min: 1,
					max: 2
				},
				measures: {
					uses: "measures",
					min: 1,
					max: 2
				},
				sorting: {
					uses: "sorting"
				},


				settings : {
					uses : "settings",
					items: {
						general: {
							type: "items",
							label: "General",
							items: {
								ChartDropDown: {
									type: "string",
									component: "dropdown",
									label: "Chart",
									ref: "chart",
									options: chartList,
									defaultValue: "bar"
								},

								AnimationCheckbox: {
									type: "boolean",
									component: "switch",
									label: "Animation",
									ref: "animation",
                                    options: [{
                                        value: true,
                                        label: "On"
									}, {
                                       value: false,
                                        label: "Off"
							        }],
									defaultValue: true
								},
								ToolTipCheckbox: {
									type: "boolean",
									component: "switch",
									label: "ToolTip",
									ref: "tooltip",
                                    options: [{
                                        value: true,
                                        label: "On"
									}, {
                                       value: false,
                                        label: "Off"
							        }],
									defaultValue: true
								},
							},
						},

						title : {
							type: "items",
							label: "In Chart Title",
							items: {
								inChartTitle: {
									type: "string",
									expression: "none",
									label: "In Chart Title",
									defaultValue: "Titolo",
									ref: "title"
								},
								backgroundColor :{
									type: "string",
									expression: "none",
									label: "Title background Color",
									defaultValue: "null",
									ref: "titleBackgroundColor"
								},
								borderColor :{
									type: "string",
									expression: "none",
									label: "Title border Color",
									defaultValue: "black",
									ref: "borderColor"
								},

								cornerRadius :{
									type: "string",
									expression: "none",
									label: "Title corner Radius",
									defaultValue: "0",
									ref: "cornerRadius"
								},

								borderThickness :{
									type: "string",
									expression: "none",
									label: "Title border Thickness",
									defaultValue: 0,
									ref: "borderThickness"
								},

								fontColor :{
									type: "string",
									expression: "none",
									label: "Title font Color",
									defaultValue: "black",
									ref: "fontColor"
								},

								fontFamily :{
									type: "string",
									expression: "none",
									label: "Title font Family",
									defaultValue: "calibri",
									ref: "fontFamily"
								},

								fontSize :{
									type: "string",
									expression: "none",
									label: "Title font Size",
									defaultValue: 20,
									ref: "fontSize"
								},

								fontStyle :{
									type: "string",
									expression: "none",
									label: "Title font Style",
									defaultValue: "normal",
									ref: "fontStyle"
								},

								fontWeight :{
									type: "string",
									expression: "none",
									label: "Title font Weight",
									defaultValue: "normal",
									ref: "fontWeight"
								},
/*
								margin :{
									type: "string",
									expression: "none",
									label: "Title margin",
									defaultValue: 5,
									ref: "margin"
								},

								padding :{
									type: "string",
									expression: "none",
									label: "Title padding",
									defaultValue: 0,
									ref: "padding"
								},
*/
								WrapCheckbox: {
									type: "boolean",
									component: "switch",
									label: "Title Wrap",
									ref: "wrap",
                                    options: [{
                                        value: true,
                                        label: "On"
									}, {
                                       value: false,
                                        label: "Off"
							        }],
									defaultValue: true
								},

								inChartSubtitle: {
									type: "string",
									expression: "none",
									label: "In Chart Subtitle",
									defaultValue: "Titolo",
									ref: "subtitle"
								},
							},
						},

						
						bar: {
							type: "items",
							label: "Bar",
							items: {

								barFillColor: {
									type: "string",
									expression: "none",
									label: "Fill color Separated by comma if stacked bar. If Empty, use default Sense palette",
									defaultValue: "##00FFCD, #4CE5C7, #4CCCB3, #339985, #337F70, #33665C, #194C42, #19332E, #191919, #000000",
									ref: "vars.bar.fillColor"
								},
							},
						},

					}
				}
			}
		}
	};
	
		// Get Engine API app for Selections
	me.app = qlik.currApp(this);
	
	me.snapshot = {
		canTakeSnapshot : true
	};	
	

		me.paint = function($element,layout) {
		    
			$element.append($('<div />;').attr("id", layout.qInfo.qId));
			$("#"+layout.qInfo.qId).css("height", "100%");
		
			console.log(layout);

			var mychart =  {
						toolTip: { enabled: layout.tooltip },
			        	title:
				        {
					        "text": layout.title,
					        "backgroundColor" : layout.titleBackgroundColor,
					        "borderColor" : layout.borderColor,
					        "borderThickness" : layout.borderThickness,
					        "cornerRadius" : layout.cornerRadius,
					        "fontColor" : layout.fontColor,
					        "fontFamily" : layout.fontFamily,
					        "fontSize" : layout.fontSize,
					        "fontStyle" : layout.fontStyle,
					        "fontWeight" : layout.fontWeight,
					        //"margin" : layout.margin,
					        //"padding" : layout.padding, 
					        "wrap" : layout.wrap
					    },
				        subtitles:
				            [
				                {
					                "text" : layout.subtitle
					            },
				            ],
				        animationEnabled: layout.animation,
			      		legend: 
			      			{
			        			cursor:"pointer",
			        			itemclick : function(e) {
			          				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			              				e.dataSeries.visible = false;
			          				}
			          				else {
			              				e.dataSeries.visible = true;
			          				}
			          				chart.render();
			        			}
			      			},

			      		// Data Section
				        data : []
				};

				/*
					  layout.qHyperCube.qEffectiveInterColumnSortOrder : Effettivo ordine di sort tra le colonne
					  layout.qHyperCube.qDimensionInfo  : (info sulle dimensioni) length ritorna il numero di dimensioni
					  layout.qHyperCube.qMeasureInfo     : (info sulle misure) lenght ritorna il numero di misure
				*/

                    // create a new array that contains the dimension labels
                    var dimensionLabels = layout.qHyperCube.qDimensionInfo.map(function (d) {
                        return d.qFallbackTitle;
                    });

                    // create a new array that contains the measure labels
                    var measureLabels = layout.qHyperCube.qMeasureInfo.map(function (d) {
                        return d.qFallbackTitle;
					});

                var newDataMatrix;

                if (dimensionLabels.length > 1)
                	newDataMatrix = doubleDimension (layout,dimensionLabels,measureLabels,me.app);
                else
                    newDataMatrix = singleDimension(layout,dimensionLabels,measureLabels,me.app);

				

				mychart.data = newDataMatrix;


			var chart = new CanvasJS.Chart(layout.qInfo.qId,mychart);
		
			chart.render();

		
		};
		
		return me;

	} );
