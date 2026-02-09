# Legacy Application Integration Patterns Reference

## Integration Strategies

### Strangler Fig
- Gradually replace legacy functionality with new services
- Route traffic through a facade — new requests go to new service, old to legacy
- Reduce legacy surface area over time
- Never big-bang replace — always incremental

### Anti-Corruption Layer (ACL)
- Translate between legacy and modern domain models
- Isolate new system from legacy data structures and concepts
- Prevent legacy constraints from leaking into new architecture
- Implement as a dedicated service or library at the boundary

### Data Synchronisation
| Pattern | When to Use | Risk |
|---------|-------------|------|
| Event-driven sync | Near real-time needed | Event ordering, eventual consistency |
| Batch ETL | Periodic sync acceptable | Data staleness, bulk failure handling |
| Dual-write | Both systems must stay current | Consistency risk — avoid if possible |
| Change Data Capture | Database-level change detection | DB compatibility, schema coupling |

## Common Legacy Constraints
- **No API surface** — may need database-level integration (views, stored procs) or file-based exchange
- **Batch-only processing** — file drops, scheduled jobs, FTP/SFTP
- **Tightly coupled data model** — shared databases, no clear boundaries
- **Limited authentication** — basic auth, NTLM, no OAuth support
- **Vendor lock-in** — proprietary protocols, limited documentation

## Integration via Middleware
- Azure Service Bus for decoupling
- Azure Data Factory for batch data movement
- Logic Apps for file-based integration (FTP, SFTP, file share triggers)
- API Management for wrapping legacy endpoints with modern API facade

## Data Migration Considerations
- Data quality assessment before migration
- Mapping legacy → modern data models (expect transformation complexity)
- Referential integrity across systems during transition
- Parallel running period with reconciliation
- Rollback strategy if migration fails

## Risk Patterns
| Risk | Mitigation |
|------|------------|
| Legacy system undocumented | Reverse-engineer through codebase and database analysis |
| Shared database coupling | ACL + gradual schema separation |
| No test environment | Create isolated replica or mock at boundary |
| Knowledge concentrated in few people | Capture knowledge during architecture phase, pair with legacy SMEs |
