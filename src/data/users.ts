const users = [ 
    { 
        upn: "admin@company.com",
        mfaEnabled: false,
        roles: [
            "Global Administrator",
            "Exchange Administrator",
        ]
    },
    {
        upn: "user@company.com",
        mfaEnabled: true,
        roles: [
            "User"
        ]
    }
];

module.exports = { users };




