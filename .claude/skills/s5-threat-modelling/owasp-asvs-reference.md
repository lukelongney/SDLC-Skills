# OWASP ASVS 5.0 Quick Reference

Use this to map threats to verification requirements. Full ASVS at: https://owasp.org/www-project-application-security-verification-standard/

## V1: Architecture, Design and Threat Modeling
- V1.1 Secure Software Development Lifecycle
- V1.2 Authentication Architecture
- V1.3 Session Management Architecture
- V1.4 Access Control Architecture
- V1.5 Input and Output Architecture
- V1.6 Cryptographic Architecture
- V1.7 Errors, Logging and Auditing Architecture
- V1.8 Data Protection and Privacy Architecture
- V1.9 Communications Architecture
- V1.10 Malicious Software Architecture
- V1.11 Business Logic Architecture
- V1.12 Secure File Upload Architecture
- V1.13 API Architecture
- V1.14 Configuration Architecture

## V2: Authentication
- V2.1 Password Security
- V2.2 General Authenticator Security
- V2.3 Authenticator Lifecycle
- V2.4 Credential Storage
- V2.5 Credential Recovery
- V2.6 Look-up Secret Verifiers
- V2.7 Out of Band Verifiers
- V2.8 One Time Verifiers
- V2.9 Cryptographic Verifiers
- V2.10 Service Authentication

## V3: Session Management
- V3.1 Fundamental Session Management
- V3.2 Session Binding
- V3.3 Session Termination
- V3.4 Cookie-based Session Management
- V3.5 Token-based Session Management
- V3.6 Federated Re-authentication
- V3.7 Defenses Against Session Management Exploits

## V4: Access Control
- V4.1 General Access Control Design
- V4.2 Operation Level Access Control
- V4.3 Other Access Control Considerations

## V5: Validation, Sanitization and Encoding
- V5.1 Input Validation
- V5.2 Sanitization and Sandboxing
- V5.3 Output Encoding and Injection Prevention
- V5.4 Memory, String, and Unmanaged Code
- V5.5 Deserialization Prevention

## V6: Stored Cryptography
- V6.1 Data Classification
- V6.2 Algorithms
- V6.3 Random Values
- V6.4 Secret Management

## V7: Error Handling and Logging
- V7.1 Log Content
- V7.2 Log Processing
- V7.3 Log Protection
- V7.4 Error Handling

## V8: Data Protection
- V8.1 General Data Protection
- V8.2 Client-side Data Protection
- V8.3 Sensitive Private Data

## V9: Communication
- V9.1 Client Communication Security
- V9.2 Server Communication Security

## V10: Malicious Code
- V10.1 Code Integrity
- V10.2 Malicious Code Search
- V10.3 Application Integrity

## V11: Business Logic
- V11.1 Business Logic Security

## V12: Files and Resources
- V12.1 File Upload
- V12.2 File Integrity
- V12.3 File Execution
- V12.4 File Storage
- V12.5 File Download
- V12.6 SSRF Protection

## V13: API and Web Service
- V13.1 Generic Web Service Security
- V13.2 RESTful Web Service
- V13.3 SOAP Web Service
- V13.4 GraphQL

## V14: Configuration
- V14.1 Build and Deploy
- V14.2 Dependency
- V14.3 Unintended Security Disclosure
- V14.4 HTTP Security Headers
- V14.5 HTTP Request Header Validation

## Common STRIDE → ASVS Mappings

| STRIDE | Common ASVS Areas |
|--------|------------------|
| **Spoofing** | V2 (Authentication), V3 (Session Management) |
| **Tampering** | V5 (Validation), V13 (API Security) |
| **Repudiation** | V7 (Logging), V10 (Code Integrity) |
| **Information Disclosure** | V6 (Cryptography), V8 (Data Protection), V9 (Communications) |
| **Denial of Service** | V11 (Business Logic), V13 (API Rate Limiting) |
| **Elevation of Privilege** | V4 (Access Control), V1.4 (Access Control Architecture) |
