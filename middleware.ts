export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"]
};
