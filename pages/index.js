import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import AuthCheck from "utils/checkAuth";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!AuthCheck()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  return !loading ? (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>home page</div>
    </>
  ) : null;
}
