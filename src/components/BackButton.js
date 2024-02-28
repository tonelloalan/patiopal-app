import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  return (
    <p
      style={{
        cursor: "pointer",
        fontSize: "xx-large",
        marginTop: "0px",
        marginBottom: "0px",
      }}
      onClick={() => router.back()}
    >
      ⬅
    </p>
  );
}
