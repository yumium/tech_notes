# DevOps



- Cloud computing with AWS
- Using souce control with git
- Building software with Maven
- CI/CD with Jenkins
- Containerization with Docker
- Using Terraform
- Server Automation with Puppet
- Monitoring with Zabbix





## What is DevOps?



**The cultural shift**

"DevOps is the practice of operations and development engineers participating together in the entire service lifecycle, from design through the development process to production support"

"From the operational side, making use many of the same techniques as developers for their systems work"

"Achieve consistent, fast, and safe delivery of software"





**CALMS framework**

It assesses your ability and measure your progress on your DevOps journey

Culture: No more blaming, no silos (no separate DevOps team), collaboration with everyone in team

Automation: Automate everywhere you can to leave nothing for human error (CI, CD, IaC, CaC (config as code))

Lean: Produce value for end user, no waste in system

Metrics: Measure everything, what works what doesn't why?

- Lead time for changes: time from new code committed to new deployable state (hours is better than days)
- Change failure rate: % of changes that require hot fixes (0-15% is good)
- Deployment frequency: How often new code is deployed, the higher the better (many times a day)
- Mean time to recovery: Average time between start of interruption to recovery (aim for less than 1hr)

Sharing: Learning from mistakes







**DevOps cycle and tools**

- Develop & Test (Git)
  - Version control for new code changes and tests
- Integrate (Maven/Make/Gradle)
  - Build engines to automate compiling of code
  - CI pipelines to trigger test and build scripts upon pushing of code

- Deploy (AWS, Docker)
  - Containerization creating a box with software and libraries needed to run the code, direct deployment to servers
  - Config management tools to ensure the write libraries are installed in the target server
- Monitoring & Logging
  - Monitoring if anything goes wrong in the pipeline





**Example DevOps pipeline**



<u>Internet</u>

Developer Machine (1)

- Source code
- VC using git
- Maven repo (Pom.xml)



Docker hub (4)



People viewing the hosted website (8)



<u>AWS cloud</u>

EC2 Gitlab server (2)

- Git Repo



EC2 Jenkins server (3)

- Jenkins Git Plugin Tests and Builds Project
- Docker



EC2 Puppet Master (6)

- Puppet class => Docker plugin for puppet



EC2 Puppet Agents (7)

- Check in for manifest
- Run Docker Container



EC2 Terraform (5)





1. Developer checks in new code. Maven to run tests and linting (1)
2. Code is checked into Git Repo (2)
3. Jenkins Git Plugin triggers to test and build the project (3)
4. New built image is pushed to Docker Hub (4)
5. Terraform creates puppet agent (5)
6. Puppet agent notices the docker config change and applies changes to infrastructure. It pulls the latest Docker image from Docker Hub and builds it. (6,7)
7. User sees new version of webpage (8)







**DevSecOps**

QA integrate security into DevOps

- Threat model policies during planning
- Static analysis of code
- Penetration testing during test
- Compliance validation during release
- Logging
- Threat intelligence during operation (monitor, detect, response, recover), 











## Build tools

Features of build tools

- Deal with software dependencies
- Run automated tests
- Package files into single executable
- Check code styles and static analysis



Example build tools

- Make: based on *makefiles*, mostly used in C/C++
- Maven: based on XML files, multi-language support
- Grade: Java/Scala, built using Groovy
- SBT: for scala projects
- Bamboo: Atlassian's build tool, integrates with JIRA and bitbucket



Examples from Maven:

Default directory structure

```
myapp
	- pom.xml
	- src
		- main
			- java
				- com
					- qa
						- myapp
							- App.java
	- test
		- java
			- com
				- qa
					- myapp
						- AppTest.java
```

Inside `pom.xml`

```xml
<project xmlns="...">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.qa</groupId>
    <artifactId>my-app</artifactId>
    <packaging>jar</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>my-app</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
		</dependency>
    </dependencies>
</project>
```



Maven commands (to trigger various automations)

```shell
mvn clean 	# Delete all currently compiled code
mvn test	# Run all unit tests
mvn package	# Generate jar / war files required
mvn site	# Generate maven documentation
```





## CI/CD tools



Continuous integration: New feature => merge to main => run test cases & build

Continuous delivery: .. => build code => create artifacts for deployment and deploy (deployment minute by minute, rather than hours)



CI/CD best practices:

- Automate build
- Test after build
- Test in clone of prod environment
- Keep build fast



CI/CD tools:

- Jenkins / Hudson => open-source
- Bamboo - Atlassian's build engine
- Travis CI
- Circle CI



Jenkins typical workflow

