import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf wrap">
      <p className="mono dim">404 · MEDIA OFFLINE</p>
      <h1 className="nf-title">없는 페이지예요</h1>
      <Link href="/" className="btn">처음으로</Link>
    </section>
  );
}
