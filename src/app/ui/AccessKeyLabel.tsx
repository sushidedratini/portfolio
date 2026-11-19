/**
 * Renders a Windows-style label where `&` marks the access key:
 * "&Arquivo" → A̲rquivo, "Aj&uda" → Aju̲da.
 */
const AccessKeyLabel = ({ label }: { label: string }) => {
  const index = label.indexOf('&');
  if (index === -1 || index === label.length - 1) return <>{label}</>;

  return (
    <>
      {label.slice(0, index)}
      <span className="underline">{label[index + 1]}</span>
      {label.slice(index + 2)}
    </>
  );
};

export default AccessKeyLabel;