- Developer checks some new code into git
- Git informs all watchers that it has updated
- Jenkins git plugin starts build
  - Create a trigger for build in git
- Clone the project
- Compiles, runs tests
- Updates the dashboard with any feedback
- Start post-build steps or actions to deploy







## Container tools



VM architecture

- Hardware => Host OS => Hypervisor => Multiple VMs with own Guest OS



Container architecture:

- Hardware => Host OS => Container (Docker) Engine => Containers



VM vs Containers:

- VM has better security
- Containers have fast start up time => seconds rather than minutes
- Memory usage
  - VMs: 1GB machine x 1000 instances => 1000GB
  - Containers: 1GB machine x 1000 instances => 1GB



Container tools:

- Docker (de factor standard)
- rkt (Rocket)
- Windows Containers
- Linux Containers



Docker concepts:

-  Self contained items
- Windows allowing us to see inside and can connect containers together
- Can be stacked (extract common features to same layer), loaded, unloaded independently



Docker commands

```shell
docker run		# 
docker image	# images available locally
docker pull		# pull copy of image
```



Building a container

- Docker containers are created from layers
- Each command create a new layer on top of existing infrastructure
- Container can be created by running commands and committing them, or write into a Dockerfile - a script to build the container



Docker commands

- FROM - The base container to use
- MAINTAINER - Who is responsible for the container
- RUN - Run a command in the container
- CMD - One in a file, argument to pass the default shell on start up
- LABEL - Add meta data to the image, key value pairs
- EXPOSE - Ports to allow access through
- ENV - Environment variables
- ADD - Copy files to the container, can be a URL, will decompress tar
- COPY - Same as add but without the decompress or URL
- ENTRYPOINT - Command to be run when the container is started
- VOLUME - Mount a directory as a volume for the container
- USER - Sets the current user from this point forward
- WORKDIR - Change working directory from this point forward
- ONBUILD - Trigger for a build event, not passed forward to children



Example Docker file

```dockerfile
FROM centos:centos6
MAINTAINER Yuming

RUN yum update -y
RUN yum install -y java
RUN yum install -y git
```



Docker compose

`compose.yml` file

```yaml
version: '2'

services:
	httpd:
		container_name: httpd-container
		build: ./docker/httpd
		ports:	
			- "80:80"
	tomcat:
		container_name: tomcat-container
		build: ./docker/tomcat
		volumes:
			- ./target/ROOT.war:/usr/local/tomcat/webapps/ROOT.war
		expose:
			- "8009"
```

Tells docker how to spin up multiple containers together (specify name of container, where is the build, ports, and other config variables)



You can configure Jenkins to automate a build and deploy on a Docker container.





## IaC tools



What is IaC for DevOps

- Use machine readable language to VC and configure the provision of infrastructure



IaC tools:

- CHEF
- Ansible
- Puppet
- SaltStack
- CFEngine



Terraform:

- Uses own syntax (HCL)
- Written in Golang
- Declarative



Terraform CLI:

- apply: builds or changes infrastructure
- destroy: destroy infra
- graph: create virtual graph of Terraform resources
- ...



Example:

```yaml
{
	"version": 4,
	"terraform_version": "0.12.4",
	"serial": 13,
	"resources": [
		{
			"mode": "managed",
			"type": "aws_route53_health_check",
			"name": "MyRoute53HealthCheck",
			"provider": "provider.aws",
			"instances": [
				{
					"schema_version": 0,
					"attributes": {
						"child_health_threshold": 0,
						# etc.
					}
				}			
			]
		}
	]
}
```







## Puppet



What is configuration management:

- Identify and acquire config items
- Control changes to config items
- Report status of config items
- Software builds and release engineering



Puppet

- Master: main control unit, holds recipes, dashboards and metrics
- Agent: checks in with master every half hour or so, performs changes as necessary



4 steps of config changes:

- Define the desired state
- Changes are simulated
- Changes are applied
- Actual state is then compared to desired state. There should be no discrepencies



Manifests describe desired state of a node

```yaml
user { 'john': 
        ensure => present,
        groups => ['sysadmin', 'web', 'dba'],
        home => '/home/john',
        managehome => true,
	}
	group { 'sysadmin':
		ensure => present,
	}
```







## Monitoring tools



Why monitor?

- Check the health of our set up
  - Is service up, CPU load, Memory, Disk space, Network traffic
- Informs you problems as early as possible



Monitoring tools:

- Splunk
- Zabbix
- Sensu
- Mist.io
- Shinken
- Black Duck



Zabbix:

- Client/Server model
- Web based interface
- 











