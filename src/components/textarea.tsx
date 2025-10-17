function Textarea({ title, placeholder, value, onChange }: any) {
  return (
    <div className=" w-full flex flex-col gap-1.5">
      <p className=" font-medium">{title}</p>
      <textarea
        placeholder={placeholder}
        value={value}
        rows={4}
        onChange={onChange}
        className="border py-1.5 px-2 bg-white rounded-md "
      />
    </div>
  );
}

export default Textarea;
