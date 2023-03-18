export default function Title({ title }: { title: string }) {
  return (
    <h1 className="title">
      {title}
      <style jsx>{`
        h1.title {
          text-align: center;
        }
      `}</style>
    </h1>
  );
}
