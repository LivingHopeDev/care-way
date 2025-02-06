"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (model_1, _a) => __awaiter(void 0, [model_1, _a], void 0, function* (model, { page = 1, limit = 10, orderBy = "createdAt", orderDirection = "desc", where = {}, include, }) {
    const take = limit > 100 ? 100 : limit;
    const skip = (page - 1) * take;
    const totalCount = yield model.count({ where });
    const totalPages = Math.ceil(totalCount / take);
    const queryOptions = {
        where,
        take,
        skip,
        orderBy: { [orderBy]: orderDirection },
    };
    if (include && Object.keys(include).length > 0) {
        queryOptions.include = include;
    }
    const data = yield model.findMany(queryOptions);
    return {
        data,
        totalCount,
        totalPages,
        page,
        limit,
    };
});
exports.paginate = paginate;
