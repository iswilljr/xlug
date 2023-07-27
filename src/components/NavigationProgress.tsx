/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

function _NavigationProgress() {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && nprogress.start();
    };
    const handleComplete = () => {
      nprogress.complete();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return <NavigationProgress color="blue.7" autoReset progressLabel="Loading Page" />;
}

export { _NavigationProgress as NavigationProgress };
