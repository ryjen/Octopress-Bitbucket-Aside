var bitbucket = (function() {
    function render(user, target, repos) {
        var i = 0,
            fragment = '',
            t = $(target)[0];

        for (i = 0; i < repos.length; i++) {
            fragment += '<li><a href="https://bitbucket.org/' + user + '/' + repos[i].name + '">' + repos[i].name + '</a><p>' + repos[i].description + '</p></li>';
        }
        t.innerHTML = fragment;
    }
    return {
        showRepos: function(options) {
			var host="api.bitbucket.org/1.0/users/"
        	var auth = (options.password) ? (options.user+":"+options.password+"@") : "";

            $.ajax({
                url: "https://"+auth+host+options.user + "?callback=?",
                type: "jsonp",
                error: function(err, status) {
                    $(options.target + ' li.loading').addClass('error').text("Error loading feed");
                },
                success: function(data) {
                    var repos = [];
                    if (!data || !data.repositories) {
                        return;
                    }
                    for (var i = 0; i < data.repositories.length; i++) {
                        if (options.skip_forks && data.repositories[i].is_fork) {
                            continue;
                        }
                        if (options.require_wiki && !data.repositories[i].has_wiki) {
                        	continue;
                        }

                        repos.push(data.repositories[i]);
                    }

                    repos.sort(function(a, b) {
                        var aDate = new Date(a.last_updated).valueOf(),
                            bDate = new Date(b.last_updated).valueOf();

                        if (aDate === bDate) {
                            return 0;
                        }
                        return aDate > bDate ? -1 : 1;
                    });

                    if (options.count) {
                        repos.splice(options.count);
                    }

                    render(options.user, options.target, repos);
                }
            });
        }
    };
})();
