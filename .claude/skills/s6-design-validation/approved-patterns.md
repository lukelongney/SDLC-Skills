# Approved Technology Patterns

This file defines the approved technology patterns for solution architecture. S6 (Design Validation) uses this to validate that S4 architecture uses only approved technologies.

**Location:** Place in `docs/architecture/approved-patterns.md` or `.claude/approved-patterns.md`

**Behaviour:**
- Patterns in this list are marked as compliant ✓
- Patterns not in this list are flagged as "unrecognized — needs review"
- If this file is missing, pattern validation is skipped entirely

---

## Compute

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Container Instances
- Azure Virtual Machines (legacy only)

## Data

- Azure SQL Database
- Azure Cosmos DB
- Azure Blob Storage
- Azure Table Storage
- Azure Data Lake Storage

## Integration

- Azure Service Bus
- Azure Event Grid
- Azure API Management
- Azure Logic Apps
- Azure Data Factory

## Identity & Access

- Azure Active Directory (Azure AD)
- Azure AD B2C
- Azure AD B2B

## Security

- Azure Key Vault
- Azure Application Gateway (WAF)
- Azure Front Door
- Azure DDoS Protection

## Monitoring & Observability

- Azure Application Insights
- Azure Monitor
- Azure Log Analytics
- Azure Alerts

## DevOps

- Azure DevOps
- GitHub Actions
- Azure Container Registry

## Third-Party (Approved)

- Salesforce (CRM platform)
- SendGrid (email delivery)
- Twilio (SMS)

---

## How to Update

1. Propose new pattern with rationale
2. Review with architecture governance
3. Add to appropriate category
4. Commit with reference to approval decision

## Exclusions

The following are explicitly NOT approved without exception approval:

- Self-hosted databases (use managed services)
- Custom identity providers (use Azure AD)
- Direct VM deployments for new workloads (use PaaS)
