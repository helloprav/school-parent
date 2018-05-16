routerApp
		.service(
				'UserService',
				[
						'$resource',
						function($resource) {
							this.genericGetCalls = genericGetCalls;
							/* Server START */
							this.getServerHistory = getServerHistory;
							this.getPhysicalServerHistory = getPhysicalServerHistory;
							this.getTargetPhysicalServerHistory = getTargetPhysicalServerHistory;
							/* Other Hardware END */

							var url;

							function genericGetCalls(url, callback) {
								var fetch = $resource(url);
								fetch.get({}, function(response) {
									if (response.statusCode == 200) {
										callback(response.responseBody);
									} else {
										alert(response.responseBody);
									}
								});
							}

							/* Server START */

							function getServerHistory(id, callback) {
								url = '/etme/rest/uis/read?action=asset-management-getServerHistory&serverID='
										+ id;
								genericGetCalls(url, function(response) {
									callback(response);
								});
							}

							function getPhysicalServerHistory(id, callback) {
								url = '/etme/rest/uis/read?action=asset-management-getPhysicalServerHistory&physicalServerID='
										+ id;
								genericGetCalls(url, function(response) {
									callback(response);
								});
							}

							function getTargetPhysicalServerHistory(id,
									callback) {
								url = '/etme/rest/uis/read?action=asset-management-getPhysicalServerHistory&physicalServerID='
										+ id;
								genericGetCalls(url, function(response) {
									callback(response);
								});
							}
							/* Other Hardware END */
						} ]);
