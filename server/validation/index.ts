import prisma from '../singletons/prisma';
function findUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
export const checkUserExists = (userId: string) => {
  if (!findUser(userId)) {
    return {
      ClientErrorUserNotExists: {
        message: `owner for ownerId ${userId} does not exist`,
      },
    };
  }
};
export const checkInvalidInputLength = (inputName: string, arg: string | [], maxLength: number, minLength?: number) => {
  if (arg.length > maxLength || arg.length < (minLength ?? 0)) {
    const minMaxLabel = arg.length > maxLength ? 'max' : 'min';
    const minMaxNumberLabel = arg.length > maxLength ? maxLength : minLength;
    return {
      ClientErrorInvalidInputLength: {
        message: `${inputName} ${arg} is invalid, must have a ${minMaxLabel} length of ${minMaxNumberLabel}`,
      },
    };
  }
};
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
