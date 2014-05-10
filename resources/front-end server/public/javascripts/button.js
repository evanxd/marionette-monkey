'use strict';

define(function () {
	var defaultTarget = 'button, th.tb_header, .tab';

	/**
	 * Add actions to target button when the mouse roll in, roll out from it.
	 * Roll in action: Highlight the target button.
	 * Roll out action: Change the color of target button back to normal.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function hoverFeedback(target) {
		$(target).hover(
			function() {
				$(this).addClass('bt_hover');
			},
			function() {
				$(this).removeClass('bt_hover');	
				$(this).removeClass('bt_pressed');
			}
		);
	}

	/**
	 * Add actions to target button when the mouse press on it.
	 * Action: Make the target button darker.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function pressFeedback(target) {
		$(target).mousedown(function() {
			$(this).removeClass('bt_hover');
			$(this).addClass('bt_pressed');
		});
	}

	/**
	 * Add actions to target button when the mouse pressed, and then releases on it.
	 * Action: Highlight the target button.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function releaseFeedback(target) {
		$(target).mouseup(function() {
			$(this).removeClass('bt_pressed');
			$(this).addClass('bt_hover');
		});
	}

	/**
	 * Add actions to target button when the mouse presses between it.
	 * Action: Highlight the target button if it is not on pressed status
	 * currently, and set the other buttons in the same group back to
	 * default status.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function toggleHoverFeedback(target) {
		$(target).hover(
			function() {
				var classAttr = $(this).attr('class');
				if(classAttr.indexOf('.bt_pressed') == -1) {
					$(this).addClass('bt_hover');
				}
			},
			function() {
				var classAttr = $(this).attr('class');
				if(classAttr.indexOf('.bt_pressed') == -1) {
					$(this).removeClass('bt_hover');
				}
			}
		);
	}

	/**
	 * Add actions to target button when the mouse pressed on the target.
	 * Action: Make the pressed button darker and set the other pressed
	 * button in the same group back to default status
	 *
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function togglePressedFeedback(target) {
		$(target).mousedown(function() {
			if($(this).attr('class') != '.bt_pressed') {
				$(this.tagName.toLowerCase() + '.bt_pressed').removeClass('bt_pressed');
				$(this).addClass('bt_pressed');
			}
		});
	}

	return {
		/**
		 * Add actions to target button when user performs mouse actions on it.
		 * The actions added to button is to give user an appropriate feedback when mouse
		 * rolls in, rolls out, presses, and releases on the target button.
		 * 
		 * @param {DOM} target The target DOM object to be bound to these feedback actions.
		 */
		addButtonFeedbackAction: function(target) {
			if(target == null) {
				target = defaultTarget;
			}
			
			hoverFeedback(target);
			pressFeedback(target);
			releaseFeedback(target);
		},

		addToggleFeedbackAction: function(target) {
			if(target == null) {
				target = defaultTarget;
			}

			toggleHoverFeedback(target);
			togglePressedFeedback(target);
		},

		/**
		 * Remove all feedback action bound to the target button.
		 *
		 * @param {DOM} target The target DOM object to remove the feedback actions.
		 */
		removeButtonFeedbackAction: function(target) {
			if(target == null) {
				target = defaultTarget;
			}

			$(target).removeClass();
		},

		/**
		 * The corresponding function of home page button: Lead user back to default
		 * view of data.
		 * 
		 * @param {Object} targetContainer The object handling the data to be shown.
		 */
		homePageButtonAction: function(targetContainer) {
			targetContainer.resetRestriction();
			targetContainer.clear();
			targetContainer.appendData(targetContainer.query());
			this.addButtonFeedbackAction($("button.bt_detail"));
			$('.img_sort').hide();
		},

		/**
		 * The corresponding function of the clicked header buttons: Ask targetContainer
		 * to sort data by the property of clicked header.
		 *
		 * @param {DOM} clickedDOM The clicked header element.
		 * @param {Object} targetContainer The object handling the data to be shown.
		 */
		headerButtonAction: function(clickedDOM, targetContainer) {
			targetContainer.sort($(clickedDOM).attr('axis'));
			$('.img_sort').hide();
			$(clickedDOM).children('.img_sort').slideToggle('fast');
		},

		/**
		 * The corresponding function of the changed pull-down menus: Ask targetContainer
		 * to sort data by the property of the changed pull-down menu.
		 *
		 * @param {DOM} clickedDOM The clicked pull-down menu element.
		 * @param {Object} targetContainer The object handling the data to be shown.
		 */
		searchToolButtonAction: function(clickedDOM, targetContainer) {
			targetContainer.setRestriction($(clickedDOM).attr('name'), $(clickedDOM).val());
			targetContainer.clear();
			targetContainer.appendData(targetContainer.query());
			this.addButtonFeedbackAction($("button.bt_detail"));
		}
	};
});