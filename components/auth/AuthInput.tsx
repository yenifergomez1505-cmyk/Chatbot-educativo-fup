interface Props {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}

export function AuthInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  required,
  hint,
}: Props) {
  return (
    <div>
      <label
        className="mb-1 block text-[11px] font-medium text-edubot-primary"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
        defaultValue={defaultValue}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {hint && <p className="mt-1 text-[10px] text-edubot-light">{hint}</p>}
    </div>
  );
}
