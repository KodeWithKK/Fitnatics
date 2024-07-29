import Input from "@shared/base/Input/Input";
import FileUpload from "@shared/base/Input/FileUpload";

function TestingUIPage() {
  return (
    <div className="flex min-h-screen">
      <div className="mx-auto w-[564px] p-6 pb-2">
        <Input
          type="text"
          spellCheck="false"
          label="Highest Qualification"
          placeholder="Enter Highest Qualification"
          className={"border-gray-900/[.8]"}
          required={true}
        />
        <Input
          type="text"
          spellCheck="false"
          label="Institution Name"
          placeholder="Enter Institution Name"
          className={"border-gray-900/[.8]"}
          required={true}
        />
        <Input
          type="number"
          spellCheck="false"
          label="Year of Completion"
          placeholder="Enter Year of Completion"
          className={"border-gray-900/[.8]"}
          required={true}
        />
        <FileUpload label="Upload Marksheet" accept={".pdf"} />
      </div>
    </div>
  );
}

export default TestingUIPage;
