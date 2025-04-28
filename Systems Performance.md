# Systems Performance

## Introduction

**What is systems performance?**

Systems performance studies the performance of an entire computer system, including all major software and hardware components. Anything in the data path, from storage devices to application software, is included, because it can affect performance.

Typical motivations: 1) improve end-user experience by reducing latency, 2) save cost

*full stack* performance is different from *full stack* in the traditional sense. Traditional *full stack* usually only considers the application layer. Full stack in performance also consider the underlying system all the way to bare metal.

($$ image page 41)


**Roles**

Generally as part of a different role (e.g., Network engineers focus on network performance, HFT quant devs focus on performance in the trading hot path). Performance engineers work in big firms that solely focus on performance work (e.g., helping teams speed up stuff, build performance tools etc.)


**Activities**

1. Setting performance objectives and performance modelling for a future product
2. Performance characterization of prototype software and hardware.
3. Performance analysis of in-development products in a test environment.
4. Non-regression testing for new product versions.
5. Benchmarking product releases.
6. Proof-of-concept testing in the target production environment.
7. Performance tuning in production.
8. Monitoring of running production software.
9. Performance analysis of production issues.
10. Incident reviews for production issues.
11. Performance tool development to enhance production analysis.

These days with canary releases (small traffic to prod machine) and blue-green deployment (slowly shift traffic from backup to new machine) mean teams don't always follow all the performance steps. You'll likely do some of these steps in your work.




