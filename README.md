<img width="216" height="216" alt="image" src="https://github.com/user-attachments/assets/819dfed6-0e4d-418b-8708-055add877d2b" />

Hello Everyone ! 

A TypeScript-based security analysis API designed for Microsoft Security Copilot integrations. 

Developing my plugin is a lightweight API that evaluates users and devices against predefined security controls and vulnerability data.

The project is designed as a foundation for future Microsoft Security Copilot plugin integrations.

## Features
 
### Device Analysis
 
- Software inventory inspection
- CVE correlation
- Vulnerability findings generation
- Device risk scoring
 
### User Analysis
 
- MFA status verification
- Privileged role analysis
- Security findings generation
- User risk scoring
 
## API Endpoints
 
### Analyze Device
 
```http
GET /analyze-device?hostname=PC-001
```
 
Example Response
 
```json
{
"hostname": "PC-001",
"riskScore": 150,
"findings": [
{
"product": "Microsoft Edge",
"severity": "High",
"cve": "CVE-2023-24932"
}
]
}
```
 
### Analyze User
 
```http
GET /analyze-user?upn=admin@company.com
```
 
Example Response
 
```json
{
"upn": "admin@company.com",
"mfaEnabled": false,
"riskScore": 50,
"findings": [
{
"severity": "High",
"finding": "MFA is not enabled for this user."
}
]
}
```
 
## Project Structure
 
```text
src/
├── server.ts
├── data/
│ ├── users.ts
│ ├── devices.ts
│ └── cves.ts
├── api/
└── services/
```
 
## Security Copilot Integration
 
The project includes:
 
- Plugin Manifest
- OpenAPI Specification
- Security Analysis Endpoints
 
Future versions will integrate:
 
- Microsoft Graph API
- Microsoft Defender
- Microsoft Sentinel
- Real-time CVE data sources
 
## Roadmap
 
- [x] Device analysis
- [x] CVE matching
- [x] Risk scoring
- [x] User MFA checks
- [ ] Privileged role analysis
- [ ] Microsoft Graph integration
- [ ] Security Copilot plugin registration
- [ ] Azure deployment
- [ ] GitHub Actions CI/CD
 
## Installation
 
Install dependencies
 
```bash
npm install
```
 
Run development server
 
```bash
npm run dev
```
 
Access API
 
```text
http://localhost:3000
```



