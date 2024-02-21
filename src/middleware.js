export { default } from "next-auth/middleware";

export const config = { matcher: ["/home", "/registerBuild"] }; // Add to the array all the pages that should be protected when the user is not logged in. If further pages are created and containg logged in-related content, those pages should be added here.
