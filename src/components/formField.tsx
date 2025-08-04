export const FormField = ({
  label,
  error,
  children,
  className = 'h-[84px]',
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <label className="block text-sm font-normal text-grey-800 mb-1">
      {label}
    </label>
    <div className="relative group">{children}</div>
    {error && <p className="mt-1 text-sm text-error">{error}</p>}
  </div>
);
