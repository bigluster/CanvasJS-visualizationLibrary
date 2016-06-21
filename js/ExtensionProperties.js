var Settings = 
				{
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
									defaultValue: "#91FF00, #A7FF33, #BDFF66, #D3FF99, #DEFF92, #F4FFE5, #FFFFFF00",
									ref: "vars.bar.fillColor"
								},
							},
						},

					}
				}
