"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nexus_1 = require("nexus");
var path = __importStar(require("path"));
var types = __importStar(require("./graphql/types"));
var schema = (0, nexus_1.makeSchema)({
    prettierConfig: path.join(process.cwd(), '.prettierrc'),
    types: [types],
    // TODO implement isTypeOf field in all objects
    // https://nexusjs.org/docs/guides/abstract-types
    features: {
        abstractTypeStrategies: {
            isTypeOf: true,
        },
    },
    nonNullDefaults: {
        output: true,
    },
    outputs: {
        typegen: path.join(process.cwd(), '/node_modules/@types/nexus-typegen/index.d.ts'),
        schema: path.join(__dirname, '/generated/schema.graphql'),
    },
    contextType: {
        export: 'Context',
        module: path.join(__dirname, '/context.ts'),
    },
    sourceTypes: {
        modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
    },
});
exports.default = schema;
