import { prismaClient } from "..";
export class ProfileService {
  public async updateProfile(userId: string, payload: any) {
    const {
      name,
      email,
      phone,
      gender,
      specialization,
      fees,
      state,
      street,
      city,
      bus_stop,
      country,
      profileImage,
    } = payload;
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        phone,
        gender,
      },
    });

    if (updatedUser.role === "PROVIDER") {
      await prismaClient.provider.update({
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
    } else if (updatedUser.role === "PATIENT") {
      await prismaClient.patient.update({
        where: { userId: userId },
        data: {
          profileImage,
        },
      });
    }
    return {
      message: "Profile updated successfully.",
    };
  }
}
