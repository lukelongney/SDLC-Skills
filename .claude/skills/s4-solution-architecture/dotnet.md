# .NET Application Patterns Reference

## Hosting Models
| Model | When to Use | Azure Service |
|-------|-------------|---------------|
| ASP.NET Core Web API | REST APIs, microservices | App Service, Container Apps |
| Blazor Server/WASM | Internal web UIs | App Service |
| Worker Service | Background processing | Container Apps, Functions |
| Minimal APIs | Lightweight endpoints | App Service, Functions |

## Common Architecture Patterns

### Clean Architecture
- Domain layer (entities, business rules) — no dependencies
- Application layer (use cases, interfaces) — depends on domain
- Infrastructure layer (data access, external services) — implements interfaces
- Presentation layer (API, UI) — depends on application

### Repository + Unit of Work
- Repository abstracts data access
- Unit of Work manages transaction scope
- Entity Framework Core as default ORM

### CQRS (if complexity warrants)
- Separate read and write models
- MediatR for command/query dispatch
- Only introduce when read/write patterns diverge significantly

## Integration Patterns
- HttpClient with Polly for resilient HTTP calls
- MassTransit or NServiceBus for message-based integration
- gRPC for internal service-to-service (high performance)
- Health checks for dependency monitoring

## Modernisation Approaches
| Current State | Target | Pattern |
|--------------|--------|---------|
| .NET Framework (4.x) | .NET 8+ | Incremental migration, shared libraries |
| Monolith | Modular monolith | Extract bounded contexts, keep single deployment |
| Monolith | Microservices | Strangler fig — extract services at boundaries |
| Windows Services | Container-based | Worker Services in containers |

## Testing Patterns
- xUnit as test framework
- Integration tests with WebApplicationFactory
- Testcontainers for database/infrastructure tests
- Architecture tests with NetArchTest

## Security Patterns
- Authentication: Entra ID (Azure AD) with Microsoft.Identity.Web
- Authorisation: Policy-based with IAuthorizationHandler
- Secrets: Azure Key Vault with DefaultAzureCredential
- Data protection: ASP.NET Core Data Protection API
