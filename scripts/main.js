'use strict';

require.config({
	baseUrl: "",

	paths: {
		"moment": "scripts/vendor/momentjs/min/moment-with-locales",
		"underscore": "scripts/vendor/underscore/underscore"
	}
});

require([
	'moment'
], function (moment) {
	moment.locale('en');

	var piMoment = moment("03-14-15 9:26:53", 'MM/DD/YY H:mm:ss');

	updateTimeUntilPi();

	document.getElementById("piMoment").innerHTML = piMoment.format('M/DD/YY, H:mm:ss');

	function updateTimeUntilPi () {
		var now =  moment();
		console.log(getDuration(now, piMoment));
		var durationString = getDurationString(getDuration(now, piMoment));
		document.getElementById("timeUntilPi").innerHTML = durationString;
		document.title = "π " + piMoment.from(now) + " | Super Pi Day countdown";

		window.setTimeout(updateTimeUntilPi, 500);
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
		var differenceInSeconds = (then - now)/1000;
		var secondsInMinute = 60;

		var secondsInHour = 60*60;
		var minutesInHour = 60;

		var secondsInDay = 60*60*24;
		var hoursInDay = 24;

		var dSecond = Math.floor(differenceInSeconds) % secondsInMinute;
		var dMinute = Math.floor(differenceInSeconds/secondsInMinute) % minutesInHour;
		var dHour = 	Math.floor(differenceInSeconds/secondsInHour) % hoursInDay;
		var dDay = 		Math.floor(differenceInSeconds/secondsInDay);

		var duration = {
			DAYS: dDay,
			HOURS: dHour,
			MINUTES: dMinute,
			SECONDS: dSecond,
		}

		return duration;
	}
});