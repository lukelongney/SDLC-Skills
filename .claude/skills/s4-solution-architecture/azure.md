# Azure Platform Reference

## Azure Well-Architected Framework Pillars
- **Reliability**: Resiliency, availability, disaster recovery
- **Security**: Identity, data protection, network security
- **Cost Optimisation**: Cost management, right-sizing
- **Operational Excellence**: Monitoring, automation, DevOps
- **Performance Efficiency**: Scaling, caching, optimisation

## Recommended Services by Layer

### Integration
- Azure Data Factory — data movement and orchestration
- Logic Apps — workflow automation, SaaS connectors
- Service Bus — enterprise messaging, queues, topics
- Event Grid — event-driven architecture
- API Management — API gateway, rate limiting, developer portal

### Compute
- App Service — web apps, APIs
- Functions — serverless event-driven compute
- Container Apps — containerised microservices
- AKS — Kubernetes for complex orchestration needs

### Data
- SQL Database — relational, managed
- Cosmos DB — multi-model, globally distributed
- Blob Storage — unstructured data, files
- Data Lake Storage — analytics, big data
- Redis Cache — caching, session state

### Security
- Key Vault — secrets, keys, certificates
- Managed Identity — passwordless service auth
- Entra ID (Azure AD) — identity and access management
- Defender for Cloud — security posture management
- Private Endpoints — network-level service isolation

### Monitoring
- Application Insights — APM, distributed tracing
- Log Analytics — centralised logging
- Azure Monitor — metrics, alerts, dashboards
- Azure Sentinel — SIEM (if required)

## Naming Conventions
Follow Azure Cloud Adoption Framework naming: `{resource-type}-{workload}-{environment}-{region}-{instance}`

Example: `app-customerportal-prod-aue-001`

## Landing Zone Patterns
- Management Group hierarchy for governance
- Hub-spoke network topology
- Shared services in hub (firewall, DNS, monitoring)
- Workload subscriptions in spokes

## Common Patterns for Salesforce Integration
- API Management as gateway to Salesforce REST APIs
- Service Bus for async event processing from Salesforce Platform Events
- Data Factory for bulk data sync (Salesforce connector available)
- Logic Apps for low-code Salesforce workflow integration
