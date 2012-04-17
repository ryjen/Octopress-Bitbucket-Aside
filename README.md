# Octopress Bitbucket Aside

This is a simple aside for <a href="http://www.octopress.org">Octopress</a> that uses Bitbucket API to pull your most recent repositories.

It was largely copied from the github aside. I have included support for a password to gain access to your private repositories (This is pretty insecure I know, you can base64 encode it if you want).  If you remove the password variable in the configuration, only your public repositories will be listed.

## How to use it

First of all you need to copy files:

* *bitbucket.html* into *source/_includes/custom/asides*
* *bitbucket.js* into *source/javascripts/*

Then you need to update the _config.yml file:

* add *'custom/asides/bitbucket.html'* to *default_asides*
* add bitbucket settings at the end of the file:

```
# Bitbucket repositories
bitbucket_user: your_username
# bitbucket_password: your_password_in_base64
# bitbucket_require_wiki: true
bitbucket_repo_count: 4
bitbucket_show_profile_link: true
bitbucket_skip_forks: true
```
