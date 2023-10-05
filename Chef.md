# Chef

Founded in 2008 building the software Chef that automates configuration management (now called Chef Infra)

Integrates with both on-prem software and cloud.

Chef is used by both big tech companies and small enterprises

Chef aims to automate the toil of configuration management --- installing and updating software, initial configuration, applying security measures, periodic server content changes ...

Now, Chef tools lie in the heart of DevSecOps



In a nutshell, you create and upload Chef cookbooks to a Chef Infra Server. The server then use the cookbooks to deploy and manage your infrastructure. A cookbook is a collection of recipes, which are files that instantiates, configures, and maintains your infrastructure code.

Recipes are written in the language `Ruby`



Example Chef recipe

```ruby
package 'httpd'

template '/var/www/html/index.html' do
  source 'index.html.erb'
end

service 'httpd' do
  action [:enable, :start]
end
```

This recipe:

- Installs an Apache Web Server package `httpd`
- Create a file on that node called `/var/www/html/index.html`
- Enable and start the Apache Web Server



Chef products

- Chef Desktop: desktop client that allows IT managers to automate deployment and management of IT resources
- Chef Infra: configuration management automation
- Chef InSpec: compliance automation for your infrastructure
  - It also comes with a language to define security controls which can then be checked
- Chef Compliance
- Chef Habitat: create CI/CD pipelines for applications and deploy across environments while giving the same end-user experience
- Chef Automate: observability and metrics tool



Chef workstation

​	Gives you all the tools to get started

- Workstation App
- Chef Infra Client (managed by Chef Infra Server to execute the configurations)
- Chef InSpec
- Chef cli
- Test kitchen (test cookbooks across any combination of platforms)
- Cookstyle (linter tool for cookbooks)















