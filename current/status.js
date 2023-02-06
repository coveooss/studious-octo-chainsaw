var Coveo = Coveo || {};
Coveo.Status = {
    id: 'jgdmnlhfjdlf',
    indicators: {
        critical: 'state-critical',
        major: 'state-major',
        minor: 'state-minor',
        none: ''
    },
    getStatus: function() {
        var _this = this;
        var request = new XMLHttpRequest();
        request.open('GET', 'https://' + Coveo.Status.id + '.statuspage.io/api/v2/status.json', true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);

                $('#status').removeClass('hidden');
                $('#status .color-dot').addClass(_this.indicators[data.status.indicator]);
                $('#status #current .color-description').html(data.status.description);
            }
        };
        request.send();
    },
    getUpcomingMaintenance: function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://' + Coveo.Status.id + '.statuspage.io/api/v2/scheduled-maintenances/upcoming.json', true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);

                var scheduledMaintenances = data.scheduled_maintenances;
                if (scheduledMaintenances && scheduledMaintenances.length > 0 && scheduledMaintenances[0].status == 'scheduled') {
                    var upcomingEl = document.querySelector('#status #upcoming');
                    upcomingEl.href = scheduledMaintenances[0].shortlink;

                    var DAY_IN_MILISEC = 86400000;
                    var now = new Date();
                    var maintenanceDate = new Date(scheduledMaintenances[0].scheduled_for);

                    var diffDays = Math.round(Math.abs((now.getTime() - maintenanceDate.getTime()) / (DAY_IN_MILISEC)));
                    var message = '';
                    if (diffDays == 0) {
                        message = 'today';
                    } else if (diffDays == 1) {
                        message = 'in a day';
                    } else {
                        message = 'in ' + diffDays + ' days';
                    }

                    $('#status #upcoming .color-description').html('Scheduled maintenance ' + message);
                    $('#upcoming').removeClass('hidden');
                }
            }
        };
        request.send();
    }
}
