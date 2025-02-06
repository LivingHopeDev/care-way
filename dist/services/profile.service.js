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
exports.ProfileService = void 0;
const __1 = require("..");
class ProfileService {
    updateProfile(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, gender, specialization, fees, state, street, city, bus_stop, country, profileImage, } = payload;
            const updatedUser = yield __1.prismaClient.user.update({
                where: { id: userId },
                data: {
                    name,
                    email,
                    phone,
                    gender,
                },
            });
            if (updatedUser.role === "PROVIDER") {
                yield __1.prismaClient.provider.update({
                    where: { userId: userId },
                    data: {
                        specialization,
                        fees,
                        state,
                        street,
                        city,
                        country,
                        bus_stop,
                        profileImage,
                    },
                });
            }
            else if (updatedUser.role === "PATIENT") {
                yield __1.prismaClient.patient.update({
                    where: { userId: userId },
                    data: {
                        profileImage,
                    },
                });
            }
            return {
                message: "Profile updated successfully.",
            };
        });
    }
}
exports.ProfileService = ProfileService;
