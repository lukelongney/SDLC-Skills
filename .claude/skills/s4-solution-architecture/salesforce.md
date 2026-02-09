# Salesforce Platform Reference

## Architecture Considerations
- **Governor Limits** — API call limits, SOQL query limits, DML limits per transaction
- **Multi-tenancy** — shared infrastructure, no direct DB access
- **Metadata-driven** — configuration over code where possible
- **Bulk patterns** — design for bulk operations, avoid row-by-row processing

## Core Architecture Patterns

### Declarative First
- Flows and Process Builder before Apex
- Formula fields and rollup summaries before triggers
- Validation rules before code-based validation
- Reports and dashboards before custom analytics

### Integration Patterns
| Pattern | When to Use | Salesforce Mechanism |
|---------|-------------|---------------------|
| Request-Reply | Real-time data lookup | REST/SOAP API, Named Credentials |
| Fire-and-Forget | Async processing | Platform Events, Outbound Messages |
| Batch Data Sync | Bulk data movement | Bulk API 2.0, Data Loader |
| UI Integration | Embed external UI | Lightning Web Components, Canvas |
| Event-Driven | React to changes | Change Data Capture, Platform Events |

### API Limits
- REST API: varies by edition (Enterprise: 100K/24hr per user)
- Bulk API: 15K batches/24hr
- Streaming API: varies by event type
- Always design with limit headroom — target 60-70% utilisation ceiling

## Data Model Considerations
- Standard vs Custom Objects — use standard where possible
- Record Types for object variants (not separate objects)
- Master-Detail vs Lookup relationships — cascade implications
- Large Data Volumes (LDV) — skinny tables, indexes, archival strategy for >1M records
- Data skew — avoid parent records with >10K children

## Security Model
- Organisation-Wide Defaults (OWD) — most restrictive baseline
- Role Hierarchy — vertical access expansion
- Sharing Rules — horizontal access grants
- Permission Sets — fine-grained feature access
- Field-Level Security — column-level protection

## Common Integration with Azure
- Azure API Management → Salesforce REST API (Named Credentials + OAuth)
- Salesforce Platform Events → Azure Service Bus (via middleware or CDC)
- Azure Data Factory → Salesforce Bulk API (native connector)
- Azure Functions → Salesforce API (for event-driven processing)
