
import Fastify = require("fastify");
import { users }  from "./data/users";
import { cveData } from "./data/cves";

console.log("Starting Security Copilot Plugin API server...");

const app = Fastify();
app.get("/", async () => {
    return {
        message: " Security Copilot Plugin API "
    };
});

/* DEMO INFORMATION */

const devices = [
    {
        hostname: "PC-001",
        software: [
            {
                name: "Microsoft Edge",
                version: "114.0.1823.67"
            }, 
            {
                name: ".NET Runtime",
                version: "114.0.5735.197"
            }
        ]
    },    
    {
        hostname: "PC-002",
        software: [
            {
                name:"Microsoft SharePoint",
                version: "114.0.5735.198"
            }
        ]
    }
];


app.get ("/analyze-device" , async (request) => {
    const { hostname } = request.query as {
        hostname : string;
    };
    const device = devices.find((d) => d.hostname === hostname);
    if (!device) {
        return {
            error: "Device not found"
        };
    }
    const findings = [] ;
    let riskScore = 0;
    for (const software of device.software) {
        const vuln= cveData.find(
            cve => cve.product === software.name && cve.vulnerableVersion === software.version
        );

        if (vuln) {
            riskScore += calculateRiskScore(
                vuln.severity
            );
            findings.push({
                product: software.name,
                installedVersion: software.version,
                cve: vuln.cve,
                description: vuln.description,
                severity: vuln.severity,
                recommendation: vuln.recommendation
            });
        }
    }
    return {
        hostname: device.hostname,
        findings,
        riskScore
    };
});

function calculateRiskScore(severity: string) : number {
    if (severity === "Critical") {
        return 100;
    }
    if (severity === "High") {
        return 50;
    }
    if (severity === "Medium") {
        return 20;
    }
    if (severity === "Low") {
        return 10;
    }
    return 0;
}



app.get("/analyze-users", async (request) => {
    const { upn} = request.query as {
        upn: string;
    };
    const user = users.find(
        (u: { upn: string }) => u.upn === upn
    );
    if (!user) {
        return {
            error: "User not found"
        };
    }
    const findings = [];
    if (!user.mfaEnabled) {
        findings.push({
            severity: "High",
            finding: "MFA is not enabled for this user.",
            recommendation: "Enable MFA for this user to enhance security."
        });
    }
    return {
        upn: user.upn,
        mfaEnabled: user.mfaEnabled,
        roles: user.roles,
        findings
    };
});
    
app.get("/test", async () => {
    return {
        message: "Test endpoint is working!"
    };
});
/* server startup */

app.listen({
    port: 3000,
    host: "0.0.0.0"
});

