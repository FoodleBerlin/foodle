// const InputType = objectType({
//   name: 'findUserResult',
//   description: 'User input',
//   definition(t) {
//     t.string('fullName');
//     // t.string('dob');
//     t.string('zip');
//     t.string('description');
//     t.string('passportString');
//     t.string('solvencyString');
//     t.string('licenseString');
//   },
// });

// export const updateUser = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('updateUser', {
//       type: 'findUserResult',
//       description: 'Edit user profile data',
//       args: { id: stringArg(), fullName: stringArg(),
//         zip: stringArg(), description: stringArg(),
//          passportString:stringArg(), solvencyString:stringArg(),
//           licenseString: stringArg() },
//       resolve: async (_, args, ctx: Context) => {
//         args = args.InputType;
//         //TODO check that the user is authorized
//         const userData = await ctx.prisma.user.findUnique({
//           where: { id: args.id },
//         });
//         if (!userData)
//           return {
//             ClientErrorUserNotFound: {
//               message: "Couldn't find the user",
//             },
//           };
//         const user = await ctx.prisma.user.update({
//           where: {
//             id: args.userId,
//           },
//           data: {
//             fullName: args.fullName,
//             //dob: args.dob,
//             zip: args.zip,
//             email: args.email,
//             description: args.bio,
//             passport: args.passportString,
//             license: args.licenseString,
//             solvency: args.solvencyString,
//           },
//         });
//         if (user) {
//           return { Users: [user] };
//         } else {
//           return {
//             ClientErrorUnknown: {
//               message:
//                 'Something went wrong while editing your profile details. Please contact our technical support',
//             },
//           };
//         }
//       },
//     });
//   },
// });
export {};
