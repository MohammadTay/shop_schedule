const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
    origin: (origin, callback) => {
        // allow postman or other programs 
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("not allowed by CoRs"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
    // 204 default , device has some problems {smarttv , older browsers}
}

module.exports = corsOptions