import router from "@/router";
export default {
  openNewWindow(path: string) {
    const route = router.resolve({ path });
    window.open(route.href, "_blank");
  }
};
