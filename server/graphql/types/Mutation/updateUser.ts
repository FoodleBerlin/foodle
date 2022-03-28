import { extendType, objectType, inputObjectType, stringArg, intArg } from 'nexus';
import { Context } from '../../../context';

export const updateUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'findUserResult',
      description: 'Edit user profile data',
      args: { id: stringArg(), fullName: stringArg(),
        zip: intArg(), description: stringArg(), dob: stringArg(),
         passportS3Id:stringArg(), solvencyS3Id:stringArg(),
          licenseS3Id: stringArg() },
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
