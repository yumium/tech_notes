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

Culture: No more blaming, no silos, collaboration with everyone in team

Automation: Automate everywhere you can to leave nothing for human error (CI, CD, IaC, CaC (config as code))

Lean: Produce value for end user, no waste in system

Metrics: Measure everything, what works what doesn't why?

- Time from development to deployment
- Occurrence of bugs
- Time for recovering from system failure
- User gain / loss
- ... => feature usage, customer journeys, SLAs

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



Building the container

supervisord









