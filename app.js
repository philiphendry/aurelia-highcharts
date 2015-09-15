import "bootstrap/css/bootstrap.css!";
import {inject} from "aurelia-framework";
import {GraphData} from "./graphData";

@inject(GraphData)
export class App {

	isDisplayed = false;

	constructor(graphData) {
		this.graphData = graphData;
	}

    activate() {
    	this.changeGraph(this.graphData.lineGraph);
    }

    changeGraph(chartOptions) {
    	this.chartOptions = chartOptions;
    }

    showChart(chartOptions) {
    	this.hiddenChartOptions = chartOptions;
    	this.isDisplayed = true;
    }

}