import {bindable, inject} from "aurelia-framework";
import {TaskQueue} from "aurelia-task-queue";
import $ from "jquery";
import Hightcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import "./chart.css!";

@inject(Element, TaskQueue)
export class ChartCustomElement {

	chartDefaults = {
		exporting: {
			buttons: {
				contextButton: {
					menuItems: [
						{ textKey: 'printChart', onclick: function() { this.print(); } }, 
						{ separator: true }, 
						{ textKey: 'downloadPNG', onclick: function() { this.exportChart(); } }, 
						{ textKey: 'downloadJPEG',onclick: function() { this.exportChart({ type: 'image/jpeg' }); } }, 
						{ textKey: 'downloadSVG', onclick: function() { this.exportChart({ type: 'image/svg+xml' }); } }
					]
				}
			}
		}
	};

	@bindable chartOptions;

    constructor(element, taskQueue) {
    	Highcharts.setOptions({
    		global: {
    			useUTC: false
    		}
    	});
    	this.element = element;		
    	this.taskQueue = taskQueue;
    }
   
    chartOptionsChanged(value) {
    	let newSettings = {};
    	$.extend(true, newSettings, this.chartDefaults, value);
		this.taskQueue.queueMicroTask(() => 
			$(this.element).highcharts(newSettings)
		);
	}
}