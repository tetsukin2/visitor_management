export default function FormField({
  label,
  name,
  type = "text",
  required,
  onChange,
  options,
  isTextarea,
}) {
  return (
    <div>
      <label className="block text-base font-medium">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          required={required}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          required={required}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
}
