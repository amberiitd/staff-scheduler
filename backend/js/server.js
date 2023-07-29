"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); // load .env file at the topmost
const schedule_1 = __importDefault(require("./src/routes/schedule"));
const user_1 = __importDefault(require("./src/routes/user"));
const anaytics_1 = __importDefault(require("./src/routes/anaytics"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const swaggerDocument = yamljs_1.default.load("./swagger.yml");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
}));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get("/health-check", (req, res) => {
    res.status(200).json({ status: 200 });
});
app.use("/schedule", schedule_1.default);
app.use("/user", user_1.default);
app.use("/analytics", anaytics_1.default);
// 404 Resource Not Found handler
app.use((req, res) => {
    res.status(404).json({ error: "Resource Not Found update 2" });
});
app.listen(8080);
