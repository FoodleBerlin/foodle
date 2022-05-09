import { objectType } from "nexus";

export const S3Resource = objectType({
  name: 'S3Resource',
  definition(t) {
    t.string('id');
    t.string('url');
  },
});