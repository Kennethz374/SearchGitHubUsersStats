// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 3 - Creating the JSON object to store the chart configurations

const Bar3D = ({ data }) => {
	const chartConfigs = {
		type: "Bar3D", // The chart type
		width: "100%", // Width of the chart
		height: "400", // Height of the chart
		dataFormat: "json", // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: "Most Forked",
				decimals: 0,
				pieRadius: "45%",
				showPercentValues: 0,
				theme: "candy",
				// paletteColors: "#f0db4f", you can provide your own colors
				// subCaption: "In MMbbl = One Million barrels",
				xAxisName: "Forks",
				yAxisName: "Stars",
				xAxisNameFontSize: "16px",
				yAxisNameFontSize: "16px",
				// numberSuffix: "K",
			},
			// Chart Data
			data: data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
