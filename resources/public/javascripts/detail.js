/**
 * This Javascript file returns "DetailPageHandler" as a class.
 * This class provides API to perform manipulation of detail pages
 * such as appending, detaching, sorting test file bars and drawing
 * charts on detail page.
 */
define(['chartTool', 'queryTool', 'dataController'], function (chartTool, QueryTool, DataController) {
	'use strict';

	var queryTool = new QueryTool();

	/**
	 * @class DetailPageHandler
	 * @constructor
	 * @param {DOM} testBarContainer The DOM element which conatains test bars.
	 * @param {DOM} inputTab The DOM element as a tab which is associated with
	 * this detail page.
	 * @param {String} filePath The filePath of clicked data bar.
	 */
	function DetailPageHandler(testBarContainer, inputTab, filePath) {
		this.container = testBarContainer;
		this.tab = inputTab;
		this.filePath = filePath;
		this.dataController = new DataController(testBarContainer.find("table.tb_header"));
		this.dataController.setButtonType(this.dataController.linkButton);

		testBarContainer.find(".title").append(filePath);
		queryTool.resetOptions();
		queryTool.setOptions("name", filePath);
		this.dataController.appendData(queryTool.queryDetail());
	}

	/**
	 * Public methods and variables.
	 */
	DetailPageHandler.prototype = {
		/**
		 * Draw chart on canvas belongs to this detail page. The content of
		 * chart is about the history of test file this detail page handles. 
		 */
		drawChart: function () {
			var data = null,
				tempDates = [],
				tempErrorCounts = [],
				i,
				max;

			queryTool.resetOptions();
			queryTool.setOptions("name", this.filePath);

			data = queryTool.query();
			max = data.length;

			for (i = max - 1; i >= 0; i -= 1) {
				tempDates.push(data[i].date);
				tempErrorCounts.push(data[i].error);
			}

			chartTool.drawChart($(this.container).find("canvas.chart_table"), {
				dates : tempDates,
				errorCounts : tempErrorCounts
			});
		},

		/**
		 * Get the test data controller belongs to it.
		 */
		getController: function () {
			return this.dataController;
		}
	};

	return DetailPageHandler;
});