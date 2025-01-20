"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_route_1.authRouter);
exports.default = rootRouter;
