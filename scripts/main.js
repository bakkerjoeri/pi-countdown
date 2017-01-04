'use strict';

require.config({
	baseUrl: "",
	paths: {
		"moment": "scripts/vendor/momentjs/min/moment-with-locales"
	}
});

require([
	'moment'
], function (moment) {
	moment.locale();

	var nextPiDay = findNextPiDay();

	printTargetDate(nextPiDay);
	updateTimeUntilTargetDate(nextPiDay);

	function findNextPiDay () {
		var nextPiDay = moment("03-14 00:00:00", 'MM/DD HH:mm:ss');

		// Check if the next pi day is this year or next year.
		if (moment().diff(nextPiDay, "days") < 1) {
			nextPiDay.year(moment().year());
		} else {
			nextPiDay.year(moment().add(1, "year").year());
		}

		return nextPiDay;
	}

	function updateTimeUntilTargetDate (targetDate) {
		var now =  moment();

		if (isTargetDateToday(targetDate)) {
			hideTimeElement();
			showCelebrationElement();
			document.title = "Happy π day!";
		} else {
			showTimeElement();
			hideCelebrationElement();
			var durationString = getDurationString(getDuration(now, targetDate));
			document.getElementById("timeUntilTargetDate").innerHTML = durationString;
			document.title = "π " + targetDate.from(now);

			window.setTimeout(function () {
				updateTimeUntilTargetDate(targetDate);
			}, 500);
		}
	}

	function isTargetDateToday (targetDate) {
		if (moment().diff(targetDate, "days") === 0) {
			return true;
		}

		return false;
	}

	function getDurationString (duration) {
		var dateWords = {
			DAYS: {
				singular: 'day',
				plural: 'days'
			},
			HOURS: {
				singular: 'hour',
				plural: 'hours'
			},
			MINUTES: {
				singular: 'minute',
				plural: 'minutes'
			},
			SECONDS: {
				singular: 'second',
				plural: 'seconds'
			}
		}

		var sortedDateParts = [
			'DAYS',
			'HOURS',
			'MINUTES',
			'SECONDS'
		]

		var durationString = '';
		var durationStrings = new Array();

		for (var d = 0; d < sortedDateParts.length; d++) {
			var datePart = Object.keys(duration)[d];

			if (durationStrings.length === 0 && duration[datePart] <= 0 && (d !== sortedDateParts.length -1)) {
				continue;
			} else {
				var dateString = '';

				dateString += duration[datePart];
				dateString += '&nbsp;';

				if (duration[datePart] === 1) {
					dateString += dateWords[datePart].singular;
				} else {
					dateString += dateWords[datePart].plural;
				}

				durationStrings.push(dateString);
			}
		}

		for (var s = 0; s < durationStrings.length; s++) {
			durationString += durationStrings[s];

			if (s === (durationStrings.length - 1)) {
				continue;
			} else if (s === (durationStrings.length - 2)) {
				durationString += ' and ';
			} else {
				durationString += ', ';
			}
		}

		return durationString;
	}

	function getDuration (now, then) {
		var secondsInMinute,
				secondsInHour,
				secondsInDay,
				minutesInHour,
				hoursInDay,
				differenceInSeconds,
				dSecond,
				dMinute,
				dHour,
				dDay,
				duration;

		secondsInMinute = 60;

		secondsInHour = 60*60;
		minutesInHour = 60;

		secondsInDay = 60*60*24;
		hoursInDay = 24;

		differenceInSeconds = (then - now)/1000;
		dSecond = Math.floor(differenceInSeconds) % secondsInMinute;
		dMinute = Math.floor(differenceInSeconds/secondsInMinute) % minutesInHour;
		dHour = 	Math.floor(differenceInSeconds/secondsInHour) % hoursInDay;
		dDay = 		Math.floor(differenceInSeconds/secondsInDay);

		duration = {
			DAYS: dDay,
			HOURS: dHour,
			MINUTES: dMinute,
			SECONDS: dSecond,
		}

		return duration;
	}

	function printTargetDate (targetDate) {
		document.getElementById("targetDate").innerHTML = targetDate.format('MMMM Do, YYYY');
	}

	function showTimeElement () {
		var timeElement = getTimeElementOrNull();

		if (timeElement) {
			timeElement.style.display = "block";
		}
	}

	function hideTimeElement () {
		var timeElement = getTimeElementOrNull();

		if (timeElement) {
			timeElement.style.display = "none";
		}
	}

	function showCelebrationElement () {
		var celebrationElement = getCelebrationElementOrNull();

		if (celebrationElement) {
			celebrationElement.style.display = "block";
		}
	}

	function hideCelebrationElement () {
		var celebrationElement = getCelebrationElementOrNull();

		if (celebrationElement) {
			celebrationElement.style.display = "none";
		}
	}

	function getFirstElementWithClassNameOrNull (className) {
		if (document.getElementsByClassName(className).length > 0) {
			return document.getElementsByClassName(className)[0];
		}

		return null;
	}

	function getTimeElementOrNull () {
		return getFirstElementWithClassNameOrNull("time");
	}

	function getCelebrationElementOrNull () {
		return getFirstElementWithClassNameOrNull("celebration");	
	}
});