import { cn } from "@/lib/utils";

function Input({
  title,
  placeholder,
  value,
  onChange,
  className,
  onKeyDown = () => {},
}: any) {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <p className="font-medium">{title}</p>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="rounded-md border bg-white px-2 py-1.5"
      />
    </div>
  );
}

export default Input;
