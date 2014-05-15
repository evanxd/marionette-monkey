'use strict';
$(document).ready(require(['button', 'container'], function(button, Container) {
    var test_container = new Container($("table.tb_header"));
    
	test_container.init();
	test_container.sort('error');
	button.init();

	$('select').change(function() {
		test_container.setRestriction($(this).attr('name'), $(this).val());
		test_container.clear();
		test_container.appendData(test_container.query());
		button.addButtonAction($("button.bt_detail"));
	});
	
	$('th.tb_header').click(function() {
		test_container.sort($(this).attr('axis'));
		$('.img_sort').hide();
		$(this).children('.img_sort').slideToggle('fast');
	});

	$('button#bt_home').click(function() {
		test_container.resetRestriction();
		test_container.clear();
		test_container.appendData(test_container.query());
		button.addButtonAction($("button.bt_detail"));
	});
}));