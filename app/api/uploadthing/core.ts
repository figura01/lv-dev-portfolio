import { NextRequest } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/config";
import { getAdminFromTokens } from "@/lib/auth/tokens";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
const f = createUploadthing();

// Seul un administrateur connecté peut envoyer des fichiers.
const auth = (req: NextRequest) =>
  getAdminFromTokens(
    req.cookies.get(AUTH_COOKIES.access)?.value,
    req.cookies.get(AUTH_COOKIES.refresh)?.value,
  );
export const ourFileRouter = {
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
