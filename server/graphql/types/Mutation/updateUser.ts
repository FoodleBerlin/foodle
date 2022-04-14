import { extendType, objectType, inputObjectType, stringArg, intArg, nullable } from 'nexus';
import { checkInvalidInputLength } from '../../../../server/validation';
import { Context } from '../../../context';

export const updateUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'findUserResult',
      description: 'Edit user profile data',
      args: { id: stringArg(), fullName: stringArg(),
        zip: nullable(intArg()), description: nullable(stringArg()), dob: nullable(stringArg()),
         passportS3Id: nullable(stringArg()), solvencyS3Id: nullable(stringArg()),
          licenseS3Id: nullable(stringArg()) },
      resolve: async (_, args, ctx: Context) => {
        //TODO check that the user is authorized
        
        let userData;
        try{
            if (args.id!==null){
                 userData = await ctx.prisma.user.findUnique({
              where: { id: args.id },
            });
          }
        } catch(e){
          return {
            ClientErrorUserNotFound: {
              message: "Couldn't find the user",
            },
          };
        }
        const isInvalidZipLength = args.zip && checkInvalidInputLength("Zip", args.zip?.toString(), 5, 5);
        if (isInvalidZipLength) return isInvalidZipLength;
        const isInvalidDescriptionLength = args.description && checkInvalidInputLength("Description", args.description, 500)
        if (isInvalidDescriptionLength) return isInvalidDescriptionLength;
        const isInvalidPassportS3Id = args.passportS3Id && checkInvalidInputLength("PassportS3Id", args.passportS3Id, 100, 5)
        if (isInvalidPassportS3Id) return isInvalidPassportS3Id;
        const isInvalidLicenseS3Id = args.licenseS3Id && checkInvalidInputLength("LicenseS3Id", args.licenseS3Id, 100, 5)
        if (isInvalidLicenseS3Id) return isInvalidLicenseS3Id;
        const isInvalidSolvencyS3Id = args.solvencyS3Id && checkInvalidInputLength("PassportS3Id", args.solvencyS3Id, 100, 5)
        if (isInvalidSolvencyS3Id) return isInvalidSolvencyS3Id;
        

        if (!userData)
          return {
            ClientErrorUserNotFound: {
              message: "Couldn't find the user",
            },
          };
        const user = await ctx.prisma.user.update({
          where: {
            id: userData.id,
          },
          data: {
            fullName: args.fullName? args.fullName : userData.fullName ,
            email:userData.email,
            zip: args.zip? args.zip: userData.zip,
            dob: args.dob ? args.dob: userData.dob,
            description: args.description? args.description: userData.description,
            passportS3Id: args.passportS3Id? args.passportS3Id : userData.passportS3Id,
            licenseS3Id: args.licenseS3Id ? args.licenseS3Id : userData.licenseS3Id,
            solvencyS3Id: args.solvencyS3Id ? args.solvencyS3Id: userData.solvencyS3Id,
          },
        });
        if (user) {
          return { User: user };
        } else {
          return {
            ClientErrorUnknown: {
              message:
                'Something went wrong while editing your profile details. Please contact our technical support',
            },
          };
        }
      },
    });
  },
});
